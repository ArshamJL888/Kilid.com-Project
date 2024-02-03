import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./SignIn.css";
import { Card, Col, InputGroup, Row } from "react-bootstrap";
import { BsMailbox, BsShieldLock } from 'react-icons/bs';
import { BiRefresh } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import Captcha from "../../assets/capcha.png";
import { useForm } from "react-hook-form";
import SignInValidation from "./SignInValidation.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PendingCover from '../../components/PendingCover/PendingCover'
import StatusAlert from '../../components/StatusAlert/StatusAlert.jsx';
import { fetchGETData, fetchData, setInLocalStorage, } from "../../utils.js"
import { IoKeyOutline } from "react-icons/io5";

function SignIn() {

    const { t } = useTranslation();

    const navigate = useNavigate();

    let { register, handleSubmit, formState: { errors } } = useForm({ resolver: SignInValidation() });

    const [showError, setShowError] = useState(false)

    const [errorText, setErrorText] = useState("")

    const [showSuccess, setShowSuccess] = useState(false)

    const [isPending, setIsPending] = useState(false)

    const [successText, setSuccessText] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("");

    const [isAgency, setIsAgency] = useState(false);



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

    const GoToMainPage = () => {
        navigate('/', { replace: true })
    }


    let onSubmit = async (inputData) => {

        console.log(inputData.password);
        setIsPending(true)
        console.log(isAgency);

        if (isAgency) {
            console.log(`http://127.0.0.1:8080/api/agency/show/${inputData.phone_number}/${inputData.password}`);
            try {
                let resultData = await fetchGETData("http://127.0.0.1:8080/api/agency/show/", inputData.phone_number + "/" + inputData.password);
                console.log(resultData);
                if (resultData !== null || resultData != undefined || resultData.id !== undefined || resultData.id == null) {

                        setInLocalStorage("isAgency", true);
                    setInLocalStorage("isLogin", true);
                    setInLocalStorage("agencyObject", resultData);
                    successHandler(`${resultData.aname + " "} به سایت کلید خوش آمدبد`),
                        navigate("/")
                } else {
                    errorHandler("در ارتباط با سرور مشکلی پیش آمده است.")
                }
            } catch (err) {
                console.log(err);
                setErrorText("در ارتباط با سرور مشکلی پیش آمده است.")
                setShowError(true)
                setTimeout(() => {
                    setShowError(false)
                }, 5000)
            }
        }
        else {
            try {
                let resultData = await fetchGETData("http://127.0.0.1:8080/api/user/show/", inputData.phone_number);
                if (resultData.userId !== undefined || resultData.userId == null) {
                    setInLocalStorage("isAgency", false),
                        setInLocalStorage("userId", resultData.userId),
                        setInLocalStorage("name", resultData.name),
                        setInLocalStorage("fname", resultData.fname),
                        setInLocalStorage("email", resultData.email),
                        setInLocalStorage("phoneNumber", inputData.phone_number),
                        setInLocalStorage("isLogin", true)
                    successHandler(`${resultData.name + " " + resultData.fname} به سایت کلید خوش آمدبد`),
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
            <div className="login-page mt-5">
                <div className="authentication-box">
                    <div className="auth-box-container">
                        <img className='auth-box-img' src="https://cdn.kilid.com/favicons/new/kilid-sign.png" />
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <InputGroup className="mb-3 phone-section">
                                {/* <Col xs={12} md={9}> */}
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <BsShieldLock />
                                    </InputGroup.Text>
                                    <Form.Control
                                        className='phone-text-box'
                                        isInvalid={errors.phone_number}
                                        type="text"
                                        maxLength={11}
                                        placeholder={t("Mobile Number in 09XXXXXXXXX format")}
                                        aria-label={t("Mobile Number in 09XXXXXXXXX format")}
                                        {...register("phone_number")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone_number && errors.phone_number.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                {/* </Col> */}
                            </InputGroup>

                            {isAgency &&
                                <>
                                    <InputGroup className="mb-3 password-section">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">
                                                <IoKeyOutline />
                                            </InputGroup.Text>
                                            <Form.Control
                                                className='password-text-box'
                                                type="password"
                                                maxLength={30}
                                                placeholder={t("Password")}
                                                aria-label={t("Password")}
                                                {...register("password")}
                                            />
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password && errors.password.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </>
                            }

                            <div className="captcha-box">
                                <InputGroup className="mb-4 mt-0 captcha-section">
                                    <Col xs={6} md={5} lg={6}>
                                        <InputGroup className="mb-6">
                                            <Form.Control
                                                className='captcha-text'
                                                type="text"
                                                maxLength={5}
                                                isInvalid={errors.captcha_code}
                                                placeholder={t("Captcha Code")}
                                                aria-label={t("Captcha Code")}
                                                {...register("captcha_code")}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.captcha_code && errors.captcha_code.message}
                                            </Form.Control.Feedback>

                                        </InputGroup>
                                    </Col>
                                    <Col xs={2} sm={5} className="pe-1">
                                        <img style={{
                                            width: 145,
                                            height: 36,
                                            borderRadius: "0.5rem",
                                            backgroundColor: "#FFFFFF",
                                            marginRight: "8px"
                                        }} src={Captcha} alt="captcha" />
                                    </Col>
                                </InputGroup>

                            </div>



                            <div className="agency-checkbox">
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    value={isAgency}
                                    label={t("Login as an agency")}
                                    onChange={() => {
                                        setIsPending(true);
                                        setIsAgency(!isAgency)
                                        setTimeout(() => {
                                            setIsPending(false);
                                            console.log(isAgency);
                                        }, 1000)
                                        console.log(isAgency);
                                    }}
                                />
                            </div>



                            <InputGroup className="justify-content-end">
                                <Button className='login-submit-btn' type="submit">
                                    {t("Sign In")}
                                </Button>
                            </InputGroup>
                        </Form>

                        <button className="return-main-page-btn" onClick={() => GoToMainPage()}>
                            <span>{t("Return")}</span>
                            <div className="return-symbol-btn">
                                <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 -rotate-90 !w-3 !h-3"><path d="M8 15V1M8 1L1 8M8 1L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;