import React, { useEffect } from "react";
import Generate from "../Components/Generate";
import "./Success.css";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Cover3 from "../assets/Navraas.gif"
import Carousel from "../Components/Carousel";
import { useLocation } from "react-router-dom";

export default function Success() {
  const props = localStorage.getItem("data");
  const { state } = useLocation();
  const [data, setData] = useState();
  const [fetching, setFetching] = useState(true);

//   async function getDetails() {
//     let res = fetch("https://pass-server-o7gu.onrender.com/get_details", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         rno: state.rno,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
// 		console.log("Fetched Data");
//         console.log(data);
//         setData(data);
//         setFetching(false);
//       });
//   }
  
  useEffect(()=>{

  },[])

  return (
    <div>
      <div className="" style={{ display: "flex" }}>
        <div
          style={{
            float: "left",
            width: "50%",
            height: "764px",
            color: "white",
          }}
        >
          <div >
          <img src={Cover3} style={{width:"70%",marginLeft:'15%',marginTop:'5%'}}/>

        </div>
        </div>
        <div
          className="app__container "
          style={{
            backgroundColor: "black",
            width: "40%",
            height: "764px",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              textAlign: "center",
            }}
          >
            <div>
              <Typography
                sx={{
                  fontFamily: "Trebuchet MS",
                  fontSize: 20,
                  color: "white",
                }}
                variant="h5"
                component="div"
              >
                Hey {state.rno}!
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Trebuchet MS",
                  fontSize: 20,
                  color: "white",
                }}
                variant="h5"
                component="div"
              >
                You've successfully registered for an e-pass for Navraas!
              </Typography>
              <div className="card-container">
                <Generate tno={state.transactionId} rno={state.rno} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
