import React from 'react';
import TypeCard from './TypeCard';
import {Types} from '../../constants/tasks';

import './style.css';


const landing_img = `${process.env.REACT_APP_DATA_API}/img/static/landing_img.svg`

const Landing = () => {
    return (
        <div>
            <div className="main">
                <div className="main__container">
                    <div className="main__content">
                        <h1>THE FUTURE OF HOME</h1>
                        <h2>IMPROVEMENT</h2>
                        <p>Get your home tasks done.</p>
                        <button className="main__btn"><a href="/registeration">Get Started</a></button>

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
                <div className="" style={{  marginBottom:"20vh", width:"100vw"}}>
                    <div className="row" style={{alignContent:"center", alignItems:"center", justifyContent:"center", marginLeft:"11vw", marginRight:"11vw"}}>
                        {Types.map((type) => (
                            <TypeCard key={type.id} typeID={type.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
