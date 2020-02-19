import React from "react";
import { withRouter, Route } from "react-router-dom";
import ToDoList from "./ToDoList";

const Routes = ({ toDo }) => {
  return (
    <React.Fragment>
      <Route exact path="/">
        <ToDoList toDo={toDo} />
      </Route>
      <Route
        exact
        path="/active"
        render={() => (
          <ToDoList toDo={toDo.filter(value => value.completed === false)} />
        )}
      ></Route>
      <Route
        exact
        path="/completed"
        render={() => (
          <ToDoList toDo={toDo.filter(value => value.completed === true)} />
        )}
      ></Route>
    </React.Fragment>
  );
};

export default withRouter(Routes);
