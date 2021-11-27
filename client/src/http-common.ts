import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
Session.addAxiosInterceptors(axios);

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json"
  }
});