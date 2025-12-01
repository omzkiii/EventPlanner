import axios from "axios";

const api = axios.create({
  // baseURL: "/api/",
  headers: { "Content-Type": "application/json" },
});

export async function fetchData() {
  const res = await axios.get("/api/users");
  return res.data;
}
