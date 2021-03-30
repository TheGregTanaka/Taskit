import './style.css'
import img_profile from '../../image/img_profile.png'


import Task from '../Task/Task'

import StarRating from '../StarRating/StarRating'
import Review from '../Review/Review'
import Chat from '../Chat/Chat';

import { useEffect, useState } from 'react';
import axios from 'axios';

const review_ENDPOINT = "http://localhost:3200/review";
const task_ENDPOINT = "http://localhost:3200/task";


const company = [
    {
        name: 'Taskit',
        rating: 3.5,
        location: 'Boulder, CO',
        bio: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    }
]

const CompanyProfile = () => {
    const [reviews, setReviews] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [err, setErr] = useState(false);

    useEffect(() => {
        axios.all([
            axios.get(review_ENDPOINT),
            axios.get(task_ENDPOINT)
        ])
        .then(axios.spread((reviewRes, taskRes) => {
            setReviews(reviewRes.data);
            setTasks(taskRes.data);
            setErr(false);

            console.log("Reviews Res: ", reviewRes.data);
            console.log("Tasks Res: ", taskRes.data);
        }))
        .catch(err => {
            setErr(true);
            console.log(err);
        });
    }, []);

    return (
        <div style={{margin: "2% 1% 5% 5%"}}>
            <div className="row">
                <div className="col l2 white accent-3">
                    <div className="card bio">
                        <img className="circle img-profile-responsive" src={img_profile} alt="Profile Image"/>
                        
                        <div className="card-content">
                            <center>
                                <span className="card-title">{company[0].name}</span>
                                
                                {/* The rating should be done in the backend specifically the stars should be created else change the class with unique id*/}
                                <StarRating value={company[0].rating}/>
                            </center>
                            <i className="fa fa-map-marker" style={{color: "black", marginRight:'3%'}}></i>
                            <span id='location'>{company[0].location}</span>

                            <br/><br/>
                            <p id='bio'>{company[0].bio}</p>
                        </div>

                        <div className="card-action">
                            <Chat />
                        </div>
                    </div>
                </div>
                <div className="col l10 fit-in-container" style={{backgroundColor: 'white'}}>
                    <div className="row" style={{marginTop:'1%'}}>
                        {!err && tasks.map((task) => (<div className="col"><Task img={task.img} name={task.title} price={task.offeredPrice} 
                                                                description={task.description} location={task.location}
                                                                deadline={task.datePosted}/></div> ))}
                    </div>
                    <hr/>
                    <div className="row">
                        {!err && reviews.map((review) => (<Review key={review.key} username={review.username} description={review.description} ratingVal={review.rating} img={review.img}/>))}
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
