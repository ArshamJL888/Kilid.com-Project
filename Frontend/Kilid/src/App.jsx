import Header from "./layouts/header.jsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
function App() {

    let location = useLocation();
    let navigate = useNavigate();   

    return <> 
    {/* <div className="container-fluid app-container-content"> */}
    <div className="app-container-content">
        {location.pathname !== "/authentication" && <Header active="1"/>  }  
        <div className="route-content">
            <Outlet/>
        </div>
    </div>
    </>
}

export default App; 