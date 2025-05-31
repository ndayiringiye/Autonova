import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Welcome from "./Components/Welcome";
import Home from "./Pages/Home";
import ResetPassword from "./Pages/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;