import React from 'react'

import "./MainFooter.css"
import { useTranslation } from 'react-i18next'
import { Col, Nav, Navbar, Image } from 'react-bootstrap';
export default function MainFooter() {
    const { t } = useTranslation();
    const logoUrl = "https://cdn.kilid.com/logos/new-brand/kilid-svg-new.svg";

    const persianFormat = (a) => new Number(a).toLocaleString('fa-ir');
    return (
        <>
            <div className='main-page-footer'>
                <div className="main-footer-lists">
                    <div className="popular-cities popular-list">
                        <p className="popular-title">{t("Popular Cities")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Tehran")}</p>
                        <p className="popular-subtitles">{t("Mortgage") + t("And") + t("Rent") + " " + t("Apartment") + " " + t("In") + " " + t("Tehran")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Kish")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Pardis")}</p>
                    </div>
                    <div className="popular-cities popular-list">
                        <p className="popular-title">{t("Popular Regions")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Niavaran")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Saadat Abad")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Shahrak Gharb")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Farmaniyeh")}</p>
                    </div>

                    <div className="popular-cities popular-list">
                        <p className="popular-title">{t("Popular Cities")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Tehran")}</p>
                        <p className="popular-subtitles">{t("Mortgage") + t("And") + t("Rent") + " " + t("Apartment") + " " + t("In") + " " + t("Tehran")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Kish")}</p>
                        <p className="popular-subtitles">{t("Sale") + " " + t("Apartment") + " " + t("In") + " " + t("Pardis")}</p>
                    </div>
                </div>

                <div className='main-footer-menu-logo'>
                    <Col md={10}>
                        <Nav className="me-auto footer-menu-texts">
                            <Nav.Link className="footer-menu-option" href="#Pricing">{t("Your House Price")}</Nav.Link>
                            <Nav.Link className="footer-menu-option" href="#Mag">{t("Kilid Mag")}</Nav.Link>
                            <Nav.Link className="footer-menu-option" href="#RSSystem">{t("Real States System")}</Nav.Link>
                            <Nav.Link className="footer-menu-option" href="#Contact">{t("Contact Us")}</Nav.Link>
                            <Nav.Link className="footer-menu-option" href="#Terms">{t("Terms and Conditions")}</Nav.Link>
                            <Nav.Link className="footer-menu-option" href="#Private">{t("Private")}</Nav.Link>
                        </Nav>
                    </Col>

                    <Col md={1} className='me-5'>
                        <Navbar.Brand className='footer-logo-section'>
                            <Image className="mainLogo" src={logoUrl} />
                            <sub className='version-footer'>{persianFormat(4) + "." + persianFormat(0) + "." + persianFormat(28)}</sub>
                        </Navbar.Brand>
                    </Col>
                </div>

                <div className="footer-belongs-to">{t("All terms belong to KNTU")}</div>
            </div>
        </>
    )
}
