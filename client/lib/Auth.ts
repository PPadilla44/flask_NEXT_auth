import { User } from "../pages/api/user";
import axios from "axios";
import { UserReg } from "../components/Register";


export const getUser = async ({ cookies = {} }) => {
    const { data: user } = await axios.get<User>("http://localhost:3000/api/user", { headers: cookies });
    return user;

}

export const login = async ({ email, password }: { email: string, password: string }) => {

    const formData = new FormData();
    formData.append("email", email)
    formData.append("password", password)

    return await axios.post("http://localhost:5000/login", formData)
}

export const register = async (data: UserReg) => {

    const userData = new FormData();
    userData.append("first_name", data.firstName)
    userData.append("last_name", data.lastName)
    userData.append("email", data.email)
    userData.append("password", data.password)
    userData.append("cPassword", data.cPassword)

    return await axios.post("http://localhost:5000/register", userData)
}

export const validateReg = ({ firstName, lastName, email, password, cPassword }: UserReg) => {
    const errors = [];

    if(firstName.length < 2) {
        errors.push('First name must be at least 2 characters')
    } else if(firstName.match(/^[0-9a-z]+$/)) {
        errors.push('First name can NOT contain numbers')
    }

    if(lastName.length < 2) {
        errors.push('Last name must be at least 2 characters')
    } else if(lastName.match(/^[0-9a-z]+$/)) {
        errors.push('Last name can NOT contain numbers')
    }
    
    if(password.length < 8) {
        errors.push('Password must be at least 8 characters')
    } else if(password != cPassword) {
        errors.push('Passwords do not match')
    }

    return errors;
}