import { useEffect, useState } from "react";
import "../App/App.css";
import Task from "../Atoms/Tasks.js";
import imag from "./car_wash.jpeg";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

const Feed = () => {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3200/task/getFeed")
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
              price={task.offeredPrice}
              description={task.description}
              location={"Palo Alto"}
              deadline={task.datePosted}
              email={"XXX@gmail.com"}
              phone={"XXX-XXX-XXXX"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
