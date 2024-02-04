import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchData, getFromLocalStorage } from '../../utils';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import AgencyValidation from './AgencyValidation';
import PendingCover from '../../components/PendingCover/PendingCover';
import StatusAlert from '../../components/StatusAlert/StatusAlert';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BsMailbox, BsShieldLock } from 'react-icons/bs';
import "./RegisterAgency.css"
import { v4 as uuidv4 } from 'uuid';

export default function RegisterAgency() {

    const { t } = useTranslation();

    let navigate = useNavigate();

    let { register, handleSubmit, formState: { errors } } = useForm({ resolver: AgencyValidation() });

    const [showError, setShowError] = useState(false)

    const [errorText, setErrorText] = useState("")

    const [showSuccess, setShowSuccess] = useState(false)

    const [isPending, setIsPending] = useState(false)

    const [successText, setSuccessText] = useState("")


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

    const logout = () => {
        localStorage.clear();
        GoToMainPage();
    }


    const GoToMainPage = () => {
        navigate('/', { replace: true })
    }

    const generateUniqueId = () => {
        const uuid = uuidv4();
        const numericId = uuid.replace(/\D/g, '').slice(0, 6);

        return numericId;
    };


    let onSubmit = async (inputData) => {

        setIsPending(true)

        let requestInfo = {
            "id": generateUniqueId(),
            "empCount": parseInt(inputData.empCount, 10),
            "password": inputData.password,
            "mphone": inputData.mphone,
            "aphone": inputData.aphone ?? null,
            "aname": inputData.aname,
            "mfamily": inputData.mfamily,
            "acity": inputData.acity,
            "mname": inputData.mname
        }

        try {
            let resultData = await fetchData("http://127.0.0.1:8080/api/agency/add", "POST", requestInfo);
            if (resultData != null) {
                setTimeout(() => {
                    successHandler(`آژانس با موفقیت ثبت شد.`)
                }, 5000)
                GoToMainPage();
            } else {
                errorHandler("در ارتباط با سرور مشکلی پیش آمده است.")
            }
        } catch (err) {
            setErrorText("در ارتباط با سرور مشکلی پیش آمده است.")
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 5000)
        }
        setIsPending(false);
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
            <div className="edit-page mt-5">

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="edit-text-boxes">
                        <h3>{t("Register Agency")}</h3>

                        <Row>
                            <Col xm={12} md={6}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Agency Name*")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            type="text"
                                            placeholder={t("Agency Name (Persian)*")}
                                            aria-label={t("Agency Name (Persian)*")}
                                            {...register("aname")}
                                            isInvalid={errors.aname}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.aname && errors.aname.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </InputGroup>
                            </Col>

                            <Col xm={12} md={6}>
                                <InputGroup className="mb-3 edit-field">
                                    {/* <Col xs={12} md={5}> */}
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Agency Phone")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.aphone}
                                            type="text"
                                            maxLength={11}
                                            placeholder={t("Agency Phone")}
                                            aria-label={t("Agency Phone")}
                                            {...register("aphone")}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.aphone && errors.aphone.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    {/* </Col> */}
                                </InputGroup>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col sm={12} md={6}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("City Activation*")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.acity}
                                            type="text"
                                            placeholder={t("City Activation*")}
                                            aria-label={t("City Activation*")}
                                            {...register("acity")}
                                        />
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.acity && errors.acity.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>

                            <Col xs={12} md={6}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Employee Count")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.empcount}
                                            type="number"
                                            placeholder={t("Employee Count")}
                                            aria-label={t("Employee Count")}
                                            {...register("empCount")}
                                        />
                                    </InputGroup>
                                </InputGroup>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <h4 className='manager-info'>{t("Manager Information*")}</h4>
                            <Col xs={6} md={4}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Manager Name*")}
                                    </Form.Label>
                                    <InputGroup className="mb-1 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.mname}
                                            type="text"
                                            placeholder={t("Manager Name*")}
                                            aria-label={t("Manager Name*")}
                                            {...register("mname")}
                                        />
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.manme && errors.mname.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>

                            <Col xs={6} md={4}>
                                <InputGroup className="mb-1 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Manager Family*")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.mfamily}
                                            type="text"
                                            placeholder={t("Manager Family*")}
                                            aria-label={t("Manager Family*")}
                                            {...register("mfamily")}
                                        />
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.mfamily && errors.mfamily.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>

                            <Col xs={6} md={4}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Manager Phone*")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.mphone}
                                            type="phone"
                                            placeholder={t("Manager Phone*")}
                                            aria-label={t("Manager Phone*")}
                                            {...register("mphone")}
                                        />
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.mphone && errors.mphone.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <h4 className="set-password-section">{t("Set Password*")}</h4>
                            <Col sm={6} md={4}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Password*")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.password}
                                            type="password"
                                            placeholder={t("Password*")}
                                            aria-label={t("Password*")}
                                            {...register("password")}
                                        />
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password && errors.password.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={4}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Repeat Password*")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.repeatPassword}
                                            type="password"
                                            placeholder={t("Repeat Password*")}
                                            aria-label={t("Repeat Password*")}
                                            {...register("repeatPassword")}
                                        />
                                    </InputGroup>
                                </InputGroup>
                            </Col>
                        </Row>



                        <InputGroup className="justify-content-end edit-submit">
                            <Button className='edit-submit-btn' type="submit">
                                {t("Accept")}
                            </Button>
                        </InputGroup>
                    </div>
                </Form >


            </div >
        </>
    )
}
