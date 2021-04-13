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
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DATA_API}/user/${user.id}`) //url from node js server (get & post request)
            .then((response) => {
                setProfile(response.data[0]); //response.data is data from request
                setErr(false);
                //console.log("Res: ", response.data);
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
                                    {profile.name}
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
                                    Phone Number:
                                </th>
                                <td>
                                    {profile.phone}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Bio:
                                </th>
                                <td>
                                    {profile.bio}
                                </td>
                            </tr>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ViewProfile
