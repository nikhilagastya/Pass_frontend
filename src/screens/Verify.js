import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import Carousel from "../Components/Carousel";
const Verify = () => {
  const [Data, setData] = useState({
    Name: "",
    year:"",
    htno: "",
    rno: "",
    phone: "",
    pic: "",
  });
  const [phone, setPhone] = useState("");
  const [id, setid] = useState("");
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  var s_data = {};

  async function handleSend(event) {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    console.log(id);
    let d = await getDetails(id);
    //  s_data=d
    var ph = "+91" + d.phone;

    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, ph, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the

        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  }

  async function getDetails(id) {
    let res = await fetch("http://teleuniv.in/netra/api.php/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "32",
        rollno: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        return data;
      });

    const info = {
      Name: res.firstname,
      year:res.currentyear,
      htno: res.hallticketno,
      rno: res.rollno,
      phone: res.phone,
      pic: res.picture,
    };
    s_data = info;
    localStorage.setItem("data", JSON.stringify(s_data));

    return info;
  }

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let user = result.user;
        
          console.log("success");
          const storedData = JSON.parse(localStorage.getItem("data"));
          if (storedData) {
            console.log(storedData);
          } else {
            console.log("Data not found in local storage.");
          }

          navigate("/events");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          localStorage.removeItem("data");
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  };

  if (!hasFilled) {
    return (
      <>
      <div style={{float:"left",backgroundColor:"black",width:"50%",height:"764px",color:"white"}}>
       <Carousel></Carousel>
      </div>
      <div className="app__container " style={{float:"right",backgroundColor:"white",width:"50%",height:"764px"}}  >
        <div>
          <h1>Navrass</h1>
        </div>
        <Card  sx={{
             width:'150'
            }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ padding: "20px" }} variant="h5" component="div">
              Enter your netra id
            </Typography>
            <form onSubmit={handleSend}>
              <TextField
                sx={{ width: "240px" }}
                variant="outlined"
                autoComplete="off"
                label="id"
                value={id}
                onChange={(event) => setid(event.target.value)}
              />
              <br></br>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "240px", marginTop: "20px" }}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
        <div id="recaptcha"></div>
      </>
    );
  } else {
    return (
      <><div style={{float:"left",backgroundColor:"black",width:"50%",height:"764px"}}>
        <Carousel></Carousel>
      </div>
      <div className="app__container" style={{float:"right",backgroundColor:"white",width:"50%",height:"764px"}}>
        <Card sx={{ width: "300px" }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ padding: "20px" }} variant="h5" component="div">
              Enter the OTP
            </Typography>
            <TextField
              sx={{ width: "240px" }}
              variant="outlined"
              label="OTP "
              value={otp}
              onChange={verifyOtp}
            />
          </CardContent>
        </Card>
      </div>
        <div id="recaptcha"></div>
      </>
    );
  }
};

export default Verify;
