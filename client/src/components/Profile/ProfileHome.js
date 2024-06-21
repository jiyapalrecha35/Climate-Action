import React from 'react';
import { BsFillCarFrontFill } from 'react-icons/bs';
import { IoIosHome } from "react-icons/io";
import { FaShoppingCart, FaFirstAid } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './Profile.css'

function Home() {
  const travelData = [
    { name: 'Jan', fuel: 4000, co2Savings: 2400, trips: 2400 },
    { name: 'Feb', fuel: 3000, co2Savings: 1398, trips: 2210 },
    { name: 'Mar', fuel: 2000, co2Savings: 9800, trips: 2290 },
    { name: 'Apr', fuel: 2780, co2Savings: 3908, trips: 2000 },
    { name: 'May', fuel: 1890, co2Savings: 4800, trips: 2181 },
    { name: 'Jun', fuel: 2390, co2Savings: 3800, trips: 2500 },
    { name: 'Jul', fuel: 3490, co2Savings: 4300, trips: 2100 },
  ];

  const homeData = [
    { name: 'Jan', energy: 4000, water: 2400, waste: 2400 },
    { name: 'Feb', energy: 3000, water: 1398, waste: 2210 },
    { name: 'Mar', energy: 2000, water: 9800, waste: 2290 },
    { name: 'Apr', energy: 2780, water: 3908, waste: 2000 },
    { name: 'May', energy: 1890, water: 4800, waste: 2181 },
    { name: 'Jun', energy: 2390, water: 3800, waste: 2500 },
    { name: 'Jul', energy: 3490, water: 4300, waste: 2100 },
  ];

  const materialsData = [
    { name: 'Jan', recycled: 4000, consumed: 2400 },
    { name: 'Feb', recycled: 3000, consumed: 1398 },
    { name: 'Mar', recycled: 2000, consumed: 9800 },
    { name: 'Apr', recycled: 2780, consumed: 3908 },
    { name: 'May', recycled: 1890, consumed: 4800 },
    { name: 'Jun', recycled: 2390, consumed: 3800 },
    { name: 'Jul', recycled: 3490, consumed: 4300 },
  ];

  const aidData = [
    { name: 'Jan', distributed: 4000, volunteers: 2400, funds: 2400 },
    { name: 'Feb', distributed: 3000, volunteers: 1398, funds: 2210 },
    { name: 'Mar', distributed: 2000, volunteers: 9800, funds: 2290 },
    { name: 'Apr', distributed: 2780, volunteers: 3908, funds: 2000 },
    { name: 'May', distributed: 1890, volunteers: 4800, funds: 2181 },
    { name: 'Jun', distributed: 2390, volunteers: 3800, funds: 2500 },
    { name: 'Jul', distributed: 3490, volunteers: 4300, funds: 2100 },
  ];

  return (
    <main className='main-container'>
      {/* <div className='main-title'>
        <h3 className="user-dashboard">USER DASHBOARD</h3>
      </div> */}

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3 style={{ color: 'whitesmoke' }}>TRAVEL</h3>
            <BsFillCarFrontFill className='card_icon' style={{ color: 'white' }} />
          </div>
          <h1>CO2 Savings: 320.98 Kg</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 style={{ color: 'whitesmoke' }}>HOME</h3>
            <IoIosHome className='card_icon' style={{ color: 'white' }} />
          </div>
          <h1>CO2 Savings: 450.8 Kg</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 style={{ color: 'whitesmoke' }}>MATERIALS</h3>
            <FaShoppingCart className='card_icon' style={{ color: 'white' }} />
          </div>
          <h1>CO2 Savings: 108.2 Kg</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 style={{ color: 'whitesmoke' }}>AID</h3>
            <FaFirstAid className='card_icon' style={{ color: 'white' }} />
          </div>
          <h1>CO2 Savings: 201.7 Kg</h1>
        </div>
      </div>

      <div className='charts'>
        <div className='chart-container'>
          <h4>Travel</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={travelData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="fuel" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="co2Savings" stroke="#82ca9d" />
              <Line type="monotone" dataKey="trips" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='chart-container'>
          <h4>Home</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={homeData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="energy" fill="#8884d8" />
              <Bar dataKey="water" fill="#82ca9d" />
              <Bar dataKey="waste" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='chart-container'>
          <h4>Materials</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={materialsData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="recycled" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="consumed" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='chart-container'>
          <h4>Aid</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aidData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="distributed" fill="#8884d8" />
              <Bar dataKey="volunteers" fill="#82ca9d" />
              <Bar dataKey="funds" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Home;
