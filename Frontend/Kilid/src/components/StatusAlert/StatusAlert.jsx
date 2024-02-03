import {Alert} from "react-bootstrap";
import './StatusAlert.css'

// eslint-disable-next-line react/prop-types
function StatusAlert({errorBody, colorType}) {

    return <>
        <Alert
            className="Error-box"
            style={
                {
                    width: "30%",
                    margin: "1rem auto",
                    textAlign: "center",
                    color: "#333333",
                    fontSize: "1.1rem",
                    fontWeight: "550",
                    fontFamily: "Vazirmatn"
                }
            }
            variant={colorType}>
            {errorBody}
        </Alert>
    </>

}

export default StatusAlert;