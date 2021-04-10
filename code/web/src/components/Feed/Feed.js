import React from 'react';
import { useEffect, useState } from "react";
import "../App/App.css";
import Task from "../Atoms/Tasks.js";
import DetailedTask from "../DetailedTask/DetailedTask.js";
import imag from "./car_wash.jpeg";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

const Feed = () => {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DATA_API}/task/getFeed`)
      .then((response) => {
        setTasks(response.data);
        setErr(false);
        console.log("Tasks Res: ", response.data);
      })
      .catch((err) => {
        setErr(true);
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div
        className=""
        style={{ marginLeft: "5%", marginRight: "5%", alignContent: "center" }}
      >
        <Typography gutterBottom variant="h2" component="h1" align="left">
          Feed:
        </Typography>

        <div className="row ">
          {tasks.map((task) => (
            <Task
              name={task.title}
              price={task.price}
              description={task.description}
              location={task.address}
              deadline={task.datePosted}
              email={task.email}
              phone={task.phone}
              id={task.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
