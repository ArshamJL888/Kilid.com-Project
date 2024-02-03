import { Container, Image, Nav, Navbar, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DealerAdButton from "../components/DealerAdButton/DealerAdButton";
import { useEffect, useState } from "react";
import { getFromLocalStorage, removeFromLocalStorage } from "../utils"
import "./header.css";
import { useNavigate } from "react-router-dom";

function Header() {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const logoUrl = "https://cdn.kilid.com/logos/new-brand/kilid-svg-new.svg";
  const [fullName, setFullName] = useState("");
  const [isLogin, setisLogin] = useState(false);
  const [isAgency, setIsAgency] = useState(false);
  let isUserLogin;
  let agency;
  useEffect(() => {
    isUserLogin = getFromLocalStorage("isLogin") || false;
    agency = getFromLocalStorage("isAgency");
    setisLogin(isUserLogin);
    if (isUserLogin) {
      if (agency) {
        let agency = getFromLocalStorage("agencyObject");
        console.log(agency);
        setFullName(agency.aname);
      }
      else {
        let firstName = getFromLocalStorage("name") || "کاربر"
        let lastName = getFromLocalStorage("fname") || "عزیز";
        setFullName(firstName + " " + lastName);
      }
    }
  })

  const handleExit = () => {
    localStorage.clear();
    navigate("/authentication", { replace: true })
  }
  return (
    <>
      <Navbar bg="light" expand="xxl" className="header-navbar-bottom">
        <Container>
          <Row className="bottom-header">
          </Row>
          <Col lg={6}></Col>
          <Col lg={4}>
            <Nav className="me-auto header-texts-bottom">
              {
                (getFromLocalStorage("isAgency") && getFromLocalStorage("isLogin")) ?
                  <>
                    <Nav.Link className="header-option-bottom" href="/create-new-ad">
                      <svg className="symbol-header" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M4.08398 2.33366C3.92927 2.33366 3.7809 2.39512 3.67151 2.50451C3.56211 2.61391 3.50065 2.76228 3.50065 2.91699V11.1168L6.6616 8.85898C6.86442 8.71411 7.13688 8.71411 7.33971 8.85898L10.5007 11.1168V2.91699C10.5007 2.76228 10.4392 2.61391 10.3298 2.50451C10.2204 2.39512 10.072 2.33366 9.91732 2.33366H4.08398ZM2.84655 1.67956C3.17474 1.35137 3.61986 1.16699 4.08398 1.16699H9.91732C10.3814 1.16699 10.8266 1.35137 11.1548 1.67956C11.4829 2.00774 11.6673 2.45286 11.6673 2.91699V12.2503C11.6673 12.4688 11.5452 12.669 11.3509 12.769C11.1566 12.869 10.9227 12.852 10.7449 12.725L7.00065 10.0505L3.25637 12.725C3.07857 12.852 2.84469 12.869 2.6504 12.769C2.4561 12.669 2.33398 12.4688 2.33398 12.2503V2.91699C2.33398 2.45286 2.51836 2.00774 2.84655 1.67956Z" fill="#344054"></path></svg>
                      {t("Create New Ad")}
                    </Nav.Link>

                    <Nav.Link className="header-option-bottom" href="/my-ads-agency">
                      <svg className="symbol-header" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.99935 1.16699L8.80185 4.81866L12.8327 5.40783L9.91602 8.24866L10.6043 12.262L6.99935 10.3662L3.39435 12.262L4.08268 8.24866L1.16602 5.40783L5.19685 4.81866L6.99935 1.16699Z" stroke="#344054" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                      {t("My Ads")}
                    </Nav.Link>
                  </>
                  :
                  <>
                    <Nav.Link className="header-option-bottom" href="#saved-ads">
                      <svg className="symbol-header" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M4.08398 2.33366C3.92927 2.33366 3.7809 2.39512 3.67151 2.50451C3.56211 2.61391 3.50065 2.76228 3.50065 2.91699V11.1168L6.6616 8.85898C6.86442 8.71411 7.13688 8.71411 7.33971 8.85898L10.5007 11.1168V2.91699C10.5007 2.76228 10.4392 2.61391 10.3298 2.50451C10.2204 2.39512 10.072 2.33366 9.91732 2.33366H4.08398ZM2.84655 1.67956C3.17474 1.35137 3.61986 1.16699 4.08398 1.16699H9.91732C10.3814 1.16699 10.8266 1.35137 11.1548 1.67956C11.4829 2.00774 11.6673 2.45286 11.6673 2.91699V12.2503C11.6673 12.4688 11.5452 12.669 11.3509 12.769C11.1566 12.869 10.9227 12.852 10.7449 12.725L7.00065 10.0505L3.25637 12.725C3.07857 12.852 2.84469 12.869 2.6504 12.769C2.4561 12.669 2.33398 12.4688 2.33398 12.2503V2.91699C2.33398 2.45286 2.51836 2.00774 2.84655 1.67956Z" fill="#344054"></path></svg>
                      {t("Saved Ads")}
                    </Nav.Link>
                    <span>{t("Saved search")}</span>
                  </>
              }

              <Nav.Link className="header-option-bottom" href={"/" + (isLogin ? "edit-profile" : "authentication")}>{isLogin ? fullName : t("Login - SignIn")}</Nav.Link>

              <Nav.Link className="header-option-bottom" onClick={handleExit}>{t("Exit")}</Nav.Link>
            </Nav>
          </Col>
        </Container>
      </Navbar >

      <Navbar bg="light" expand="xxl" className="header-navbar">
        <Container>
          <Row className="top-header">
          </Row>
          <Col md={6}>
            <Nav className="me-auto header-texts">
              <Nav.Link className="header-option" href="#buy">{t("Buy")}</Nav.Link>
              <Nav.Link className="header-option" href="#Rent">{t("Rent And Mortgage")}</Nav.Link>
              <Nav.Link className="header-option" href="#pricing">{t("Your House Price")}</Nav.Link>
              <Nav.Link className="header-option" href="#propery">{t("Property Market")}</Nav.Link>
              <Nav.Link className="header-option" href="#Agency">{t("Real State Agency")}</Nav.Link>
              <Nav.Link className="header-option" href="#Mag">{t("Kilid Mag")}</Nav.Link>
            </Nav>
          </Col>

          <Col md={5}>
            <Navbar.Brand href="/">
              <Image className="mainLogo" src={logoUrl} />
            </Navbar.Brand>
          </Col>
          <Col md={2}>
            <Nav className="me-auto">
              <DealerAdButton />
            </Nav>
          </Col>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
