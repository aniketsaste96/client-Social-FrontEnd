
import './App.css';
import Home from "./pages/Home"
import Addpost from "./pages/Addpost"
import Profile from "./pages/Profile"
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { getAllPosts } from './redux/actions/postActions';
function App() {

  const { loading, LikeOrUnlikeLoading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts())


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
      <ProtectedRoute exact path="/profile">
        <Profile />
      </ProtectedRoute>
      <ProtectedRoute exact path="/addpost">
        <Addpost />
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