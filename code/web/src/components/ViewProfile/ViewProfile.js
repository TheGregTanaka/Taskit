import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './ViewProfile.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core'; 

import EditProfile from './EditProfile';


const ViewProfile = ({login}) => {
    const [profile, setProfile] = useState([]);
    const [err, setErr] = useState(false);

    const api = process.env.REACT_APP_DATA_API;
    const profile_imag = `${process.env.REACT_APP_DATA_API}/img/static/img_profile.png`;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DATA_API}/task`) //url from node js server (get & post request)
            .then((response) => {
                setProfile(response.data); //response.data is data from request
                setErr(false);
                console.log("Tasks Res: ", response.data);
            })
            .catch(err => {
                setErr(true);
                console.log(err);
            });
    }, []);
    return (
            <div class="container">
                <div class="row">
                    <div class="col-10">&nbsp;</div>
                        <div class="col-2" style={{float:"right"}}>
                            <a href="./EditProfile">
                                <button varient="contained" color="inherit">Edit Profile</button>
                            </a> 
                        </div>
                    </div> 
                <div class="row">
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src={profile_imag} width="150"></img>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="table">
                            <tr>
                                <th>
                                    Name:
                                </th>
                                <td>
                                    John Sullivan
                                </td>
                                <th>
                                    Rating:
                                </th>
                                <td>
                                    5/5 
                                    {/* Import Star Rating System */}   
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Location:
                                </th>
                                <td>
                                    Boulder, CO
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Bio:
                                </th>
                                <td>
                                    John Sullivan is a Human Resources specialist with a decade of successful experience in hiring and employee management. John specializes in Human Resource technologies and regularly attends national training sessions to showcase new HR tech trends, such as self-service, wellness apps, and people analytics tools. A strong believer in the power of positive thinking in the workplace, John regularly develops internal wellness campaigns to assist employees with effective mental health techniques. John enjoys a good Netflix binge but can also be found on long bike rides on hilly country roads.
                                </td>
                            </tr>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ViewProfile
