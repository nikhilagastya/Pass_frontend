import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import CryptoJS from 'crypto-js';


export default function Generate(props) {
    const [value, setValue] = useState('');
    const [size, setSize] = useState(256);
    const encryptionKey = 'f0e1d2c3b4a5968778695a4b3c2d1e0f';
    const encrypt = (id,ph) => {
        let dataToEncrypt =  id + ph;
    
        for (let i = 0; i < 1; i++) {
          
          dataToEncrypt = CryptoJS.AES.encrypt(dataToEncrypt, encryptionKey).toString();
        }
    
        return dataToEncrypt;
      };


    const onConfirm = async () => {
        let res = JSON.parse(localStorage.getItem("data"));
        const encryptedValue = encrypt(res.rno, res.phone);
        setValue(encryptedValue);
      
        const data = {
            name: res.Name,
            year:res.year,
            rno: res.htno,
            phno: res.phone,
            id: res.rno,
            uniqKey: String(encryptedValue),
            entry: false
        };
        console.log(data);
        try {
            const response = await fetch("https://pass-server-o7gu.onrender.com/send_details", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response);
            if (response.ok) {
                console.log("Data sent successfully");
            } else {
                console.log("Data sending failed");
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
        localStorage.removeItem("data");
    };

    useEffect(() => {
        // You can perform any necessary action when 'value' updates here
    }, [value]);

    return (
        <div className="App">
            <center>
                <br />
                <br />
                <button onClick={onConfirm}>Confirm Details</button>
                <br />
                <br />
                <br />
                {value && (
                    <QRCode
                        title="Entry Code"
                        value={value}
                        size={size === '' ? 0 : size}
                    />
                )}
            </center>
        </div>
    );
}
