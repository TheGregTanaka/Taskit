import PropTypes from 'prop-types'

import Rating from '../Rating/Rating'
import img_profile from '../../image/img_profile.png'
import './style.css'

const Review = ({description}) => {
    return (
        <div className='review_box' style={{margin: "1% 1% 1% 1%"}}>
            <div className='row'>
                <div className='col s5 m2'>
                    <img className="circle img-profile-responsive" src={img_profile} alt="Profile Image"/>
                    <center>
                        <span className="name"><b>Firstname Lastname</b></span>
                        {/* The rating should be done in the backend specifically the stars should be created else change the class with unique id*/}
                        <Rating rating={3.5}/>
                    </center>
                </div>
                <div className='col s7 m10' style={{marginTop:"3%"}}>
                    <p className='review_desc'>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Review
