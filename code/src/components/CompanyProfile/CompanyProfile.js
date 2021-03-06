import './style.css'
import img_profile from '../../image/img_profile.png'

import Feed from '../Feed/Feed'
import Rating from '../Rating/Rating'
import Review from '../Review/Review'


const description = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.";


const CompanyProfile = ({username, location}) => {
    return (
        <div style={{margin: "5% 1% 5% 5%"}}>
            <div className="row">
                <div className="col l2 white accent-3">
                    <div className="card bio">
                        <img className="circle img-profile-responsive" src={img_profile} alt="Profile Image"/>
                        
                        <div className="card-content">
                            <center>
                                <span className="card-title">{username}</span>
                                
                                {/* The rating should be done in the backend specifically the stars should be created else change the class with unique id*/}
                                <Rating rating={3.5}/>
                            </center>
                            <i className="fa fa-map-marker" style={{color: "black", marginRight:'3%'}}></i>
                            <span id='location'>{location}</span>

                            <br/>
                            <br/>
                            <p id='bio'>{description}</p>
                        </div>

                        <div className="card-action">
                            <a href="#">Message</a>
                    </div>
                </div>
            </div>

                <div className="col l10 fit-in-container" style={{backgroundColor: 'white'}}>
                    <div className="row" style={{marginTop:'1%'}}>
                        <div className="col">
                            <Feed />
                        </div>
                        <div className="col">
                            <Feed />
                        </div>
                        <div className="col">
                            <Feed />
                        </div>
                        <div className="col">
                            <Feed />
                        </div>
                    </div>

                    <hr/>

                    <div className="row">
                        <Review description={description}/>
                        <Review description={description}/>
                        <Review description={description}/>
                        <Review description={description}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

CompanyProfile.defaultProps = {
    username: 'Firstname Lastname',
    location: 'location',
    
}

export default CompanyProfile
