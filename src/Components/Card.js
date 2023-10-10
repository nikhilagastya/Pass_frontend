import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Payment from "../screens/Payment";
import "../screens/Success.css"

export default function Card(props) {

  const navigate= useNavigate();
const [pay, setpay] = useState(false)
const [price, setprice] = useState(100);

  
  const onBuy=()=>{
    const storedData = JSON.parse(localStorage.getItem("data")); 
    if(!localStorage.getItem('data')){
      navigate("/");
    }
    else{
      setpay(true);
    }
  }
  

  return (
    <div style={{width:"400px",top:'px', paddingTop:"10%"}}>
     
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="poster.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Naavras '23</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
       
        <Payment cost={price}></Payment>
       
        
    </div>
</div>


    </div>
  );
}
//
