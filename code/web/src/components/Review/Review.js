import React from 'react';
import StarRating from '../StarRating/StarRating'
import img_profile from '../../image/img_profile.png'
import './style.css'

const Review = ({username, description, ratingVal, img}) => {
    return (
        <div className='review_box card-panel'>
            <div className='row' style={{marginBottom:'0'}}>
                <div className='col s5 m3'>
                    <div className='row'>
                        <div className='col tasker_img_div'>
                            <img className="circle reviewer-profile-img" src={img} alt="Profile Image"/>
                        </div>
                        <div className='col'>
                            <span className="name"><b>{username}</b></span>
                            <div style={{fontSize:'75%'}}>
                                <StarRating value={ratingVal}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col s7 m9 review_desc'>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

Review.defaultProps = {
    username: 'Firstname Lastname',
    img: img_profile,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
}


export default Review
