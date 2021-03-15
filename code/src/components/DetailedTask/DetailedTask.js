import React, { Component } from "react";
import "../App/App.css";

import core, { Card, CardActionArea } from "@material-ui/core";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class DetailedTask extends Component {
  constructor() {
    super();
    this.state = {
      width: 400,
      height: 300,
    };
  }

  render() {
    const { name, price, description, location, deadline, email, phone } = this.props;
    return (
      <Card style={{ width: 300 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="left">
              {name} - <b>${price}</b>
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              <b>Deadline: </b> {deadline}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              <b>Address: </b> {location}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              <b>Description: </b>{description}
            </Typography>

            <hr/>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              <b>Contact Info</b>
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              <b>Email: </b>{email}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              <b>Phone: </b>{phone}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" variant="outlined">
            Learn More
          </Button>
          <Button size="small" color="primary" variant="outlined">
            Message
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default DetailedTask;
