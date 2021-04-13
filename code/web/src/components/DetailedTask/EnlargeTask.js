import React from 'react';
import Map from '../Map/Map.js';
const EnlargeTask = ({name, price, description, email, phone,
                    address, city, state, zip, country}) => {
    return (
        <div>
            
            <center><h5>{name.toUpperCase()}</h5></center>
            <div>
                <div>
                    <b>Price: </b> ${price}
                </div>
                <div>
                    <b>Address: </b> {address + ", " + city + ", " + state + ", " + zip + ", " + country}
                </div>
                <div>
                    <b>Description: </b>{description}
                </div>
                <div>
                <br />
                    <b>Contact Info</b> <br/>
                    &nbsp;&nbsp;&nbsp;<b>Email: </b>{email} <br/>
                    &nbsp;&nbsp;&nbsp;<b>Phone: </b>{phone}
                </div>
                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>
                    <Map 
                      address={address + ", " + city + ", " + state + ", " + zip + ", " + country}
                    />
                </div>
            </div>
        </div>
    )
}

export default EnlargeTask
