import React, { useContext } from "react";
import { DispatchContext } from "./App";

const ToDoList = ({ toDo }) => {
  const dispatch = useContext(DispatchContext);
  return toDo.map((item, index) => {
    return (
      <section className="main" key={item.id}>
        <ul className="todo-list">
          <li
            // style={
            //   toDo[index].completed && { textDecorationLine: "line-through" }

            className={toDo[index].completed ? "completed" : null}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                onClick={() => dispatch({ type: "markComplete", index, item })}
              ></input>
              <label>{toDo[index].title}</label>
              <button
                className="destroy"
                onClick={() => dispatch({ type: "delete", index, item })}
              ></button>
            </div>
          </li>
        </ul>{" "}
      </section>
    );
  });
};

export default ToDoList;
