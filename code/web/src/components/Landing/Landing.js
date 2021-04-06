import React from 'react';
import TypeCard from './TypeCard';

import './style.css';


const Types = [
    {id: 0, name: "Yard Work", img: "http://localhost:3200/img/static/car_wash.jpeg"},
    {id: 1, name: "Cleaning", img: "http://localhost:3200/img/static/car_wash.jpeg"},
    {id: 2, name: "Repair", img: "http://localhost:3200/img/static/car_wash.jpeg"},
    {id: 3, name: "Auto", img: "http://localhost:3200/img/static/car_wash.jpeg"},
    {id: 4, name: "Tech", img: "http://localhost:3200/img/static/car_wash.jpeg"},
    {id: 5, name: "Misc", img: "http://localhost:3200/img/static/car_wash.jpeg"},
];

const landing_img = "http://localhost:3200/img/static/landing_img.svg"

const Landing = () => {
    return (
        <div>
            <div className="main">
                <div className="main__container">
                    <div className="main__content">
                        <h1>THE FUTURE OF HOME</h1>
                        <h2>IMPROVEMENT</h2>
                        <p>Get your home tasks done.</p>
                        <button className="main__btn"><a href="/">Get Started</a></button>

                    </div>
                    <div className="main_image--container">
                        <img src={landing_img} alt="pic" id="main__img" />
                    </div>
                </div>
            </div>

            <div className="services" style={{marginBottom:"10vh"}}>
                <h1>Post tasks and find members in your community to complete them</h1>
                <div className="services__container">
                    <div className="services__card">
                        <h2> Make money completing tasks in your neighboorhood</h2>
                    </div>
                </div>
                <div className="container" style={{marginBottom:"30vh"}}>
                    <div className="row" style={{marginLeft:'7%'}}>
                        {Types.map((type) => (
                            <TypeCard key={type.id} type={type.name} img={type.img} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
