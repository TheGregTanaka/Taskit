import React from 'react';
import { useEffect, useState } from "react";
import "../App/App.css";
import Task from "../Atoms/Tasks.js";
import DetailedTask from "../DetailedTask/DetailedTask.js";
import axios from "axios";
import { makeStyles, Typography, Button }from "@material-ui/core";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {TypeID, Types, GetType } from '../../constants/tasks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Feed = () => {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState(false);
  const { search } = useLocation();
  const type = queryString.parse(search);
  const typeID = TypeID[type.t];


  useEffect(() => {
    let api = `${process.env.REACT_APP_DATA_API}/task/getFeed`;
    
    api += typeID ? `?type=${typeID}` : '';
    axios
      .get(api)
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
        <Typography gutterBottom variant="h2" component="h1" align="center">
          Feed:
        </Typography>
    <div className={useStyles.root} 
        style={{ marginLeft: "5%", marginRight: "5%", alignContent: "center", width: "100%"}}>
        {Types.map((type) => (
          <Button 
            variant="contained" 
            color={type.id == typeID ? "secondary" : "primary"}
            key={type.id} 
            href={'/feed?t=' + type.abbr}>
          {type.name}
          </Button>
        ))}
        <Button
          variant="contained"
          key="none"
          href={'/feed'}>
        Reset Filter
        </Button>
    </div>
      <div
        className=""
        style={{ marginLeft: "5%", marginRight: "5%", alignContent: "center" }}
      >

        <div className="row">
          {tasks.map((task) => (
            <Task
              name={task.title}
              typeID={task.typeID}
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
