import React, { useContext } from "react";
import { DispatchContext, SetListContext } from "./App";

const Header = () => {
  //   useEffect(() => {
  //     effect;
  //     return () => {
  //       cleanup;
  //     };
  //   }, [input]);
  const dispatch = useContext(DispatchContext);
  const setListText = useContext(SetListContext);
  const keyDownHandler = event => {
    if (event.key === "Enter") {
      console.log("entered");
      // console.log(event.target.value);
      // console.log(toDoRef.current.value);

      // console.log(toDo);
      setListText(event.target.value);
      dispatch({ type: "add" });
      event.target.value = "";
    }
  };

  return (
    <React.Fragment>
      <header className="header">
        <h1 className="header">todos</h1>
        <input
          className="new-todo"
          type="text"
          placeholder=" type to do"
          // onKeyDown={() => dispatch({ type: "add" })}
          autoFocus
          onKeyDown={keyDownHandler}
        ></input>
      </header>
    </React.Fragment>
  );
};

export default Header;
