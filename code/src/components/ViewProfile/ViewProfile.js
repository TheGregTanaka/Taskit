import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './EditProfile.css';
import login from '../Login/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function Viewprofile(loggedIn) {
    if (loggedIn){
        const [profile, setProfile] = useState([]);
        const [err, setErr] = useState(false);

        useEffect(() => {
            axios.get("http://localhost:3200/task") //url from node js server (get & post request)
                .then((response) => {
                    setTasks(response.data); //response.data is data from request
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
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src= 'img_profile.png' width="300"></img>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8">
                        <div class="table">
                            <tr>
                                <th>
                                    Name:
                                </th>
                                <td>
                                    John Sullivan
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
        );
    }
    else {
        return (
            axios.redirect('http://localhost:3200/login')
        );
    }
}