import axios from "axios";

const API = "http://localhost:8000/";

const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export async function fetchData() {
  const res = await api.get("");
  console.log(res.data);

  return res.data;
}
