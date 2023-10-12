import React from "react";
import Verify from "./Verify";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <div>
    <div className="grid grid-col-8">
      <div className="flex items-center justify-center w-full h-screen col-start-1 col-end-2 text-6xl text-center text-white bg-black "></div>
      <div className="col-start-5 m-auto " style={{}}>
        <Verify></Verify>
      </div>
    </div>
    <h1 style={{ color: 'white', zIndex: 2 }}>Hey</h1>

    </div>


    
  );
}
