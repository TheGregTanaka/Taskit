import React,{Component} from 'react';
import '../App/App.css';
import DetailedTask from '../DetailedTask/DetailedTask'

export class Feed extends Component {
    render() {
        return (
            <div>
                <DetailedTask 
                name={"Car Wash"}
                price={"25"}
                description={"I need my fucking car wash today. dont scratch it or ill kill yuo"}
                location={"420 ave"}
                deadline = {"today bitch"}
                email = {"XXX@gmail.com"}
                phone = {'XXX-XXX-XXXX'}
                />
            </div>
        )
    }
}

export default Feed
