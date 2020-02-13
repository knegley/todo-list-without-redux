import React, { useReducer, useRef, useContext } from "react";
import "./index.css";
// import todosList from "./todos.json";

const DispatchContext = React.createContext(null);

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
      <DispatchContext.Provider value={dispatch}>
        <section className="todoapp">
          <Header ref={toDoRef} onKeyDown={keyDownHandler} />
          {/* <header className="header">
            <h1 className="header">todos</h1>
            <input
              className="new-todo"
              type="text"
              placeholder=" type to do"
              // onKeyDown={() => dispatch({ type: "add" })}
              onKeyDown={keyDownHandler}
              autoFocus
              ref={toDoRef}
            ></input>
          </header> */}
          <ToDoList toDo={toDo} />
          <Footer toDo={toDo} />
          {/* <footer className="footer">
            <span className="todo-count">
              <strong>
                {toDo.reduce((total, current) => {
                  if (!current.completed) {
                    total += 1;
                  }
                  return total;
                }, 0)}
              </strong>{" "}
              item(s) left
            </span>
            <button
              className="clear-completed"
              onClick={() => dispatch({ type: "deleteComplete" })}
            >
              Delete Completed
            </button>
          </footer> */}
        </section>
      </DispatchContext.Provider>
    </React.Fragment>
  );
};

export default App;

const ToDoList = ({ toDo }) => {
  const dispatch = useContext(DispatchContext);
  return toDo.map((item, index) => {
    return (
      <section className="main">
        <ul className="todo-list">
          <li
            // style={
            //   toDo[index].completed && { textDecorationLine: "line-through" }
            key={item.id}
            className={toDo[index].completed ? "completed" : null}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                onClick={() => dispatch({ type: "markComplete", index })}
              ></input>
              <label>{toDo[index].title}</label>
              <button
                className="destroy"
                onClick={() => dispatch({ type: "delete", index })}
              ></button>
            </div>
          </li>
        </ul>{" "}
      </section>
    );
  });
};

const Footer = ({ toDo }) => {
  const dispatch = useContext(DispatchContext);
  return (
    <React.Fragment>
      <footer className="footer">
        <span className="todo-count">
          <strong>
            {toDo.reduce((total, current) => {
              if (!current.completed) {
                total += 1;
              }
              return total;
            }, 0)}
          </strong>{" "}
          item(s) left
        </span>
        <button
          className="clear-completed"
          onClick={() => dispatch({ type: "deleteComplete" })}
        >
          Delete Completed
        </button>
      </footer>
    </React.Fragment>
  );
};

const Header = ({ ref }, { onKeyDown }) => {
  return (
    <React.Fragment>
      <header className="header">
        <h1 className="header">todos</h1>
        <input
          className="new-todo"
          type="text"
          placeholder=" type to do"
          onKeyDown={onKeyDown}
          autoFocus
          ref={ref}
        ></input>
      </header>
    </React.Fragment>
  );
};
