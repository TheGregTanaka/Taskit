import './style.css'
import img_profile from '../../image/img_profile.png'
import imag from '../../image/car_wash.jpeg'

// import Feed from '../Feed/Feed'  // Dummy feed
import Tasks from '../Atoms/Tasks'

import StarRating from '../StarRating/StarRating'
import Review from '../Review/Review'

import { useEffect, useState } from 'react';
import axios from 'axios';

const company = [
    {
        name: 'Taskit',
        rating: 3.5,
        location: 'Boulder, CO',
        bio: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    }
]

const previousTasks = [
    {
        img: imag,
        name: 'Task 1',
        price: 100,
        description: 'Task 1 description',
        location: 'location 1',
        deadline: 'deadline 1',
    },
    {
        img: imag,
        name: 'Task 2',
        price: 200,
        description: 'Task 2 description',
        location: 'location 2',
        deadline: 'deadline 2',
    },
    {
        img: imag,
        name: 'Task 3',
        price: 300,
        description: 'Task 3 description',
        location: 'location 3',
        deadline: 'deadline 3',
    },
    {
        img: imag,
        name: 'Task 4',
        price: 400,
        description: 'Task 4 description',
        location: 'location 4',
        deadline: 'deadline 4',
    }
]

const CompanyProfile = () => {  
    const [reviews, setReviews] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [err, setErr] = useState(false);

    useEffect(() => {
        axios.all([
            axios.get("http://localhost:3200/review"),
            axios.get("http://localhost:3200/task")
        ])
        .then(axios.spread((reviewRes, taskRes) => {
            setReviews(reviewRes.data);
            setTasks(taskRes.data);
            setErr(false);

            console.log("Reviews Res: ", reviews);
            console.log("Tasks ResL ", tasks);
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

                            <br/>
                            <br/>
                            <p id='bio'>{company[0].bio}</p>
                        </div>

                        <div className="card-action">
                            <a href="#">Message</a>
                        </div>
                    </div>
                </div>
                <div className="col l10 fit-in-container" style={{backgroundColor: 'white'}}>
                    <div className="row" style={{marginTop:'1%'}}>
                        {!err && tasks.map((task) => (<div className="col"><Tasks img="!#" name={task.title} price={task.offeredPrice} 
                                                                description={task.description} location="" 
                                                                deadline={task.datePosted}/></div> ))}
                    </div>
                    <hr/>
                    <div className="row">
                        {!err & reviews.map((reviewer) => (<Review key={reviewer.key} username={reviewer.username} description={reviewer.description} ratingVal={reviewer.rating} img={reviewer.img}/>))}
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
