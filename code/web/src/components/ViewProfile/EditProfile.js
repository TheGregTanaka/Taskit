import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './ViewProfile.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core'; 

async function EditInfoCall(field) {
    const api = process.env.REACT_APP_DATA_API;
    const profile_imag = `${process.env.REACT_APP_DATA_API}/img/static/img_profile.png`;
    // Where to do if statements for null/blank input?

    const response = await axios.post(api + '/editProfile', {
        name: field.Name,
        location: field.Location,
        bio: field.Bio
    })
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      console.log(err);
      return {data:null};
    });
        
    return response.data;
}

const EditProfile = ({login, setProfile, profileExists}) => {
    const [err, setErr] = useState(false);
    const [name, setName] = useState();
    const [location,setLocation] = useState();
    const [bio,setBio] = useState();
    const data = async e => {
        e.preventDefault();
        const message = await EditInfoCall({ name, location, bio});
        setProfile(message);
    }
    if (profileExists){
        return (
                <div class="container">
                    <div class="row">
                        <div class="col-10">&nbsp;</div>
                        <div class="col-10">
                            <div class="table">
                                <tr>
                                    <th>
                                        Full Name:
                                    </th>
                                    <td>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="name" placeholder="Name" onChange={e => setName(e.target.value)}></input>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Location:
                                    </th>
                                    <td>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="location" placeholder="Location" onChange={e => setLocation(e.target.value)}></input>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Bio:
                                    </th>
                                    <td>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="bio" placeholder="Bio" onChange={e => setBio(e.target.value)}></input>
                                        </div>
                                    </td>
                                </tr>
                            </div>
                        </div>
                        <div class="col-8" style={{float:"middle"}}>                    
                            <Button variant="contained" color="inherit">Submit</Button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default EditProfile
