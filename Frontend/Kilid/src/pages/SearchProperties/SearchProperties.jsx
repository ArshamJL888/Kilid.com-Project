import React, { useEffect, useMemo, useState } from 'react'
import "./SearchProperties.css"
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import PendingCover from '../../components/PendingCover/PendingCover';
import StatusAlert from '../../components/StatusAlert/StatusAlert';
import { Button, Card, Col, Dropdown, InputGroup, Row } from "react-bootstrap";
import { fetchGETData, fetchData, setInLocalStorage, getFromLocalStorage, } from "../../utils.js"
import RequestCard from '../../components/RequestCard/RequestCard.jsx';

export default function SearchProperties() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [showError, setShowError] = useState(false);

    const [errorText, setErrorText] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);

    const [isPending, setIsPending] = useState(false);

    const [successText, setSuccessText] = useState("");

    const [allAds, setAllAds] = useState([]);

    const params = useParams();


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
        let searchParam = params.searchParam;
        let resultData;
        async function getproperties() {
            try {
                resultData = await fetchGETData("http://127.0.0.1:8080/api/property/search/", searchParam);
                if (resultData !== null) {
                    console.log(resultData);
                    if (resultData.length === undefined) {
                        resultData = AllRequests
                    }
                    setAllAds(resultData)
                } else {
                    throw resultData
                }
            } catch (errData) {
                errorHandler("در ارتباط با سرور مشکلی پیش آمده است.")
                // navigate("/", { replace: true });
            }

        }
        getproperties();
        setTimeout(() => {
            setIsPending(false);
        }, 1000);

    }, [isPending])

    return (
        <>
            <PendingCover pending={isPending} />
            {showError && <>
                <StatusAlert errorBody={errorText} colorType="danger" />
            </>}
            {showSuccess && <>
                <StatusAlert errorBody={successText} colorType="primary" />
            </>}


            <div className='search-properties-conatainer'>
                <h4 className="agency-ads-title">{t("Search Results")}</h4>
                <Card.Body>
                    <Card
                        style={{
                            backgroundColor: "var(--main-theme)",
                            border: "none",
                            marginTop: "1.5rem",
                            padding: "0",
                        }}
                    >
                        <Card.Body className="main-card">
                            <Row className="justify-content-evenly">
                                {allAds.map((request) => (
                                    <RequestCard key={request.id} requestInfo={request} />
                                ))}
                                {
                                    allAds.length === 0 && <p className='search-not-found'>{t("No Ad Found")}</p>
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                </Card.Body>

            </div>

        </>
    )
}
