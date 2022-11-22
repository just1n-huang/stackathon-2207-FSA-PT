import axios from "axios";
const fave = (state = [], action) => {
  if (action.type === "SET_FAVES") {
    return action.payload;
  }

  if (action.type === "DELETE_FAVE") {
    return state.filter((fave) => fave.id !== action.payload.id);
  }
  if (action.type === "CREATE_FAVE") {
    return [...state, action.payload];
  }
  return state;
};

export const fetchFave = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/faves");
    dispatch({ type: "SET_FAVES", payload: response.data });
  };
};

export const createFave = (fave) => {
  return async (dispatch) => {
    const response = await axios.post("/api/faves", fave);
    dispatch({ type: "CREATE_FAVE", payload: response.data });
  };
};

export const deleteFave = (fave) => {
  return async (dispatch) => {
    console.log(fave);
    await axios.delete(`/api/faves/${fave.id}`);
    dispatch({ type: "DELETE_FAVE", payload: fave });
  };
};

export default fave;
