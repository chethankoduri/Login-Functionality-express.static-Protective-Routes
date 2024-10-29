import React from 'react';
import { useSelector } from 'react-redux';
import TopNavigation from './TopNavigation'

function Dashboard() {
let storeObj = useSelector((store)=>{
  return store;
});
  return <div>
    <TopNavigation/>
    <h1>Dashboard</h1>
    <h2>Welcome to {storeObj.loginDetails.firstName}
      {storeObj.loginDetails.lastName}
    </h2>
    <img src={`http://localhost:2222/${storeObj.loginDetails.profilePic}`}></img>
  </div> ;
};

export default Dashboard;