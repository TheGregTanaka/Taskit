import React from 'react';
import "../App/App.css";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";


import Typography from "@material-ui/core/Typography";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import {Types} from '../../constants/tasks';


const Task = ({typeID, taskName, description, dateCompleted, taskerName}) => {
  const img = Types[typeID - 1].img;
  return (
    <>
      <div className="col" style={{ marginBottom:'1%' }}>
        <Card className="hoverable" style={{ width: 300 }}>
          {/* <CardActionArea> */}
            <CardMedia
                      component="img"
                      height="140"
                      src={img}
                      title="Task Image"
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
          {/* </CardActionArea> */}
          <label style={{float:"right", marginRight:"0.5vw"}}>Posted by {taskerName}</label>
          <CardActions>
            {/* <Chat /> */}
          </CardActions>
        </Card>
      </div>
    </>
  )
}

// Task.defaultProps = {
//   img: default_img,
// }

export default Task
