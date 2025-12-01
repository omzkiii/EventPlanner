import axios from "axios";

const api = axios.create({
  headers: { "Content-Type": "application/json" },
});

export async function fetchUsers() {
  const res = await api.get("/api/users");
  return res;
}
