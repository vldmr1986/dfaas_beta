import React from "react"; // useState
// import { Box, Heading } from "grommet";
// import Logo from "./logo.svg";
import "./App.sass";
import { DfHeaderbar } from "./components";
// import SignUp from "./components/signupForm";
import { SignupPage, SignupSuccessPage, SignupWarningPage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const [userData, setUserData] = useState({
  //   isAuth: false,
  //   customerid: null,
  //   customername: "",
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route
          path="/success"
          element={
            <>
              <DfHeaderbar />
              <SignupSuccessPage />
            </>
          }
        />
        <Route
          path="/error"
          element={
            <>
              <DfHeaderbar />
              <SignupWarningPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
    // <Box>
    //   <Box margin={{ left: "large", top: "medium" }} width={"medium"}>
    //     {" "}
    //     <img src={Logo} alt="Hpe" />
    //   </Box>
    //   <Box justify={"center"} align={"center"}>
    //     <Heading level={2}>Welcome to Ezmeral Data Fabric</Heading>
    //     <SignUp />
    //   </Box>
    // </Box>
  );
}

export default App;
