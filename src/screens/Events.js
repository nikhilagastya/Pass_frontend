import React from "react";
import Card from "../Components/Card";
import "./Success.css";
import Carousel from "../Components/Carousel";
import TransactionForm from "./TransactionForm";
import Cover2 from "../assets/Guidelines.png"

export default function Events() {
  if(localStorage.getItem("data")==undefined){
    return(
      <div>
        <h1 style = {{textAlign:'center', margin:300, color:'white', fontSize:50}}>
          Unauthorized Access!
        </h1>
      </div>
    )
  }
  return (
    <div
      className=""
      style={{
        display: "flex",
      }}
    >
      {/* <Card></Card> */}
      <div
        style={{
          float: "left",
          // backgroundColor: "black",
          width: "50%",
          height: "764px",
          color: "white",
        }}
      >
        <div >
          <img src={Cover2} style={{width:"70%",marginLeft:'15%',marginTop:'5%'}}/>

        </div>
      </div>
      
      <div
        className="app__container "
        style={{ backgroundColor: "black", width: "40%", height: "764px", justifyContent:'center', alignContent:'center', alignItems:'center' }}
      >
        <TransactionForm />
      </div>
    </div>
  );
}
