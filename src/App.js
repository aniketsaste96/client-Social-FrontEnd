
import './App.css';
import Home from "./pages/Home"
import Addpost from "./pages/Addpost"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { getAllPosts } from './redux/actions/postActions';
import { getAllUsers } from './redux/actions/userActions';
import AllUsers from './pages/AllUsers';
function App() {

  const { loading, LikeOrUnlikeLoading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts())
    dispatch(getAllUsers())


  }, [])

  return (
    // spinner
    <div className="App">
      {(loading || LikeOrUnlikeLoading) && (<div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>)}


      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <ProtectedRoute exact path="/">
        <Home />
      </ProtectedRoute>
      <ProtectedRoute exact path="/profile/:id" >
        <Profile />
      </ProtectedRoute>
      <ProtectedRoute exact path="/addpost">
        <Addpost />
      </ProtectedRoute>
      <ProtectedRoute exact path="/allusers">
        <AllUsers />
      </ProtectedRoute>
      <ProtectedRoute exact path="/editprofile">
        <EditProfile />
      </ProtectedRoute>
    </div>
  );
}

export default App;


//Protected Routes
export const ProtectedRoute = (props) => {
  if (localStorage.getItem('user')) {
    return <Route {...props} />
  } else {
    return <Redirect to="/login" />
  }
}