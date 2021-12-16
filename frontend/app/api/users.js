import client from "./client";

const register = (userInfo) => client.post("/api/users", userInfo);
const getAllUsers = () => client.get("/api/users");
const getDetailsOfAUser = (id) => client.get("/api/users");

export default { getAllUsers, getDetailsOfAUser, register };
