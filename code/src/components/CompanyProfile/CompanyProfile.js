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
const reviewers = [
    {
        key: '893c5fc6-57d2-45eb-8634-40520d551cb1',
        username: "John Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        rating: 3.5,
        img: img_profile,
    },
    {
        key: '49012a3b-4e34-429c-b6f9-e4867c2b3fe2',
        username: "JT",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        rating: 3,
        img: img_profile,
    },
    {
        key: 'ab6ab93b-7d16-44f0-a66e-a64099478484',
        username: "Scarlet",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating: 1,
        img: img_profile,
    },
    {
        key: '3375565d-9dd5-4311-a738-e6d50d485db5',
        username: "tester",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        rating: 3.5,
        img: img_profile,
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

    useEffect(() => {
        axios
            .get("http://localhost:3200/review")
            .then(response => setReviews(response.data));
        
    }, []);

    console.log(reviews);
    
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
                        {previousTasks.map((previousTask) => (<div className="col"><Tasks img={previousTask.img} name={previousTask.name} price={previousTask.price} 
                                                                description={previousTask.description} location={previousTask.location} 
                                                                deadline={previousTask.deadline}/></div> ))}
                    </div>
                    <hr/>
                    <div className="row">
                        {reviews.map((reviewer) => (<Review key={reviewer.key} username={reviewer.username} description={reviewer.description} ratingVal={reviewer.rating} img={reviewer.img}/>))}
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
