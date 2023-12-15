import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";


export default function App() {
  return (
    <>
      <SideBar/>
      <Routes>
        <Route path="/app" Component={Landing} />
        <Route path="/app/login" Component={Login} />
        <Route path="/app/register" Component={Register} />
      </Routes>
    </>
  );
}
