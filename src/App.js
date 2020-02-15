import React, { useReducer, useRef, useState } from "react";
import ToDoList from "./ToDoList";
import Footer from "./Footer";
import "./index.css";
import {
  BrowserRouter as Router,
  // NavLink,
  Route
  // useRouteMatch
} from "react-router-dom";
import Header from "./Header";

// import todosList from "./todos.json";

export const DispatchContext = React.createContext(null);
export const SetListContext = React.createContext(null);
// let FowardTodoRef = React.forwardRef((props, ref) => {
//   return (
//     <input
//       className="new-todo"
//       type="text"
//       placeholder=" type to do"
//       onKeyDown={props.onKeyDown}
//       autoFocus
//       ref={ref}
//     ></input>
//   );
// });

const App = () => {
  // let toDos = { todosList }.todosList;
  // console.log(toDos);
  // console.log(toDos[0]);
  // console.log(toDos[0].completed);

  const toDoRef = useRef();

  const [listText, setListText] = useState("");

  // const keyDownHandler = event => {
  //   if (event.key === "Enter") {
  //     console.log("entered");
  //     // console.log(event.target.value);
  //     // console.log(toDoRef.current.value);

  //     // console.log(toDo);
  //     setListText(event.target.value);
  //     dispatch({ type: "add" });
  //   }
  // };

  const [toDo, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        const addedToDo = {
          userId: 1,
          id: Math.floor(Math.random() * 100000),
          title: listText,
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
        // action.item.completed = action.item.completed ? false : true;

        return state.map(value => {
          if (value.id !== action.item.id) {
            return value;
          }
          return { ...value, completed: !value.completed };
        });

      case "deleteComplete":
        return state.filter(value => value.completed === false);

      default:
        return state;
    }
  }, []);

  // const keyDownHandler = event => {
  //   if (event.key === "Enter") {
  //     console.log("entered");
  //     console.log(event.target.value);
  //     console.log(toDoRef.current.value);

  //     console.log(toDo);

  //     dispatch({ type: "add" });
  //   }
  // };

  ///******* */

  // let homeMatch = useRouteMatch({ path: "/", exact: true });
  // let activeMatch = useRouteMatch({ path: "/active", exact: true });

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
    <Router>
      <React.Fragment>
        <DispatchContext.Provider value={dispatch}>
          <SetListContext.Provider value={setListText}>
            <section className="todoapp">
              <Header />
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
              {/* /////////////////////////////////////////////////////////////////////////////////////////// */}

              <Route exact path="/">
                <ToDoList toDo={toDo} />
              </Route>
              <Route
                exact
                path="/active"
                render={() => (
                  <ToDoList
                    toDo={toDo.filter(value => value.completed === false)}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/completed"
                render={() => (
                  <ToDoList
                    toDo={toDo.filter(value => value.completed === true)}
                  />
                )}
              ></Route>
              {/* ///////////////////////////////////////////////////////////////////////////*} */}
              {/* tried using a hook but no luck =( for use match instead of route */}
              {/* {homeMatch && <ToDoList toDo={toDo} />}

            {activeMatch && (
              <ToDoList
                toDo={toDo.filter(value => value.completed === false)}
                
              />
            )} */}
              {/* <ToDoList toDo={toDo} /> */}
              <Footer toDo={toDo} />
            </section>
          </SetListContext.Provider>
        </DispatchContext.Provider>
      </React.Fragment>
    </Router>
  );
};

export default App;

// const ToDoList = ({ toDo }) => {
//   const dispatch = useContext(DispatchContext);
//   return toDo.map((item, index) => {
//     return (
//       <section className="main" key={item.id}>
//         <ul className="todo-list">
//           <li
//             // style={
//             //   toDo[index].completed && { textDecorationLine: "line-through" }

//             className={toDo[index].completed ? "completed" : null}
//           >
//             <div className="view">
//               <input
//                 type="checkbox"
//                 className="toggle"
//                 onClick={() => dispatch({ type: "markComplete", index, item })}
//               ></input>
//               <label>{toDo[index].title}</label>
//               <button
//                 className="destroy"
//                 onClick={() => dispatch({ type: "delete", index, item })}
//               ></button>
//             </div>
//           </li>
//         </ul>{" "}
//       </section>
//     );
//   });
// };

// // const ActiveList = ({ toDo }) => {
// //   const dispatch = useContext(DispatchContext);
// //   return toDo.reduce((acc, item, index) => {
// //     if (!item.completed) {
// //       acc.push(item.completetd);
// //       return (
// //         <section className="main">
// //           <ul className="todo-list">
// //             <li
// //               // style={
// //               //   toDo[index].completed && { textDecorationLine: "line-through" }
// //               key={item.id}
// //               className={item.completed ? "completed" : null}
// //             >
// //               <div className="view">
// //                 <input
// //                   type="checkbox"
// //                   className="toggle"
// //                   onClick={() => dispatch({ type: "markComplete", index })}
// //                 ></input>
// //                 <label>{item.title}</label>
// //                 <button
// //                   className="destroy"
// //                   onClick={() => dispatch({ type: "delete", index })}
// //                 ></button>
// //               </div>
// //             </li>
// //           </ul>{" "}
// //         </section>
// //       );
// //     }
// //     return acc;
// //   }, []);
// // };

// const Footer = ({ toDo }) => {
//   const dispatch = useContext(DispatchContext);
//   return (
//     <React.Fragment>
//       <footer className="footer">
//         <span className="todo-count">
//           <strong>
//             {toDo.reduce((total, current) => {
//               if (!current.completed) {
//                 total += 1;
//               }
//               return total;
//             }, 0)}
//           </strong>{" "}
//           item(s) left
//         </span>
//         <ul className="filters">
//           <li>
//             <NavLink exact to="/" activeClassName="selected">
//               All
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/active" activeClassName="selected">
//               Active
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/completed" activeClassName="selected">
//               Completed
//             </NavLink>
//           </li>
//         </ul>
//         <button
//           className="clear-completed"
//           onClick={() => dispatch({ type: "deleteComplete" })}
//         >
//           Delete Completed
//         </button>
//       </footer>
//     </React.Fragment>
//   );
// };

// const Header = () => {
//   return (
//     <React.Fragment>
//       {/* <Header ref={toDoRef} onKeyDown={keyDownHandler} /> */}
//       <header className="header">
//         <h1 className="header">todos</h1>
//         <input
//           className="new-todo"
//           type="text"
//           placeholder=" type to do"
//           // onKeyDown={() => dispatch({ type: "add" })}
//           onKeyDown={keyDownHandler}
//           autoFocus
//           ref={toDoRef}
//         ></input>
//       </header>
//     </React.Fragment>
//   );
// };
