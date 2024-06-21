import React, { useState, useCallback, useRef } from 'react';
import { produce } from 'immer';
import './Game.css';
import emissionsData from './csvjson.json'; // Assuming emissions.json is where you store your data

// Function to generate initial data from emissions JSON
const generateInitialData = () => {
  const data = [];

  // Iterate through years (1970 to 2021)
  for (let year = 1970; year <= 2021; year++) {
    const row = [];

    // Iterate through each country in emissionsData
    for (let countryData of emissionsData) {
      // Find the emissions value for the current year and country
      const emissionsValue = countryData[`${year}`];

      // Round emissionsValue to 2 decimal places
      const roundedValue = Math.round(emissionsValue * 100) / 100;

      // Push the rounded emissions value to the row
      row.push(roundedValue);
    }

    // Push the row of emissions values for the current year to data
    data.push(row);
  }

  return data;
};

// Initial data generation
const initialData = generateInitialData();
const numRows = initialData.length;
const numCols = initialData[0].length;
const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 1], [-1, -1], [1, 0], [-1, 0]
];

const generateInitialGrid = (data) => {
  const grid = [];

  data.forEach(row => {
    const gridRow = row.map(value => {
      let initialState = 'alive'; // Default to alive if not specified

      if (value > 1000) {
        initialState = 'dead';
      }

      // Mark outliers with emissions > 2000
      let outlierClass = '';
      if (value > 2000) {
        outlierClass = 'outlier';
      }

      return {
        value,
        alive: initialState === 'alive',
        dead: initialState === 'dead',
        reproduce: initialState === 'reproduce',
        outlier: outlierClass,
      };
    });

    grid.push(gridRow);
  });

  return grid;
};

const getNeighbors = (grid, x, y) => {
  const neighbors = [];
  operations.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
      neighbors.push(grid[newX][newY]);
    }
  });
  return neighbors;
};

const applyRules = (currentCell, neighbors) => {
  const aliveNeighbors = neighbors.filter(neighbor => neighbor.alive).length;
  const deadNeighbors = neighbors.length - aliveNeighbors;
  const avgNeighborEmissions = neighbors.reduce((sum, neighbor) => sum + neighbor.value, 0) / neighbors.length;
  let newValue = currentCell.value;

  if (aliveNeighbors > deadNeighbors) {
    newValue = Math.max(currentCell.value - Math.floor(5 * Math.random()), 0);
  } else {
    newValue = Math.min(currentCell.value + Math.floor(5 * Math.random()), 52);
  }
  newValue = Math.round(newValue * 100) / 100;
  const isAlive = newValue <= currentCell.value && newValue <= 50 && avgNeighborEmissions <= 60;
  const isDead = newValue > 95 || avgNeighborEmissions > 50;
  const isReproduce = avgNeighborEmissions <= 60 && aliveNeighbors > 3;

  return {
    value: newValue,
    alive: isAlive,
    dead: isDead,
    reproduce: isReproduce && !isDead
  };
};

const GameOfLife = () => {
  const [grid, setGrid] = useState(() => generateInitialGrid(initialData));
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            const neighbors = getNeighbors(g, i, j);
            const newCell = applyRules(g[i][j], neighbors);
            gridCopy[i][j] = newCell;
          }
        }
      });
    });
    setGeneration(prev => prev + 1);

    setTimeout(runSimulation, 1000);
  }, []);

  const countries = [
    "Afghanistan", "Armenia", "Azerbaijan", "Bangladesh", "Bahrain", "Brunei", "Bhutan", "Indonesia", "India", "Iran", "Iraq", "Israel and Palestine", "Japan", "Kazakhstan", "Kuwait", "Sri Lanka", "Maldives", "Myanmar/Burma", "Mongolia", "Malaysia", "Nepal", "Oman", "Pakistan", "Qatar", "Saudi Arabia", "Singapore", "Syria", "Thailand", "Tajikistan", "Turkey", "Uzbekistan", "Vietnam", "Yemen"
  ];
  const years = Array.from({ length: numRows }, (_, i) => 1970 + i);

  return (
    <div className="game-container">
      <h1 style={{marginBottom:'50px'}}>Conway's Game of Life: Green Grid Simulation</h1>
      <div className="controls">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={() => {
            setGrid(generateInitialGrid(generateInitialData()));
            setGeneration(0);
          }}
        >
          Reset
        </button>
      </div>
      <div className="grid-container">
        <div>
          <div className="grid-labels">
            <div className="empty-cell"></div>
            {Array.from({ length: numCols }, (_, idx) => (
              <div key={idx} className="label-cell">{`C${idx + 1}`}</div>
            ))}
          </div>
          {grid.map((rows, i) => (
            <div key={i} className="grid-row">
              <div className="label-cell">{years[i]}</div>
              {rows.map((col, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`cell ${grid[i][j].alive ? 'alive' : grid[i][j].dead ? 'dead' : grid[i][j].reproduce ? 'reproduce' : ''} ${grid[i][j].outlier}`}
                >
                  {grid[i][j].value}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="legend">
          <h3>Legend</h3>
          <ul>
            <li><span className="cell alive"></span> Alive</li>
            <li><span className="cell dead"></span> Dead</li>
            <li><span className="cell reproduce"></span> Reproducing</li>
          </ul>
        </div>
      </div>
      <div className="generation">Generation: {generation}</div>
      <div className="bottom-container">
        <h3>Country Legends: </h3>
        <div className="countries">
          {/* <h3 className='headerr'>Country Legend:</h3> */}
          {countries.map((country, idx) => (
            <div key={idx} className="country">{`C${idx + 1}: ${country}`}</div>
          ))}
        </div>
        <div className="explanation">
          <h3>Game Rules</h3>
          <p>In this simulation, each cell represents a country's CO2 emissions over time. The game starts with the initial data, and each year (generation), the emissions data is updated. A cell is considered "alive" (green) if the emissions have decreased or stayed the same compared to the previous year. If the emissions increase, the cell is "dead" (red). If a cell has significantly low emissions and positively impacts its neighbors, it is "reproducing" (yellow).</p>
          <p>Rules:</p>
          <ul>
            <li>A cell is alive if its CO2 emissions have decreased or stayed the same, do not exceed 50 million tons, and the average emissions of its neighbors are less than or equal to 60 million tons.</li>
            <li>A cell is dead if its CO2 emissions increase, exceed 95 million tons, or if the average emissions of its neighbors exceed 50 million tons.</li>
            <li>A cell reproduces if the average emissions of its neighbors are low (less than or equal to 30 million tons) and there are more than 3 alive neighbors.</li>
          </ul>
        </div>
      </div>
    </div>
  );

};
export default GameOfLife;
