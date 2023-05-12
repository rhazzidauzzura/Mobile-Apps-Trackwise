import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

// let url = "http://localhost:3000";
let url = "https://wild-flannel-shirt-foal.cyclic.app";

const initialize = {
  reports: [],
  report: {},
};

export function fetchReports(type) {
  return async (dispatch) => {
    const res = await axios.get(`${url}/reports`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    console.log(res);

    dispatch({
      type: "reports/fetchSuccess",
      payload: res,
    });
  };
}

export const reportById = (id) => {
  //   console.log(id, "ini aidi");
  return async (dispatch) => {
    const res = await axios.get(`${url}/report/${id}`, {
      headers: { access_token: localStorage.getItem("access_token") },
    });

    dispatch({
      type: "reportById/fetchSuccess",
      payload: res,
    });
  };
};

function counterReducer(state = initialize, action) {
  switch (action.type) {
    case "reports/fetchSuccess":
      return { reports: action.payload };
    case "reportById/fetchSuccess":
      return { report: action.payload };

    default:
      return state;
  }
}

let store = createStore(counterReducer, applyMiddleware(thunk));

export default store;
