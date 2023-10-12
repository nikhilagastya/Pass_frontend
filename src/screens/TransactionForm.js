import React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import poster from "../assets/Poster1.png"
import { useNavigate } from "react-router-dom";

const TransactionForm = () => {
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const id = localStorage.getItem("data");
  const [prompt, setPrompt] = useState("");
  async function handleTransaction() {
    if (transactionId.length < 12) {
      window.alert("Enter a valid transaction ID.");
    } else {
      console.log("Roll is: " + id);
      console.log(id.length);
      let res = fetch("https://pass-server-o7gu.onrender.com/put_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rno: id,
          t_id: transactionId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.Success) {
            console.log("You've registered for Navraas");
            setPrompt("You've successfully registered for Navraas '23!");
            navigate("/Success", {
              state: {
                rno:id,
                transactionId: transactionId,
              },
            });
          } else {
            console.log(data.errors);
            setPrompt(data.errors);
          }
          return data;
        });
      setSubmitted(true);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems:'center',
        alignContent:'center',
        height: "100vh", // This will make it take the full height of the viewport
      }}
    >
      <Typography
        sx={{
          padding:"10px",
          fontFamily: "Trebuchet MS",
          fontSize: 20,
          color: "white",
        }}
        variant="h5"
        component="div"
      >
        You're one step away from getting your passes for Navraas '23!
      </Typography>
      <br />
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img class="rounded-t-lg" src={poster} alt="" />
        </a>
        <div class="p-5">
          <a href="#">
            <Typography
              sx={{
                fontFamily: "Trebuchet MS",
                fontSize: 20,
                color: "white",
              }}
              variant="h5"
              component="div"
            >
              Scan this QR & pay using your UPI app!
            </Typography>
            <Typography
        sx={{
          padding:"10px",
          fontFamily: "Trebuchet MS",
          fontSize: 15,
          color: "gray",
        }}
        variant="h5"
        component="div"
      >
        Make sure you enter the correct transaction ID. Any invalid transaction ID's will be denied entry.
      </Typography>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
          {/* <Payment cost={price}></Payment> */}
          <input
            style={{
              width: "100%",
              height: "50px",
              color: "white",
              backgroundColor: "black",
              border: "1px solid white",
            }}
            type="text"
            autoComplete="off"
            placeholder="Enter your Transcation ID!"
            value={transactionId}
            onChange={(event) => setTransactionId(event.target.value)}
          />
          <Button
            onClick={(e) => {
              handleTransaction(e);
            }}
            sx={{
              width: "240px",
              color: "black",
              fontWeight: "bold",
              marginTop: "20px",
              fontFamily: "Trebuchet MS",
              backgroundColor: "#24B5F4",
            }}
          >
            Submit my Transaction ID
          </Button>
          {submitted ? (
            <div>
              <br />
              <Typography
                sx={{
                  fontFamily: "Trebuchet MS",
                  fontSize: 20,
                  color: "white",
                }}
                variant="h5"
                component="div"
              >
                {prompt}
              </Typography>
            </div>
          ) : (
            <div></div>
          )}
          ;
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
