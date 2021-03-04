import './style.css'
import img_profile from './img_profile.png'

import Feed from '../Feed/Feed'

const CompanyProfile = () => {
    return (
        <div className='' style={{margin: "5% 5% 5% 5%"}}>
            <div className="row">
                <div className="col m5 l3 white accent-3">
                    <div className="card">
                        <img className="circle img-profile-responsive" src={img_profile} alt="Profile Image"/>
                        
                        <div className="card-content">
                            <center>
                                <span className="card-title">Firstname Lastname</span>
                                
                                {/* The rating should be done in the backend specifically the stars should be created else change the class with unique id*/}
                                <span id='rating'>3.0</span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star unchecked"></span>
                                <span className="fa fa-star unchecked"></span>
                            </center>
                            <i className="fa fa-map-marker" style={{color: "black"}}></i>
                            <span id='location'>Location</span>

                            <br/>
                            <br/>
                            <p id='bio'>
                                "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
                            </p>
                        </div>

                        <div className="card-action">
                            <a href="#">Message</a>
                    </div>
                </div>
            </div>

                <div className="col m7 l9">
                    

                    <table>
                        <tr className="rowC">
                            <div style={{margin: "1% 1% 1% 1%"}}>
                                <Feed />
                            </div>
                            <div style={{margin: "1% 1% 1% 1%"}}>
                                <Feed />
                            </div>
                            <div style={{margin: "1% 1% 1% 1%"}}>
                                <Feed />
                            </div>
                        </tr>
                    </table>
                    
                </div>

            </div>
        </div>
    )
}

export default CompanyProfile
