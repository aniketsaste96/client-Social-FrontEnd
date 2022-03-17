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

//get all users
export const getAllUsers = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/users/getallusers')
        dispatch({ type: 'LOADING', payload: false })
        dispatch({ type: 'GET_ALL_USERS', payload: response.data })

    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
        message.error('something went wrong')
    }

}


//Follow user

export const followUser = (values) => async dispatch => {
    console.log()
    dispatch({ type: 'FOLLOW_LOADING', payload: true })

    try {
        const response = await axios.post('/api/users/followuser', values)
        dispatch({ type: 'FOLLOW_LOADING', payload: response.data })
        message.success("Followed!!!")


    } catch (error) {
        console.log(error)
        dispatch({ type: 'FOLLOW_LOADING', payload: false })
        message.error('something went wrong')
    }

}
//unfollow user
export const unfollowUser = (values) => async dispatch => {
    dispatch({ type: 'UNFOLLOW_LOADING', payload: true })

    try {
        await axios.post('/api/users/unfollowuser', values)
        dispatch({ type: 'UNFOLLOW_LOADING', payload: false })
        message.success('UnFollowed successfully')

    } catch (error) {
        console.log(error)
        dispatch({ type: 'UnFOLLOW_LOADING', payload: false })
        message.error('something went wrong')
    }

}

//edit

//register
export const editUser = (values) => async dispatch => {

    dispatch({ type: "LOADING", payload: true })
    try {
        const response = await axios.post("/api/users/edit", values)
        //after loading
        dispatch({ type: "LOADING", payload: false })
        message.success("User Profile Updated Successfully!!")
        //update Local Storage
        localStorage.setItem("user", JSON.stringify(response.data))
        window.location.href = `profile/${response.data._id}`

    } catch (error) {
        console.log(error);
        message.error("Something went wrong!!")

    }
}
