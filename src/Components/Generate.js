import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import CryptoJS from "crypto-js";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export default function Generate(tno) {
  const [value, setValue] = useState("");
  const [size, setSize] = useState(256);
  const [rno,setRno] = useState("");
  const encryptionKey = "f0e1d2c3b4a5968778695a4b3c2d1e0f";
  const encrypt = (tno) => {
    let dataToEncrypt = tno.tno;

    //   dataToEncrypt = CryptoJS.AES.encrypt(
    //     dataToEncrypt,
    //     encryptionKey
    //   ).toString();

    return dataToEncrypt;
  };

  const onConfirm = async () => {
    const encryptedValue = encrypt(tno);
    setValue(encryptedValue);

    // const data = {
    //     name: res.Name,
    //     year:res.year,
    //     rno: res.htno,
    //     phno: res.phone,
    //     id: res.rno,
    //     uniqKey: String(encryptedValue),
    //     entry: false
    // };
    // console.log(data);
    // try {
    //     const response = await fetch("https://pass-server-o7gu.onrender.com/send_details", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     });
    //     console.log(response);
    //     if (response.ok) {
    //         console.log("Data sent successfully");
    //     } else {
    //         console.log("Data sending failed");
    //     }
    // } catch (error) {
    //     console.error("Error sending data:", error);
    // }
    localStorage.removeItem("data");
  };

  useEffect(() => {
     setRno(localStorage.getItem("data"));
  }, );

  return (
    <div>
      <center>
        
        <Typography
          sx={{
            paddingTop:"10px",
            fontFamily: "Trebuchet MS",
            fontSize: 17,
            color: "black",
          }}
          variant="h5"
          component="div"
        >
          Please save your QR code! No QR? No entry!
        </Typography>
        <Typography
          sx={{
            fontFamily: "Trebuchet MS",
            fontSize: 13,
            color: "black",
          }}
          variant="h5"
          component="div"
        >
          Note: Each QR can be scanned only once. Any QR codes generated through
          fake transaction ID's will be denied entry.
        </Typography>
        
        <Button
          onClick={(e) => {
            onConfirm();
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
          GET YOUR QR CODE
        </Button>
        <br />
        <br />
        <br />
        {value && (
          <QRCode
            title="Entry Code"
            value={value}
            size={size === "" ? 0 : size}
          />
        )}
      </center>
    </div>
  );
}
