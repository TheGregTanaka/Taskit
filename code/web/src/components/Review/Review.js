import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';

import img_profile from '../../image/img_profile.png'

import './style.css'

const Review = ({username, description, ratingVal, img}) => {
    return (
        <div className='review_box card-panel hoverable' style={{fontSize:'75%'}}>
            <div className='row' style={{fontSize:'75%',marginBottom:'0'}}>
                <div className='col s5 m3'>
                    <div className='row' style={{fontSize:'75%'}}>
                        <div className='col tasker_img_div' style={{marginTop:"2vh"}}>
                            <Avatar alt="user_pic" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </div>
                        <div className='col' style={{marginTop:"2vh"}}>
                            <span className="name"><b>{username}</b></span>
                            <div style={{fontSize:'75%'}}>
                                <Rating  defaultValue={ratingVal} precision={0.5} size='small' readOnly />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col s7 m9 review_desc' style={{marginTop:"2vh"}}>
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
