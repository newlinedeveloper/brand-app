import axios from "axios";
import { SERVER_URI, APP_KEY,USER_URI } from "../globals";


export const fetchAllUsers = async (pageId) => {
  try {
    const resObj = await fetch(USER_URI + `/api/users/?page=${pageId}`, {
      method: "get",
    });

    const res = await resObj.json();
    console.log(res.data)
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

