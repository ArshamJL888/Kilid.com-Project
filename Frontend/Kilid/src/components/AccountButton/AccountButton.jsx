import { Button } from "react-bootstrap"
import "./AccountButton.css";
import { Link } from "react-router-dom";
function AccountButton({ inputInfo = [],
  // clickAction,
  btnText }) {

    const handleNavigation = () => {
      console.log(inputInfo);
      // Other logic or side effects
    };

  return (
    <>
      <Button className="justify-content-center text-center observe-btn" >
        <Link onClick={handleNavigation} className="property-page-navigating-btn" to={{ pathname: `/property/${inputInfo.property.propertyId}`, state: { inputInfo } }}>{btnText}</Link>
      </Button>
    </>
  );
}

export default AccountButton;
