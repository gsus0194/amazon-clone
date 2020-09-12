import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-amz-clone194.cloudfunctions.net/api",
  // baseURL: "http://localhost:5001/amz-clone194/us-central1/api",
});

export default instance;
