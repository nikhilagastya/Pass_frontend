import React from 'react'
import Generate from '../Components/Generate';
import "./Success.css"
export default function Success() {
    const props =JSON.parse(localStorage.getItem("data"));
  return (
    <div>
        <div className="card-container">
			<header>
				<img src={props.pic} alt={props.Name} />
			</header>
			<h1 className="bold-text">
				 <span className="normal-text">{props.Name}</span>
			</h1>
			<h2 className="normal-text">{props.htno}</h2>
            <h2 className="normal-text">{props.rno}</h2>
			<div className="social-container">
				<Generate rno={props.rno} />
			</div>
           
		</div>
    </div>
  )
}
