import axios from "axios";
import { message } from "antd"




//register
export const userRegister = (values) => async dispatch => {

    dispatch({ type: "LOADING", payload: true })
    try {
        await axios.post("/api/users/register", values)
        //after loading
        dispatch({ type: "LOADING", payload: false })
        message.success("User registered Successfully!!")
        window.location.href = "/login"
    } catch (error) {
        console.log(error);
        message.error("Something went wrong!!")

    }
}


//login
export const userLogin = (values) => async dispatch => {
    dispatch({ type: "LOADING", payload: true })


    try {
        const response = await axios.post("/api/users/login", values)
        //after loading
        dispatch({ type: "LOADING", payload: false })
        message.success("User logged in Successfully!!!")
        //we cannot store json into local strorage so convert into strong
        localStorage.setItem('user', JSON.stringify(response.data))
        window.location.href = "/"


    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false })
        message.error("Invalid Credentials!!")

    }
}