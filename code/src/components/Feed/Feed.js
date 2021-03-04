import React,{Component} from 'react';
import '../App/App.css';
import Task from "../Atoms/Tasks.js";
import imag from "./car_wash.jpeg";

export class Feed extends Component {
    render() {
        return (
            <div>
                <Task 
                img={imag}
                name={"Car Wash"}
                price={"25"}
                description={"I need my fucking car wash today. dont scratch it or ill kill yuo"}
                location={"420 ave"}
                deadline = {"today bitch"}
                />
            </div>
        )
    }
}

export default Feed
