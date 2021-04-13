import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './ViewProfile.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core'; 
import { useHistory } from 'react-router';

async function EditInfoCall(field) {
    const api = process.env.REACT_APP_DATA_API;
    const profile_imag = `${process.env.REACT_APP_DATA_API}/img/static/img_profile.png`;
    const user = JSON.parse(localStorage.getItem('user'));
    // Where to do if statements for null/blank input?

    const response = await axios.post(api + '/editProfile/' + user.id, {
        name: field.name,
        phone: field.phone,
        bio: field.bio
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

const EditProfile = ({}) => {
    const [error, setError] = useState();
    const [name, setName] = useState();
    const [phone,setPhone] = useState();
    const [bio,setBio] = useState();
    const history = useHistory();
    const data1 = async e => {
        e.preventDefault();
        const message = await EditInfoCall({ name, phone, bio });
      if (message.error) {
        setError(message.error);
      }
      history.push('/ViewProfile');
    }
    return (
            <div class="container">
                <div class="row">
      <form onSubmit={data1}>
                    <div class="col-10">&nbsp;</div>
                    <div class="col-10">
                        <div class="table">
                            <tr>
                                <th>
                                    Full Name:
                                </th>
                                <td>
                                    <div class="form-group">
                                        <input style={{color:"white"}} type="text" class="form-control" name="name" placeholder="Name" onChange={e => setName(e.target.value)}></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Phone:
                                </th>
                                <td>
                                    <div class="form-group">
                                        <input style={{color:"white"}} type="text" class="form-control" name="phone" placeholder="Phone" onChange={e => setPhone(e.target.value)}></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Bio:
                                </th>
                                <td>
                                    <div class="form-group">
                                        <input style={{color:"white"}} type="text" class="form-control" name="bio" placeholder="Bio" onChange={e => setBio(e.target.value)}></input>
                                    </div>
                                </td>
                            </tr>
                        </div>
                    </div>
                    <div class="col-8" style={{float:"middle"}}>                    
                        <Button variant="contained" color="inherit" type="submit">Submit</Button>
                    </div>
      </form>
                </div>
            </div>
    )

}

export default EditProfile
