import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import './App.css'
import {ThemeProvider} from "react-bootstrap";
import './i18n';
import {RouterProvider} from "react-router-dom";
import routes from "./routes.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(

<ThemeProvider dir="rtl">
        <RouterProvider
            router={routes}
        />
    </ThemeProvider>

)
