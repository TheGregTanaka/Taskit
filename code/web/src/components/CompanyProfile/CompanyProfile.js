import React, { useEffect, useState } from 'react';


import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Review from '../Review/Review'

import Task from '../Task/Task'
import Typography from "@material-ui/core/Typography";

import img_profile from '../../image/img_profile.png'
import './style.css';

import axios from 'axios';



const user = JSON.parse(localStorage.getItem('user'));
const id = user ? user.id : 'null';


const api = process.env.REACT_APP_DATA_API;
const profile_ENDPOINT = `${api}/user/${id}`;
const avgRating_ENDPOINT = `${api}/review/getAvgRating/${id}`;


const companyInfo_ENDPOINT = `${api}/companyProfile/${id}`;


const CompanyProfile = () => {
    const [companyInfo, setCompanyInfo] = useState([]);
    const [profile, setProfile] = useState([{name: "", bio: ""}]);
    const [avgRating, setAvgRating] = useState(null);
    const [err, setErr] = useState(false);

    useEffect(() => {
        axios.all([
            axios.get(avgRating_ENDPOINT),
            axios.get(companyInfo_ENDPOINT),
            axios.get(profile_ENDPOINT),
        ])
        .then(axios.spread((avgRatingRes, companyInfoRes, profileRes) => {
            setAvgRating((avgRatingRes.data)[0].avgRating);
            setCompanyInfo(companyInfoRes.data);
            setProfile(profileRes.data);
            setErr(false);

            console.log("Profile Res: ", profileRes.data);
            // console.log("avgRating Res: ", (avgRatingRes.data)[0].avgRating);
            // console.log("Reviews Res: ", reviewRes.data);
            // console.log("Tasks Res: ", taskRes.data);
        }))
        .catch(err => {
            setErr(true);
            console.log(err);
        });
    }, []);

  if (profile[0]) {
    return (
        <div style={{margin: "2% 1% 5% 5%"}}>
            <div className="row">
                <div className="col l2 white accent-3">
                    <div className="card bio">
                        {/* <img className="circle img-profile-responsive" src={img_profile} alt="Profile Image"/> */}
                        <div className="card-content">
                            <center>
                                <span className="card-title">{profile[0].name}</span>
                                <Rating key={id + avgRating} defaultValue={avgRating} precision={0.5} size='small' readOnly />
                            </center>
                            <p id='bio'>{profile[0].bio}</p>
                        </div>
                        <div className="card-action">
                            <Button href={`mailto:${profile[0].email}`} size="small" color="primary">
                                <Typography style={{color:"#ffab40"}}>Email</Typography>
                            </Button>
                            <Button size="small" color="primary">
                                <Typography style={{color:"#ffab40"}}>{profile[0].phone}</Typography>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col l10 fit-in-container" style={{backgroundColor: 'white'}}>
                    <div className="row" style={{color:"black", marginTop:'1%'}}>
                        <Typography gutterBottom variant="h5" component="h2" align="left">
                            Completed Tasks
                        </Typography>
                        <hr/>
                    </div>
                    <div className="row" style={{marginTop:'1%'}}>
                        {!err && companyInfo.map((task) => (<Task className="col" key={task.taskID} img={task.taskImg} taskName={task.taskTitle}
                                                                description={task.taskDesc} dateCompleted={((task.dateCompleted).split("T"))[0]} taskerName={task.reviewerName}/>))}
                    </div>
                    <div className="row" style={{color:"black", marginLeft:"1%", marginTop:'1%'}}>
                        <Typography gutterBottom variant="h5" component="h2" align="left">
                            Reviews
                        </Typography>
                        <hr/>
                    </div>
                    <div className="row">
                        {!err && companyInfo.map((review) => (<Review key={review.reviewId} username={review.reviewerName} description={review.reviewDesc} ratingVal={review.reviewRating} img={review.reviewerPic}/>))}
                    </div>
                </div>
            </div>
        </div>
    )
  } else {
    return (<Redirect to="/login" />);
  }
}

export default CompanyProfile
