// import * as React from "react";
import "./App.css";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  AllTasksQuery,
  CreateTaskMutation,
  DeleteTaskMutation,
  UpdateTaskMutation,
} from "./graphql/generated/GeneratedGraphQL";
import axios from "axios";
import { EditModal } from "./modal";

function App() {
  const [data, setData] = useState<AllTasksQuery["allTasks"]["data"]>();
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    axios
      .post("/.netlify/functions/getTasks")
      .then((res) => res.data)
      .then((d) => setData((d as AllTasksQuery).allTasks.data));
  }, []);
  console.log(data);
  const handleClick = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const data = (
      await axios.post("/.netlify/functions/createTask", {
        description: input,
        completed: completed,
      })
    ).data as CreateTaskMutation;
    const obj = {
      _id: data.createTask._id,
      completed,
      description: input,
    };
    setData((p) => p?.concat(obj));
  };

  const deleteTask = async (id: string) => {
    (await axios.post("/.netlify/functions/deleteTask", { id })).data as DeleteTaskMutation;
    // const obj = data?.findIndex((el) => el?._id === id) ?? -1;
    // if (obj >= -1) return;
    // console.log("WOorking here", obj);
    setData((p) => p!.filter((el) => el?._id !== id));
  };
  const handleEdit = async (
    id: string,
    description: string,
    completed: boolean
  ) => {
    await axios.post<UpdateTaskMutation, null>("/.netlify/functions/updateTask", {
      id,
      data: { description, completed },
    });
    const newArr = [...data!];
    const obj = newArr!.find((el) => el!._id === id);
    if (!obj) {
      console.log(obj, newArr, "Not worked");
      return;
    }
    newArr[newArr.indexOf(obj)] = { _id: id, description, completed };
    setData(newArr);
  };
  return (
    <Container>
      <Typography align="center" variant="h1">
        CRUD APP
      </Typography>
      <Box minWidth="300px" width="50vw" marginX="auto" minHeight="400px">
        <TextField
          required
          id="standard-required"
          label="Task"
          fullWidth
          variant="filled"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Checkbox checked={completed} onClick={() => setCompleted((p) => !p)} />
        <span>Completed</span>
        <br />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add Task
        </Button>
        <br />
        <br />
        <br />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Completed</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow key={row?._id}>
                  <TableCell component="td" scope="row">
                    {row?._id}
                  </TableCell>
                  <TableCell align="right" component="td" scope="row">
                    {row?.description}
                  </TableCell>
                  <TableCell align="right">
                    {row?.completed ? "True" : "False"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => deleteTask(row!._id)}
                    >
                      Delete
                    </Button>

                    <EditModal
                      values={{
                        description: row!.description!,
                        completed: row!.completed!,
                      }}
                      id={row!._id}
                      onSubmit={handleEdit}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default App;
