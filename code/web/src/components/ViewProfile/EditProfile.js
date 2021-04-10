import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './ViewProfile.css';
import profile_imag from '../../image/img_profile.png';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core'; 

async function EditInfoCall(FirstName, LastName, Location, Bio) {
    const api = process.env.REACT_APP_DATA_API;
    // Where to do if statements for null/blank input?
    const response = await axios.post(api + '/ViewProfile', {
        firstname: FirstName,
        lastname: LastName,
        location: Location,
        bio: Bio
    })
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      console.log(err);
      return {data:null};
    });
        
    return response;
}

const EditProfile = ({login}) => {
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
                    <div class="col-10">
                        <div class="table">
                            <tr>
                                <th>
                                    First Name:
                                </th>
                                <td>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="firstName" id="password" placeholder="First Name"></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Last Name:
                                </th>
                                <td>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="lastName" placeholder="Last Name"></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Location:
                                </th>
                                <td>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="location" placeholder="Location"></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Bio:
                                </th>
                                <td>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="bio" placeholder="Bio"></input>
                                    </div>
                                </td>
                            </tr>
                        </div>
                    </div>
                    <div class="col-8" style={{float:"middle"}}>                    
                        <Button variant="contained" color="inherit" onClick={() => EditInfoCall()}>Submit</Button>
                        {/* How to make EditInfoCall(firstName, lastName, location, bio) */}
                    </div>
                </div>
            </div>
    )
}

export default EditProfile
