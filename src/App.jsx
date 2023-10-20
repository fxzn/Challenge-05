import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Protected from "./components/auth/Protected";
import Search from "./pages/Search";
import DetailMovie from "./pages/DetailMovie";
import Login from "./users/Login";
import Register from "./users/Register";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "./components/footer/Footer";


function App() {
  return (
    // <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    // <GoogleOAuthProvider clientId={import.meta.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <GoogleOAuthProvider clientId={"776351979162-93pfudr17nst5mu2uq9d5ter0cpahdue.apps.googleusercontent.com"}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={
              <Protected>
                <Home/>
              </Protected>} />
              
            <Route path="/login" element={<Login />}/>

            <Route path="/register" element={<Register />}/>

            <Route path="/search" element={<Search />} />

            <Route path="users/detail/:id" element={
              <Protected>
                <DetailMovie />
              </Protected>}/>
        </Routes>
        <Footer/>
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
