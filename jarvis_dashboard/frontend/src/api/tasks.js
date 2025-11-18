import api from "./api";

export const getTasks = async () => {
    const response = await api.get("/");
    return response.data;
}