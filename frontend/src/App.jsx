import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useContext, useState, useEffect } from "react";
import Loader from "./components/Loader";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./context/AuthContext";
import { userStatus } from "./helpers/userApiCommunicator";

const TopBar = lazy(() => import("./components/TopBar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const LeasedPlots = lazy(() => import("./components/LeasedPlots"));
const AllPlots = lazy(() => import("./components/AllPlots"));
const AddNewPlot = lazy(() => import("./components/AddNewPlot"));
const UpdatePlot = lazy(() => import("./components/UpdatePlot"));
const AddNewLeasePlot = lazy(() => import("./components/AddNewLeasePlot"));
const UpdateLeasePlot = lazy(() => import("./components/UpdateLeasePlot"));

const App = () => {

  const auth = useContext(AuthContext);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const getUserStatus = async () => {
      const res = await userStatus();
      console.log("u", res.data);
      if (res.data.status === "404") {
        auth.setIsLoggedIn(false);
        auth.setUser({ username: "", email: "" });
      }
      else if (res.status === 200) {
        auth.setIsLoggedIn(true);
        auth.setUser({ username: res.data.username, email: res.data.email });
      }
      else {
        toast.error(res.data, {
          position: "top-right"
        });
        auth.setIsLoggedIn(false);
        auth.setUser({ username: "", email: "" });
      }
    }
    getUserStatus();
  }, [auth.isLoggedIn]);

  const toggleMenu = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <Router>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <TopBar click={toggleMenu} show={showSidebar} />
        {showSidebar &&
          <Sidebar click={setShowSidebar} />
        }
        <Routes>
          <Route
            path="/"
            element={<LoginForm />}
          />
          <Route
            path="/signup"
            element={<SignupForm />}
          />
          <Route
            path="/leased-plots"
            element={<LeasedPlots />}
          />
          <Route
            path="/leased-plots/add-lease"
            element={<AddNewLeasePlot />}
          />
          <Route
            path="/leased-plots/update-lease/:id"
            element={<UpdateLeasePlot />}
          />
          <Route
            path="/all-plots"
            element={<AllPlots />}
          />
          <Route
            path="/all-plots/add-plot"
            element={<AddNewPlot />}
          />
          <Route
            path="/all-plots/update-plot/:id"
            element={<UpdatePlot />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
