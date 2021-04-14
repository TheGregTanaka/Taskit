import React from 'react';
import { useEffect, useState, useRef } from "react";
import "../App/App.css";
import Task from "../Atoms/Tasks.js";
import axios from "axios";
import { makeStyles, Typography, Button }from "@material-ui/core";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {TypeID, Types } from '../../constants/tasks';

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
  const mountedRef = useRef(true)


  useEffect(() => {
    let api = `${process.env.REACT_APP_DATA_API}/task/getFeed`;
    
    api += typeID ? `?type=${typeID}` : '';
    axios
      .get(api)
      .then((response) => {
        setTasks(response.data);
        setErr(false);
      })
      .catch((err) => {
        setErr(true);
        console.log(err);
      });
      return () => { mountedRef.current = false; }
  }, []);

  console.log(tasks)

  return (
    <div className="container">
    <div className={useStyles.root} 
        style={{ marginLeft: "5%", marginRight: "5%", alignContent: "center", width: "100%"}}>
        {Types.map((type) => (
          <Button 
            variant="contained"
            color={type.id == typeID ? "secondary" : ""}
            key={type.id} 
            style={{marginLeft:"0.1vw", marginRight:"0.1vw", marginTop:"2%"}}
            href={'/feed?t=' + type.abbr}>
          {type.name}
          </Button>
        ))}
        <Button
          variant="contained"
          color="secondary"
          key="none"
          style={{marginTop:"2%"}}
          href={'/feed'}>
        Reset Filter
        </Button>
    </div>
      <div style={{ marginLeft: "5%", marginRight: "5%", alignContent: "center" }}>
        <div className="row">
          {tasks.map((task) => (
            <Task
              key={task.id} id={task.id} typeID={task.typeID}
              name={task.title} price={task.price} description={task.description}
              email={task.email} phone={task.phone}
              posted={task.datePosted}
              address={task.address} city={task.city} state={task.state} zip={task.zip} country={task.country}
              taskerID={task.taskerID}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
