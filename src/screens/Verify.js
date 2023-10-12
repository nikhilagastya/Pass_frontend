import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import Loader from "react-js-loader";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import Carousel from "../Components/Carousel";
import Cover1 from "../assets/Cover1.png"
const Verify = () => {
  const [Data, setData] = useState({
    Name: "",
    year: "",
    htno: "",
    rno: "",
    phone: "",
    pic: "",
  });
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  const [phone, setPhone] = useState("");
  const [id, setid] = useState("");
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState("");
  const [pass, setPass] = useState("");
  const [prompt, setPrompt] = useState("");
  const [fetching, setFetching] = useState(false);
  const [block,setBlock] = useState(false);
  const [jsonData,setJsonData] = useState();
  const [valid,setValid] = useState(false);
  const [flag,setFlag] = useState(false);

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

  useEffect(() => {
    if (id.trim().length == 10) {
      console.log("Use Effect called");
      setFetching(true);
      let res = fetch("https://pass-server-o7gu.onrender.com/get_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rno: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(!data.Success || data==undefined){
            setFlag(true);
            setValid(false);
            setFetching(false);
            toast.error("Enter a valid roll number", {
              position: toast.POSITION.TOP_CENTER
          });
            setid("");
          }
          else{
            setFlag(false);
            if(data.TransactionId.length!=4){
            setFetching(false);
            toast.success("You've already registered for KMIT Navraas", {
              position: toast.POSITION.TOP_CENTER
          });
            setid("");
            setBlock(true);
            setValid(false);
          }
          else{
            setFetching(false);
            setPrompt("Hey " + data.Name +`! Your password is the last 5 digits of your parent's
            registered number, starting with ` +  data.Prompt);
            setJsonData(data);
            setValid(true);
            return data;}
          // console.log(data);
          }
        });
    } else {
      setFetching(false);
      setFlag(false);
      setPrompt("");
      setValid(false);
      setBlock(false);
    }
  }, [id]);

  var s_data = {};

  async function checkAndValidate() {
    return new Promise((resolve, reject) => {
      fetch("https://pass-server-o7gu.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rno: id,
          pass: pass,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.Success) {
            console.log(data.Success);
            console.log("Success aindhi ra");
            resolve(true);
          } else {
            console.log(data.Success);
            resolve(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  }

  async function handleSend(event) {
    event.preventDefault();

    if (id.trim().length !== 10) {
      toast.error("Enter a valid roll number", {
        position: toast.POSITION.TOP_CENTER
    });
    } else {
      try {
        const isValid = await checkAndValidate();
        if (isValid) {
          setHasFilled(true);
          await navigate("/Events");
          localStorage.setItem("data", "" + id);
        } else {
          toast.error("You entered a wrong password.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // event.preventDefault();

    // if (id.trim().length != 10) {
    //   alert("Enter a valid roll number");
    // } else {
    //   if(checkAndValidate()){
    //     setHasFilled(true);
    //     await navigate("/Events");
    //   localStorage.setItem("data", JSON.stringify(id));
    //   }
    //   else{
    //     window.alert("You entered a wrong password.");
    //   }

    //Fetch Roll Number and compare password. If true, setHasFilled(True)
    //Else reject it by giving an alert

    //Call prompt, it will give me all the details, access with .prompt
    //Input is "rno"
    // Verify with /Login, input is "rno", "pass", will given json that has success:True/False
    // If true

    // generateRecaptcha();
    // console.log(id);
    // let d = await getDetails(id);
    // //  s_data=d
    // var ph = "+91" + d.phone;

    // let appVerifier = window.recaptchaVerifier;
    // signInWithPhoneNumber(auth, ph, appVerifier)
    //   .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the

    //     // user in with confirmationResult.confirm(code).
    //     window.confirmationResult = confirmationResult;
    //   })
    //   .catch((error) => {
    //     // Error; SMS not sent
    //     console.log(error);
    //   });
  }

  // async function getDetails(id) {
  //   let res = await fetch("http://teleuniv.in/netra/api.php/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       method: "32",
  //       rollno: id,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     });

  //   const info = {
  //     Name: res.firstname,
  //     year: res.currentyear,
  //     htno: res.hallticketno,
  //     rno: res.rollno,
  //     phone: res.phone,
  //     pic: res.picture,
  //   };
  //   s_data = info;
  //   localStorage.setItem("data", JSON.stringify(s_data));

  //   return info;
  // }

  // const verifyOtp = (event) => {
  //   let otp = event.target.value;
  //   setOtp(otp);

  //   if (otp.length === 6) {
  //     // verifu otp
  //     let confirmationResult = window.confirmationResult;
  //     confirmationResult
  //       .confirm(otp)
  //       .then((result) => {
  //         // User signed in successfully.
  //         let user = result.user;

  //         console.log("success");
  //         const storedData = JSON.parse(localStorage.getItem("data"));
  //         if (storedData) {
  //           console.log(storedData);
  //         } else {
  //           console.log("Data not found in local storage.");
  //         }

  //         navigate("/events");
  //         // ...
  //       })
  //       .catch((error) => {
  //         // User couldn't sign in (bad verification code?)
  //         // ...
  //         localStorage.removeItem("data");
  //         alert("User couldn't sign in (bad verification code?)");
  //       });
  //   }
  // };

  if (!hasFilled) {
    if (isMobile) {
      toast("Use a laptop/desktop.");
      return (
        <div style = {{marginTop:100, textAlign:'center'}}>
          <ToastContainer />

          {/* <h1>Use a laptop, dawg.</h1> */}
        </div>
      );
    } else {
      return (
        <>
          <div
            style={{
              float: "left",
              // backgroundColor: "black",
              width: "50%",
              height: "764px",
              color: "white",
            }}
          >
            <ToastContainer />

            <div >
          <a href = "https://www.instagram.com/pr.kmit"><img src={Cover1} style={{width:"70%",marginLeft:'15%',marginTop:'5%'}}/></a>

        </div>
          </div>
          <div
            className="app__container "
            style={{ backgroundColor: "black", width:"40%",}}
          >
            <div>
            <div>
              <img
                src="Cover3.gif"
                style={{
                  textAlign: "center",
                  objectFit: "cover",
                  marginTop:"15%",
                  marginBottom:"5%",
                  width: "100%",
                  height: "80%",
                  marginRight: "5%",
                }}
                alt="background"
              />
            </div>
            <div>
              {/* <h1 style = {{color:"white", fontFamily:"Times New Roman", margin:5}}>Navraas 23</h1> */}
            </div>
            <Card
              sx={{
                backgroundColor: "#0E0D0D",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",

                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    padding: "20px",
                    fontFamily: "Trebuchet MS",
                    fontSize: 20,
                    color: "white",
                  }}
                  variant="h5"
                  component="div"
                >
                  You're gonna need an e-pass to enter <u ><a href = "https://www.instagram.com/kmitofficial" target="_blank">KMIT Navraas!</a></u>
                </Typography>

                <form style={{ color: "white" }}>
                  {/* <TextField
                sx={{ width: "240px", color:"white" }}
                variant="outlined"
                autoComplete="off"
                label="Roll Number"
                value={id}
                onChange={(event) => setid(event.target.value)}
                inputProps={{ style: { color: 'white' } }}
              /> */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      style={{
                        width: "240px",
                        marginLeft: 20,
                        height: "50px",
                        color: "white",
                        backgroundColor: "black",
                        border: "1px solid white",
                        // textTransform: "uppercase" // This will apply uppercase to the text
                      }}
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your Roll Number!"
                      value={id}
                      onChange={(event) =>
                        setid(event.target.value.toUpperCase())
                      }
                    />
                    {fetching ? (
                      <div>
                        <Loader
                          type="spinner-cub"
                          bgColor={"#FFFFFF"}
                          color={"#FFFFFF"}
                          size={10}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  {id.trim().length == 10 && valid ? (
                    <div style = {{marginTop:10}}>
                      <input
                        style={{
                          width: "240px",
                          marginLeft: 20,
                          height: "50px",
                          color: "white",
                          backgroundColor: "black",
                          border: "1px solid white",
                        }}
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your password!"
                        value={pass}
                        onChange={(event) => setPass(event.target.value)}
                      />
                      {block?(<Typography
                        sx={{
                          padding: "20px",
                          fontFamily: "Trebuchet MS",
                          fontSize: 15,
                          color: "white",
                        }}
                        variant="h5"
                        component="div"
                      >
                        You've already registered for Navraas '23!
                      </Typography>):(flag?(<Typography
                        sx={{
                          padding: "20px",
                          fontFamily: "Trebuchet MS",
                          fontSize: 15,
                          color: "white",
                        }}
                        variant="h5"
                        component="div"
                      >
                        Enter a valid roll number!
                      </Typography>):(<Typography
                        sx={{
                          padding: "20px",
                          fontFamily: "Trebuchet MS",
                          fontSize: 15,
                          color: "white",
                        }}
                        variant="h5"
                        component="div"
                      >
                        {prompt}
                      </Typography>))}
                      
                    </div>
                  ) : (
                    <img src="PRLogo.png" style={{height:0, width:0, border:0}}/>
                    

                  )}
                  <Button
                    onClick={(e) => {
                      handleSend(e);
                    }}
                    sx={{
                      width: "240px",
                      marginLeft: 3,
                      color: "black",
                      fontWeight: "bold",
                      marginTop: "20px",
                      fontFamily: "Trebuchet MS",
                      backgroundColor: "#24B5F4",
                    }}
                  >
                    Get your pass!
                  </Button>
                </form>

              </CardContent>
            </Card>
            <div style = {{textAlign:'center'}}>
            <Typography
                        sx={{
                          paddingTop: "12px",
                          fontFamily: "Trebuchet MS",
                          fontSize: 13,
                          color: "gray",
                        }}
                        variant="h5"
                        component="div"
                      >
                        An initiative by the <a href = "https://www.instagram.com/pr.kmit" target = "_blank"><b><u>Public Relations Team</u></b></a>
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Trebuchet MS",
                          fontSize: 13,
                          color: "gray",
                        }}
                        variant="h5"
                        component="div"
                      >
                        Developed by Nikhil Agastya, designed by Pranav Dhulipala
                      </Typography>
                      </div>
          </div>
          </div>
          <div id="recaptcha"></div>
        </>
      );
    }
  } else {
    if (isMobile) {
      return (
        <div>
          <h1>Use a laptop, dawg.</h1>
        </div>
      );
    }
    return (
      <>
        <div
          style={{
            float: "left",
            backgroundColor: "black",
            width: "50%",
            height: "764px",
          }}
        >
          <Carousel></Carousel>
        </div>
        <div
          className="app__container"
          style={{
            float: "right",
            backgroundColor: "black",
            width: "50%",
            height: "764px",
          }}
        >
          <Card sx={{ width: "300px" }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ padding: "20px", fontFamily: "Trebuchet MS" }}
                variant="h5"
                component="div"
              >
                Enter the OTP
              </Typography>
              <TextField
                sx={{ width: "240px" }}
                variant="outlined"
                label="OTP "
                value={otp}
                // onChange={verifyOtp}
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
