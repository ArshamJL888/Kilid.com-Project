import React from 'react'
import "./ImageCard.css"
import { useTranslation } from 'react-i18next';
import { Card, Form, Row, Col } from 'react-bootstrap';


export default function ImageCard() {
    const { t } = useTranslation();
    return (
        <>
            <div className='main-page-imagr-card'>
                <div className='main-image-center-content'>
                    <div className="main-image-text">
                        <h4 className='main-image-header-text'>{t("Property, a key decision")}</h4>
                        <p className="main-image-sub-header-text">{t("Find your favorite house with kilid")}</p>
                    </div>
                    <div >
                        <Card className="main-page-search-box">
                            <Card.Body>
                                <Card.Title className='search-box-title-text'>{t("Enter city, region")}</Card.Title>
                                <Card.Text>
                                    <Form>
                                        <Form.Group className="mb-3 search-box-input">
                                            {/* <Form.Control type="email" placeholder={t("Example: Niavaran, Tehran")} /> */}
                                            <input type="text" className="mt-4 form-control" placeholder={t("Example: Niavaran, Tehran")} />
                                        </Form.Group>
                                    </Form>

                                    <button className='main-image-search-btn'>
                                        {t("search")}
                                        <svg className='search-btn-symbol' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    </button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>


            </div >
        </>
    )
}
