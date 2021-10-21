import axios from "axios";
import { create } from "apisauce";

const customAxiosInstance = axios.create({
  baseURL: "INSERT CLOUDINARY URL",
});

const apisauceInstance = create({ axiosInstance: customAxiosInstance });
