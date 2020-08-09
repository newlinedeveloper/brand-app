import axios from "axios";
import { SERVER_URI, APP_KEY,USER_URI } from "../globals";


export const fetchAllUsers = async () => {
  try {
    const resObj = await fetch(USER_URI + `/api/users`, {
      method: "get",
    });

    const res = await resObj.json();
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

