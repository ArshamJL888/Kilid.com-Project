import React, { useState } from 'react'
import "./ImageCard.css"
import { useTranslation } from 'react-i18next';
import { Card, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchValidation from './SearchValidation';
import PendingCover from '../PendingCover/PendingCover';
import StatusAlert from '../StatusAlert/StatusAlert';
import { useForm } from 'react-hook-form';

export default function ImageCard() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    let { register, handleSubmit, formState: { errors } } = useForm({ resolver: SearchValidation() });

    const [showError, setShowError] = useState(false)

    const [errorText, setErrorText] = useState("")

    const [showSuccess, setShowSuccess] = useState(false)

    const [isPending, setIsPending] = useState(false)

    const [successText, setSuccessText] = useState("")

    const [param, setParam] = useState("");

    const successHandler = (successBody) => {
        setIsPending(false)
        // when operation is successful ==> set success message and show alert with success theme
        setSuccessText(successBody)
        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false)
            // navigate('/validation', { replace: true });
        }, 3000)
    }

    const errorHandler = (errorBody) => {
        setIsPending(false)
        // when operation is NOT successful ==> set error and show alert with danger theme
        setErrorText(errorBody)
        setShowError(true)
        setTimeout(() => {
            setShowError(false)
        }, 5000)
    }

    const onSubmit = async (inputData) => {
        console.log(inputData);
        navigate(`/search-properties/${inputData.searchParam}`, {replace: true});
    }



    return (
        <>
            <PendingCover pending={isPending} />
            {showError && <>
                <StatusAlert errorBody={errorText} colorType="danger" />
            </>}
            {showSuccess && <>
                <StatusAlert errorBody={successText} colorType="primary" />
            </>}

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
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="mb-3 search-box-input">
                                            <InputGroup className="mb-3 edit-input">
                                                <Form.Control
                                                    className='mt-4 form-control'
                                                    type="text"
                                                    placeholder={t("Example: Niavaran, Tehran")}
                                                    aria-label={t("Example: Niavaran, Tehran")}
                                                    {...register("searchParam")}
                                                    isInvalid={errors.searchParam}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.searchParam && errors.searchParam.message}
                                                </Form.Control.Feedback>
                                            </InputGroup>

                                        </Form.Group>
                                        <Button type='submit' className='main-image-search-btn'>
                                            {t("search")}
                                            <svg className='search-btn-symbol' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </Button>
                                    </Form>


                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>


            </div >
        </>
    )
}
