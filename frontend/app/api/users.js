import client from "./client";

const register = (userInfo) => client.post("/api/users", userInfo);
const getAllUsers = () => client.get("/api/users");
const getDetailsOfAUser = (id) => client.get(`/api/users/${id}`);
const updateUser = (userInfo, id) =>
  client.post("/api/users/update", {
    userInfo,
    id,
  });

export default { getAllUsers, getDetailsOfAUser, register, updateUser };
