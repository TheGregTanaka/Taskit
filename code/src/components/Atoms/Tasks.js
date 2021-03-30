import React, { Component } from "react";
import "../App/App.css";

import { Card, CardActionArea } from "@material-ui/core";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import imag from "../../image/car_wash.jpeg";

class Task extends Component {
  constructor() {
    super();
    this.state = {
      width: 400,
      height: 300,
    };
  }

  render() {
    const { img, name, price, description, location } = this.props;
    const Space = <div className="container">skldjflk</div>;
    return (
      <div>
        <Card style={{ width: 600 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={img}
              title="Contemplative Reptile"
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
            <Button size="small" color="primary" variant="outlined">
              Learn More
            </Button>
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
