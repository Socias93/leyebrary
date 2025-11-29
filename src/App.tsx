import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/index";

function App() {
  console.log("API URL:", import.meta.env.VITE_API_URL);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
