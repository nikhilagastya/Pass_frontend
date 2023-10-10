import React, { Component } from "react";

import "./App.css";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment_amount: props.cost,
    };

    this.paymentHandler = this.paymentHandler.bind(this);
  }

  paymentHandler(e) {
    e.preventDefault();
    console.log("Razorpay Key:", process.env.REACT_APP_RAZOR_PAY_TEST_KEY);
    const { payment_amount } = this.state;
    const self = this;
    const options = {
      key: process.env.REACT_APP_RAZOR_PAY_TEST_KEY,
      amount: payment_amount * 100,
      name: "Payments",
      description: "Donate yourself some time",

      handler(response) {
        const paymentId = response.razorpay_payment_id;
        const url =
          process.env.URL +
          "/api/v1/rzp_capture/" +
          paymentId +
          "/" +
          payment_amount;
        // Using my server endpoints to capture the payment
        fetch(url, {
          method: "get",
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
          .then((resp) => resp.json())
          .then(function (data) {
            console.log("Request succeeded with JSON response", data);
            self.setState({
              refund_id: response.razorpay_payment_id,
            });
          })
          .catch(function (error) {
            console.log("Request failed", error);
          });
      },

      prefill: {
        name: "Shashank Shekhar",
        email: "example@email.com",
      },
      notes: {
        address: "Patna,India",
      },
      theme: {
        color: "#9D50BB",
      },
    };
    console.log("Options:", options);
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  }

  render() {
    const { payment_amount, refund_id } = this.state;
    return (
      <>
        <form action="#" onSubmit={this.paymentHandler}>
      
          
            <button type="submit" className=" border-none inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay Now</button>
         
        </form>
      </>
    );
  }
}

export default Payment;
