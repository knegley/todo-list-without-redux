import React, { useReducer, useRef } from "react";
import "./index.css";
// import todosList from "./todos.json";

const App = () => {
  // let toDos = { todosList }.todosList;
  // console.log(toDos);
  // console.log(toDos[0]);
  // console.log(toDos[0].completed);

  const toDoRef = useRef();

  const [toDo, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        const addedToDo = {
          userId: 1,
          id: Math.floor(Math.random() * 100000),
          title: toDoRef.current.value,
          completed: false
        };
        console.log(toDoRef.current);
        console.log(addedToDo);
        console.log([...state, addedToDo]);

        return [...state, addedToDo];

      case "delete":
        console.log(action.index);
        return state.filter((value, index) => index !== action.index);

      case "markComplete":
        state[action.index].completed = !state[action.index].completed;
        return [...state];

      case "deleteComplete":
        return state.filter(value => value.completed === false);

      default:
        return state;
    }
  }, []);

  const keyDownHandler = event => {
    if (event.key === "Enter") {
      console.log("entered");
      console.log(event.target.value);
      console.log(toDoRef.current.value);

      console.log(toDo);

      dispatch({ type: "add" });
    }
  };

  // const handleDelete = event => {
  //   console.log(event.target);
  //   console.log(event.target.id);
  //   let id = event.target.id;
  //   console.log(id);
  //   console.log(toDo);

  //   const filtered = toDo.filter(value => value.id !== id);
  //   console.log(filtered);
  //   dispatch({ type: "delete", index });
  //   return filtered;
  // };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder=" type to do"
        autoFocus
        // onKeyDown={() => dispatch({ type: "add" })}
        onKeyDown={keyDownHandler}
        ref={toDoRef}
      ></input>
      <input
        type="button"
        value="delete completed"
        onClick={() => dispatch({ type: "deleteComplete" })}
      ></input>
      {toDo.map((item, index) => {
        return (
          <div
            key={item.id}
            // style={
            //   toDo[index].completed && { textDecorationLine: "line-through" }
            className={toDo[index].completed ? "completed" : null}
          >
            {toDo[index].title}
            <input
              type="button"
              value="Delete"
              onClick={() => dispatch({ type: "delete", index })}
            ></input>
            <input
              type="checkbox"
              onClick={() => dispatch({ type: "markComplete", index })}
            ></input>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default App;
