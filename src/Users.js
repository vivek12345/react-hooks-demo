import React, { useReducer, useEffect } from "react";
import Spinner from "react-svg-spinner";

const INITIAL_STATE = {
  loading: false,
  data: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LOADER":
      return {
        ...state,
        loading: action.payload
      };
    case "FETCHED_DATA":
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    default:
      return INITIAL_STATE;
  }
};

function Users(props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    // this console is to check if useEffect gets fired on every prop change
    console.log("useEffect was called");
    dispatch({ type: "TOGGLE_LOADER", payload: true });
    // added timeout to show the transition from loader to list of users
    let timerId = setTimeout(() => {
      fetch("https://reqres.in/api/users")
        .then(resp => resp.json())
        .then(data => {
          dispatch({ type: "FETCHED_DATA", payload: data.data });
        })
        .catch(error => {
          dispatch({ type: "TOGGLE_LOADER", payload: false });
        });
    }, 2000);
    return () => {
      clearTimeout(timerId);
      timerId = null;
    };
  }, []);
  return (
    <>
      <div>{props.counter}</div>
      {!state.loading ? (
        <ul>
          {state.data.map(user => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
        </ul>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Users;
