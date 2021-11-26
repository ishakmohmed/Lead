import client from "./client";

const register = (userInfo) => client.post("/api/users", userInfo);
const getAllUsers = () => client.post("/api/users");

export default { getAllUsers, register };
