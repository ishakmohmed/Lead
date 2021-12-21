import client from "./client";

const register = (userInfo) => client.post("/api/users", userInfo);
const getAllUsers = () => client.get("/api/users");
const getDetailsOfAUser = (id) => client.get(`/api/users/${id}`);
const updateUser = (profilePic, name, email, bio, password) =>
  client.post("/api/users/update", { profilePic, name, email, bio, password });

export default { getAllUsers, getDetailsOfAUser, register, updateUser };
