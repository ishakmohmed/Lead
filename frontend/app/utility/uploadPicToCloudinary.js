import axios from "axios";
import { create } from "apisauce";

const customAxiosInstance = axios.create({
  baseURL: process.env.CLOUDINARY_URL,
});

const apisauceInstance = create({ axiosInstance: customAxiosInstance });
