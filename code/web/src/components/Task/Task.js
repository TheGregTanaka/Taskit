import React from 'react';
import "../App/App.css";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";


import Typography from "@material-ui/core/Typography";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import default_img from "../../image/car_wash.jpeg";


const Task = ({img, taskName, description, dateCompleted, taskerName}) => {
  return (
    <>
      <div className="col" style={{ marginBottom:'1%' }}>
        <Card style={{ width: 300 }}>
          <CardActionArea>
            <CardMedia
                      component="img"
                      height="140"
                      image={img}
                      title="Contemplative Reptile"
                    />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2" align="left" noWrap>
                {taskName.toUpperCase()}
              </Typography>
              <Typography gutterBottom variant="body2" align="left">
                Completed on {dateCompleted}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="left"
                noWrap
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <label style={{float:"right", marginRight:"0.5vw"}}>Posted by {taskerName}</label>
          <CardActions>
            {/* <Chat /> */}
          </CardActions>
        </Card>
      </div>
    </>
  )
}

Task.defaultProps = {
  img: default_img,
}

export default Task
