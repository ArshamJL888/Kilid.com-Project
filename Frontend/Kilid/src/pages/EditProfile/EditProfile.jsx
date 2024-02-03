import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchData, getFromLocalStorage } from '../../utils';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import EditValidation from './EditVaidation';
import PendingCover from '../../components/PendingCover/PendingCover';
import StatusAlert from '../../components/StatusAlert/StatusAlert';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { BsMailbox, BsShieldLock } from 'react-icons/bs';
import "./EditProfile.css"

export default function EditProfile() {

    const { t } = useTranslation();

    let navigate = useNavigate();

    let { register, handleSubmit, formState: { errors } } = useForm({ resolver: EditValidation() });

    const [showError, setShowError] = useState(false)

    const [errorText, setErrorText] = useState("")

    const [showSuccess, setShowSuccess] = useState(false)

    const [isPending, setIsPending] = useState(false)

    const [successText, setSuccessText] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("");

    const [name, setName] = useState("");

    const [fname, setFname] = useState("");

    const [email, setEmail] = useState("");


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

    useEffect(() => {
        let isLogin = getFromLocalStorage("isLogin") || false;
        let name = getFromLocalStorage("name") || "";
        let fname = getFromLocalStorage("fname") || "";
        let email = getFromLocalStorage("email") || "";
        let phoneNumber = getFromLocalStorage("phoneNumber") || "";
        if (!isLogin || name === "" || fname === "" || (phoneNumber === "" && email === "")) {
            GoToMainPage();
        }


        setFname(fname);
        setName(name);
        setEmail(email);
        setPhoneNumber(phoneNumber);

    })

    const GoToMainPage = () => {
        navigate('/', { replace: true })
    }


    let onSubmit = async (inputData) => {

        setIsPending(true)

        let updateInfo = {
            userId: getFromLocalStorage("userId"),
            name: inputData.name,
            fname: inputData.fname,
            email: inputData.email,
            phoneNumber: inputData.phone_number
        }

        try {
            let resultData = await fetchData("http://127.0.0.1:8080/api/user/update/", "PUT", updateInfo);
            if (resultData.userId !== undefined || resultData.userId == null) {
                setInLocalStorage("userId", resultData.userId),
                    setInLocalStorage("name", resultData.name),
                    setInLocalStorage("fname", resultData.fname),
                    setInLocalStorage("email", resultData.email),
                    setInLocalStorage("phoneNumber", inputData.phone_number),
                    setInLocalStorage("isLogin", true)
                successHandler(`تغییرات با موفقیت انجام شد.`),
                    navigate("/")
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

    const changeName = (event) => {
        console.log('Value changed:', event.target.value);
        setName(event.target.value);
    };


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
                        <h3>{t("Edit Profile")}</h3>

                        <Row>
                            <Col xm={12} md={6}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("First Name")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            type="text"
                                            value={name}
                                            onChange={async (event) => await setName(event.target.value)}
                                            placeholder={t("First Name")}
                                            aria-label={t("First Name")}
                                            {...register("name")}
                                            isInvalid={errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name && errors.name.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </InputGroup>
                            </Col>

                            <Col xm={12} md={6}>
                                <InputGroup className="mb-3 edit-field">
                                    {/* <Col xs={12} md={5}> */}
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Last Name")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.fname}
                                            type="text"
                                            value={fname}
                                            onChange={(event) => setFname(event.target.value)}
                                            placeholder={t("Last Name")}
                                            aria-label={t("Last Name")}
                                            {...register("fname")}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fname && errors.fname.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    {/* </Col> */}
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12} md={6}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Email")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.email}
                                            type="text"
                                            onChange={(event) => setEmail(event.target.value)}
                                            value={email}
                                            placeholder={t("example@example.com")}
                                            style={{ direction: "ltr" }}
                                            aria-label={t("example@example.com")}
                                            {...register("email")}
                                            disabled={true}
                                        />
                                    </InputGroup>
                                </InputGroup>
                            </Col>

                            <Col xs={12} md={6}>
                                <InputGroup className="mb-3 edit-field">
                                    <Form.Label column xs={6} xl={4}>
                                        {t("Phone Number")}
                                    </Form.Label>
                                    <InputGroup className="mb-3 edit-input">
                                        <Form.Control
                                            className='field-text-box'
                                            isInvalid={errors.phone_number}
                                            type="text"
                                            maxLength={11}
                                            onChange={(event) => setPhoneNumber(event.target.value)}
                                            value={phoneNumber}
                                            style={{ direction: "ltr" }}
                                            placeholder={t("Mobile Number in 09XXXXXXXXX format")}
                                            aria-label={t("Mobile Number in 09XXXXXXXXX format")}
                                            {...register("phone_number")}
                                            disabled={true}
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
