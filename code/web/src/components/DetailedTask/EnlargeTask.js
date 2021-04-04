import React from 'react';
import Map from '../Map/Map.js';
const EnlargeTask = ({name, price, description, location, deadline, email, phone}) => {
    return (
        <div>
            
            <center><h5>{name.toUpperCase()}</h5></center>
            <div>
                <div>
                    <b>Price: </b> ${price}
                </div>
                <div>
                    <b>Deadline: </b> {deadline}
                </div>
                <div>
                    <b>Address: </b> {location}
                </div>
                <div>
                    <b>Description: </b>{description}
                </div>
                <br/>
                <div>
                <hr/>
                    <b>Contact Info</b> <br/>
                    &nbsp;&nbsp;&nbsp;<b>Email: </b>{email} <br/>
                    &nbsp;&nbsp;&nbsp;<b>Phone: </b>{phone}
                </div>
                <hr/>
                <div>
                    <Map 
                      location={location}
                    />
                </div>
            </div>
        </div>
    )
}

export default EnlargeTask
