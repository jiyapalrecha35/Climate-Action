import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './styles.css';

const Kind = {
    X: 'X',
    O: 'O',
};

const Nullable = (value) => value !== null;

function logCellStatus(arr) {
    console.log(`
    Total:  ${arr.length},
    X:      ${arr.filter((c) => c?.kind === Kind.X).length},
    O:      ${arr.filter((c) => c?.kind === Kind.O).length},
    Empty:  ${arr.filter((c) => c === null).length}
  `);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getEmptyIndices(arr) {
    let empty = [];
    let i = arr.indexOf(null);
    while (i !== -1) {
        empty.push(i);
        i = arr.indexOf(null, i + 1);
    }
    return empty;
}

function getRandomEmptyIndex(arr) {
    const emptyIndices = getEmptyIndices(arr);
    const i = randomNumberBetween(0, emptyIndices.length - 1);
    return emptyIndices[i];
}

function swap(arr, x, y) {
    const tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
}

function getGridNeighbours(index, arr, gridWidth) {
    return [
        arr[index - 1], // left
        arr[index + 1], // right
        arr[index + gridWidth - 1], // bottom left
        arr[index + gridWidth], // bottom
        arr[index + gridWidth + 1], // bottom right
        arr[index - gridWidth - 1], // top left
        arr[index - gridWidth], // top
        arr[index - gridWidth + 1], // top right
    ].filter((c) => c !== undefined); // not out of bounds
}

const Simulation = () => {
    const _tickDelay = 300; // ms
    const _width = 50;
    const _area = Math.pow(_width, 2);

    const [tolerens, setTolerens] = useState(0.6);
    const [emptyPercent, setEmptyPercent] = useState(0.2);
    const [xPercent, setXPercent] = useState(0.2);

    const [running, setRunning] = useState(false);
    const [shouldReset, triggerReset] = useState(false);
    const [cells, setCells] = useState(Array(_area).fill(null));
    const [unhappyCount, setUnhappyCount] = useState(0);
    const [tickCount, setTickCount] = useState(0);
    const timerRef = useRef(0);

    useLayoutEffect(() => {
        function getInitialSetup() {
            const initial = [];

            for (let i = 0; i < _area; i++) {
                const x = Math.random();

                if (x <= emptyPercent) {
                    initial.push(null);
                } else if (x <= (1 - emptyPercent) * xPercent + emptyPercent) {
                    initial.push({ kind: Kind.X });
                } else {
                    initial.push({ kind: Kind.O });
                }
            }
            return initial;
        }

        const initial = getInitialSetup();
        setCells(initial);

        logCellStatus(initial);
        setUnhappyCount(0);
        triggerReset(false);
    }, [_area, emptyPercent, xPercent, shouldReset]);

    useEffect(() => {
        function tick() {
            const copy = cells.slice();
            let unhappy = 0;

            cells.forEach((cell, index) => {
                if (cell === null) return;

                const neighbours = getGridNeighbours(index, cells, _width);
                const different = neighbours
                    .filter(Nullable)
                    .filter((c) => c.kind !== cell.kind);

                if (different.length / neighbours.length > tolerens) {
                    unhappy++;
                    const newHome = getRandomEmptyIndex(cells);
                    swap(copy, index, newHome);
                }
            });
            return {
                newState: copy,
                unhappyCount: unhappy,
            };
        }

        timerRef.current = window.setTimeout(() => {
            const res = tick();
            setUnhappyCount(res.unhappyCount);
            // Nothing changed so everybody must be happy.
            if (cells.every((value, index) => value === res.newState[index])) {
                stop();
            } else if (running) {
                setTickCount((v) => v + 1);
                setCells(res.newState);
            }
        }, _tickDelay);
    }, [running, cells, tolerens]);

    const toggle = () => (running ? stop() : run());
    const run = () => setRunning(true);
    const stop = () => {
        window.clearTimeout(timerRef.current);
        setRunning(false);
    };

    const renderCells = () => {
        return cells.map((cell, i) => {
            let cls = 'sim-cell ';
            if (cell?.kind === Kind.X) {
                cls += 'sim-cell__X';
            } else if (cell?.kind === Kind.O) {
                cls += 'sim-cell__O';
            }
            return <div key={i} className={cls} />;
        });
    };

    const renderControls = () => (
        <div className="sim-controls">
            <div className="sim-ctrl-group">
                <button className='btn' onClick={toggle}>{running ? 'Stop' : 'Start'}</button>
                <button className='btn'
                    onClick={() => {
                        stop();
                        setTickCount(0);
                        triggerReset(true);
                    }}
                >
                    Reset
                </button>
            </div>

            <div className="sim-ctrl-group">
                <div className="sim-sliders">
                    <label htmlFor="tolerensSlider">Tolerens</label>
                    <input
                        id="tolerensSlider"
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={tolerens}
                        onChange={(e) => setTolerens(parseFloat(e.target.value))}
                    />
                    <label htmlFor="tolerensSlider">{tolerens * 100}%</label>

                    <label htmlFor="emptySlider">Empty cells</label>
                    <input
                        id="emptySlider"
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={emptyPercent}
                        onChange={(e) => {
                            stop();
                            setEmptyPercent(parseFloat(e.target.value));
                        }}
                    />
                    <label htmlFor="emptySlider">{emptyPercent * 100}%</label>

                    <label htmlFor="xPercentSlider">Red population</label>
                    <input
                        id="xPercentSlider"
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={xPercent}
                        onChange={(e) => {
                            stop();
                            setXPercent(parseFloat(e.target.value));
                        }}
                    />
                    <label htmlFor="xPercentSlider">{xPercent * 100}%</label>
                </div>
            </div>
        </div>
    );

    const getLabelText = () => {
        const text = `Ticks: ${tickCount} — `;
        if (unhappyCount > 0) {
            const unhappyPercent = ((unhappyCount / cells.length) * 100).toFixed(1);
            return text + `Unhappy cells: ${unhappyCount} (${unhappyPercent}%)`;
        }
        return text + "Everybody's happy!"
    }
    return (
        <div className="sim">
          <h1 style={{marginBottom:'50px'}}>Schelling Model of Segregation and Climate Action</h1>
          {renderControls()}
          <div
            id="sim-grid"
            className="sim-grid"
            style={{
              gridTemplateColumns: `repeat(${_width}, 10px)`,
            }}
          >
            {renderCells()}
          </div>
          <label htmlFor="sim-grid" className="sim-grid__label">
            {getLabelText()}
          </label>
          <div className="sim-info">
            <h2>Understanding the Schelling Model and Climate Action</h2>
            <p><strong>Schelling Model:</strong> The Schelling model of segregation demonstrates how individual preferences for neighbors can lead to large-scale patterns of segregation, even when those preferences are relatively weak. In our simulation, red (X) and blue (O) cells represent different groups, and empty cells represent unoccupied spaces. Cells move to new locations if they are unhappy with their neighbors based on the tolerance setting.</p>
            <p><strong>Rules of the Schelling Model:</strong></p>
            <ul>
              <li>Cells evaluate their neighborhood and calculate the proportion of neighbors of a different type.</li>
              <li>If this proportion exceeds a specified tolerance level, the cell becomes "unhappy".</li>
              <li>Unhappy cells then move to a new, random location where they are more satisfied.</li>
            </ul>
            <p><strong>Climate Action Analogy:</strong> The Schelling model can be analogized to climate action in that both highlight the power of individual actions to create systemic change:</p>
            <ul>
              <li>Just as individual cells' movements affect the overall pattern of segregation, individual actions towards sustainability impact global climate outcomes.</li>
              <li>Small, seemingly insignificant actions like reducing energy consumption, using public transportation, and recycling collectively lead to significant changes in reducing greenhouse gas emissions and combating climate change.</li>
            </ul>
            <p>By understanding and applying lessons from the Schelling model, we can better comprehend the impact of individual decisions on societal patterns, including climate change mitigation and adaptation efforts.</p>
            <ul>
              <li>Adjust the <strong>Tolerance</strong> slider to see how changes in tolerance levels affect segregation patterns.</li>
              <li>Adjust the <strong>Empty cells</strong> slider to simulate different levels of available resources.</li>
              <li>Adjust the <strong>Red population</strong> slider to explore different demographic compositions.</li>
            </ul>
            <p>The simulation demonstrates how small changes in individual behavior (tolerance levels and demographic compositions) can influence the overall pattern of segregation. Similarly, individual actions towards sustainability collectively contribute to global climate efforts.</p>
          </div>
        </div>
      );
      
};

export default Simulation;
