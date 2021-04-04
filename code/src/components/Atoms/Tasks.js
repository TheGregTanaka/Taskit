import React, { Component } from "react";
import "../App/App.css";
import Modal from "react-modal";

import { Card, CardActionArea } from "@material-ui/core";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import imag from "../../image/car_wash.jpeg";
import EnlargeTask from "../DetailedTask/EnlargeTask";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(56, 56, 56, 0.95)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
  
  
};

class Task extends Component {
  constructor() {
    super();
    this.state = {
      width: 400,
      height: 300,
      modalStatus: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState((prevState) => ({
      modalStatus: !prevState.modalStatus,
    }));
  }

  render() {
    const {
      img,
      name,
      price,
      description,
      location,
      deadline,
      email,
      phone,
      modalStatus,
    } = this.props;
    return (
      <div>
        <Card style={{ width: 900 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={img}
              title="Task Photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="left">
                {name} - <b>${price}</b>
              </Typography>
              <Typography gutterBottom variant="h6" component="h2" align="left">
                {location}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={this.handleClick}
            >
              Learn More
            </Button>
            <Modal
              open={modalStatus}
              style={customStyles}
              type="button"
              onClose={this.handleClick}
            >
              <div  className="container">
                <h2 id="simple-modal-title">Text in a modal</h2>
                <p id="simple-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                
              </div>
            </Modal>
          </CardActions>
        </Card>
        <br />
      </div>
    );
  }
}

Task.defaultProps = {
  img: imag,
  name: "default title",
  price: "default price",
  description: "default description",
  location: "default location",
  deadline: "deadline",
};
export default Task;
