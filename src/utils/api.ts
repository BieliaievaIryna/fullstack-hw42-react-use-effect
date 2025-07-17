import axios from "axios";
import type User from "../types/User.interface";

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Помилка при завантаженні користувача: ${error.message}`);
    }
    throw new Error("Невідома помилка");
  }
};