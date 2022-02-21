import { User } from "../pages/api/user";
import axios from "axios";



export default async function getUser({ cookies = {} } = {}) {
    const { data:user } = await axios.get<User>("http://localhost:3000/api/user", { headers: cookies });;
    return user;
}
