import client from "./client";

const register = (userInfo) => client.post("/api/users", userInfo);
const getAllUsers = () => client.get("/api/users");
const getDetailsOfAUser = (id) => client.get(`/api/users/${id}`);
const updateUser = (userInfo, id, onUploadProgress) =>
  client.post(
    "/api/users/update",
    {
      userInfo,
      id,
    },
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );

export default { getAllUsers, getDetailsOfAUser, register, updateUser };
