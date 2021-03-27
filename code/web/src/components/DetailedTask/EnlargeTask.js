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
                <div>
                <hr/>
                    <b>Contact Info</b> <br/>
                    <b>Email: </b>{email} <br/>
                    <b>Phone: </b>{phone}
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
