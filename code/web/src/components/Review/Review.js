import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';


import './style.css'

const Review = ({username, description, ratingVal}) => {
    var nameSplit = username.split(' ')
    var letterAvatar = nameSplit[0][0] + nameSplit[1][0];
    return (
        <div className='review_box card-panel hoverable' style={{fontSize:'75%'}}>
            <div className='row' style={{fontSize:'75%',marginBottom:'0'}}>
                <div className='col s5 m3'>
                    <div className='row' style={{fontSize:'75%'}}>
                        <div className='col tasker_img_div' style={{marginTop:"2vh"}}>
                            <Avatar>{letterAvatar}</Avatar>
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
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
}


export default Review
