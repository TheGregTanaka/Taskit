import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './ViewProfile.css';
import profile_imag from '../../image/img_profile.png';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core'; 

const ViewProfile = ({login}) => {
    const [profile, setProfile] = useState([]);
    const [err, setErr] = useState(false);

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
                        </div>
                    </div>
                </div>
                <div class="col-2" style={{float:"middle"}}>                    
                    <Button variant="contained" color="inherit" onClick={() => setProfile("EditProfile")}>Submit</Button>
                </div>
            </div>
    )
}

export default ViewProfile
