import React, { useEffect, useState } from 'react'
import "./CreateAd.css"
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import CreateAdValodation from './CreateAdValidation';
import PendingCover from '../../components/PendingCover/PendingCover';
import StatusAlert from '../../components/StatusAlert/StatusAlert';
import { Button, Card, Col, Dropdown, InputGroup, Row } from "react-bootstrap";
import { fetchGETData, fetchData, setInLocalStorage, getFromLocalStorage, } from "../../utils.js"
import { v4 as uuidv4 } from 'uuid';

function CreateAd() {

    const { t } = useTranslation();

    const navigate = useNavigate();

    let { register, handleSubmit, formState: { errors } } = useForm({ resolver: CreateAdValodation() });

    const [showError, setShowError] = useState(false);

    const [errorText, setErrorText] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);

    const [isPending, setIsPending] = useState(false);

    const [successText, setSuccessText] = useState("");



    const [type, setType] = useState(1);

    const [parking, setparking] = useState(false)
    const [lobby, setlobby] = useState(false)
    const [elevator, setelevator] = useState(false)
    const [pool, setpool] = useState(false)
    const [sauna, setsauna] = useState(false)
    const [gym, setgym] = useState(false)
    const [balcony, setbalcony] = useState(false)
    const [jacuzzi, setjacuzzi] = useState(false)
    const [buildingGuard, setbuildingGuard] = useState(false);
    const [rooftopGarden, setrooftopGarden] = useState(false);
    const [airCondition, setairCondition] = useState(false);
    const [conferenceHall, setconferenceHall] = useState(false);
    const [centralAntenna, setcentralAntenna] = useState(false);
    const [remoteControlledDoor, setremoteControlledDoor] = useState(false);

    const [cooperative, setcooperative] = useState(false)
    const [barter, setbarter] = useState(false)
    const [convertible, setconvertible] = useState(false)
    const [presale, setpresale] = useState(false)
    const [buildingLocation, setbuildingLocation] = useState(false)
    const [loan, setloan] = useState(false)
    const [newlyBuilt, setnewlyBuilt] = useState(false)
    const [equity, setequity] = useState(false)
    const [shoppingCenter, setshoppingCenter] = useState(false)
    const [mall, setmall] = useState(false)

    const [photo, setPhoto] = useState("")

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

    const generateUniqueId = () => {
        const uuid = uuidv4();
        const numericId = uuid.replace(/\D/g, '').slice(0, 7);

        return numericId;
    };


    const onSubmit = async (inputData) => {
        var obj = {
            ...inputData,
            parking,
            lobby,
            elevator,
            pool,
            sauna,
            gym,
            balcony,
            jacuzzi,
            buildingGuard,
            rooftopGarden,
            airCondition,
            conferenceHall,
            centralAntenna,
            remoteControlledDoor,
            cooperative,
            barter,
            convertible,
            presale,
            buildingLocation,
            loan,
            newlyBuilt,
            equity,
            shoppingCenter,
            mall,
        }
        console.log(obj);

        let costObject = {};
        if (inputData.type === "1") {
            costObject = {
                "sellCost": inputData.sellCost
            }
        } else if (inputData.type == "2") {
            costObject = { "mortgageCost": inputData.mortgage }
        } else {
            costObject = {
                "preCost": inputData.preCost,
                "monthlyRent": inputData.rentCost
            }
        }

        let uniquePropertyId = generateUniqueId();
        var requestObject = {
            "property": {
                "propertyId": uniquePropertyId,
                "title": inputData.title,
                "city": inputData.city,
                "zone": inputData.zone,
                "area": parseInt(inputData.area, 10),
                "usage": inputData.usage,
                "numberOfRoom": inputData.numOfRooms,
                "age": parseInt(inputData.age, 10),
                "agencyID": getFromLocalStorage("agencyObject").id,
                "description": inputData.description,
                ...costObject
            },
            "facility": {
                "propertyId": null,
                "parking": parking ? "1" : "0",
                "lobby": lobby ? "1" : "0",
                "elevator": elevator ? "1" : "0",
                "pool": pool ? "1" : "0",
                "sauna": sauna ? "1" : "0",
                "gym": gym ? "1" : "0",
                "buildingGuard": buildingGuard ? "1" : "0",
                "balcony": balcony ? "1" : "0",
                "rooftopGarden": rooftopGarden ? "1" : "0",
                "airCondition": airCondition ? "1" : "0",
                "conferenceHall": conferenceHall ? "1" : "0",
                "jacuzzi": jacuzzi ? "1" : "0",
                "centralAntenna": centralAntenna ? "1" : "0",
                "remoteControlledDoor": remoteControlledDoor ? "1" : "0"
            },
            "condition": {
                "propertyId": null,
                "cooperative": cooperative ? "1" : null,
                "barter": barter ? "1" : null,
                "convertible": convertible ? "1" : null,
                "presale": presale ? "1" : null,
                "buildingLocation": buildingLocation ? "1" : null,
                "loan": loan ? "1" : null,
                "newlyBuilt": newlyBuilt ? "1" : null,
                "equity": equity ? "1" : null,
                "shoppingCenter": shoppingCenter ? "1" : null,
                "mall": mall ? "1" : null
            },
            "picture": [
                {
                    "pictureKey": {
                        "propertyID": null,
                        "pictureID": null
                    },
                    "picture": inputData.photo,
                    "primary": true
                }
            ]
        }

        try {
            let resultData = await fetchData("http://127.0.0.1:8080/api/property/add", "POST", requestObject);
            console.log(resultData);
            if (resultData !== null || resultData != undefined || resultData.property != undefined) {

                successHandler(`آگهی با موفقیت ثبت شد : کد آگهی: ${resultData.property.propertyId + " "}`),
                    navigate("/", {replace: true})
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

    const changeLogging = () => {
        console.log("parking: " + parking);
        console.log("lobby: " + lobby);
        console.log("elevator: " + elevator);
        console.log("pool: " + pool);
        console.log("sauna: " + sauna);
        console.log("gym: " + gym);
        console.log("balcony: " + balcony);
        console.log("jacuzzi: " + jacuzzi);
        console.log("buildingGuard: " + buildingGuard);
        console.log("rooftopGarden: " + rooftopGarden);
        console.log("airCondition: " + airCondition);
        console.log("conferenceHall: " + conferenceHall);
        console.log("centralAntenna: " + centralAntenna);
        console.log("remoteControlledDoor: " + remoteControlledDoor);
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


            <div className='new-add-conatainer'>
                <h4 className="new-ad-title">{t("Register New Ad")}</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Row>
                        <Col xs={7}>
                            <InputGroup className="mb-3 edit-field">
                                <Form.Label column xs={6} xl={4}>
                                    {t("Title")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        type="text"
                                        placeholder={t("Title")}
                                        aria-label={t("Title")}
                                        {...register("title")}
                                        isInvalid={errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title && errors.title.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </InputGroup>
                        </Col>

                        <Col xs={3}>
                            <InputGroup className="mb-3 edit-field">
                                <Form.Label column xs={6} xl={4}>
                                    {t("Age")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        type="text"
                                        placeholder={t("Age")}
                                        aria-label={t("Age")}
                                        {...register("age")}
                                        isInvalid={errors.age}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.age && errors.age.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </InputGroup>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <InputGroup className="mb-3 edit-field">
                                <Form.Label column xs={6} xl={4}>
                                    {t("City")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        type="text"
                                        placeholder={t("City")}
                                        aria-label={t("City")}
                                        {...register("city")}
                                        isInvalid={errors.city}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city && errors.city.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </InputGroup>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <InputGroup className="mb-3 edit-field">
                                {/* <Col xs={12} md={5}> */}
                                <Form.Label column xs={6} xl={4}>
                                    {t("Zone")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        isInvalid={errors.zone}
                                        type="text"
                                        placeholder={t("Zone")}
                                        aria-label={t("Zone")}
                                        {...register("zone")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.zone && errors.zone.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                {/* </Col> */}
                            </InputGroup>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <InputGroup className="mb-3 edit-field">
                                {/* <Col xs={12} md={5}> */}
                                <Form.Label column xs={6} xl={4}>
                                    {t("Area")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        isInvalid={errors.area}
                                        type="text"
                                        placeholder={t("Area")}
                                        aria-label={t("Area")}
                                        {...register("area")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.area && errors.area.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                {/* </Col> */}
                            </InputGroup>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={6} md={4}>
                            <Form.Label column xs={6} xl={4}>
                                {t("Usage")}
                            </Form.Label>
                            <InputGroup className="mb-3 edit-input">
                                <Form.Check // prettier-ignore
                                    type='radio'
                                    name="usage"
                                    className='field-radio'
                                    isInvalid={errors.usage}
                                    aria-label={t("Usage")}
                                    {...register("usage")}
                                    value={"مسکونی"}
                                    label={"مسکونی"}
                                    defaultChecked={true}
                                />
                                <Form.Check // prettier-ignore
                                    type='radio'
                                    name="usage"
                                    className='field-radio'
                                    isInvalid={errors.usage}
                                    aria-label={t("Usage")}
                                    {...register("usage")}
                                    label={"اداری"}
                                    value={"اداری"}
                                />
                                <Form.Check // prettier-ignore
                                    type='radio'
                                    name="usage"
                                    className='field-radio'
                                    isInvalid={errors.usage}
                                    aria-label={t("Usage")}
                                    {...register("usage")}
                                    label={"تجاری"}
                                    value={"تجاری"}
                                />
                                <Form.Check // prettier-ignore
                                    type='radio'
                                    name="usage"
                                    className='field-radio'
                                    isInvalid={errors.usage}
                                    aria-label={t("Usage")}
                                    {...register("usage")}
                                    label={"صنعتی"}
                                    value={"صنعتی"}
                                />
                            </InputGroup>
                        </Col>

                        <Col xs={6} md={4}>
                            <Form.Label column xs={6} xl={4}>
                                {t("Ad Type")}
                            </Form.Label>
                            <InputGroup className="mb-3 edit-input">
                                <Form.Check // prettier-ignore
                                    type='radio'
                                    name="type"
                                    className='field-radio'
                                    isInvalid={errors.type}
                                    {...register("type")}
                                    value={"1"}
                                    label={"فروش"}
                                    defaultChecked={true}
                                    onChange={(event) => setType(event.target.value)}
                                />
                                <Form.Check // prettier-ignore
                                    type='radio'
                                    name="type"
                                    className='field-radio'
                                    isInvalid={errors.type}
                                    {...register("type")}
                                    value={"2"}
                                    label={"رهن کامل"}
                                    onChange={(event) => setType(event.target.value)}
                                />
                                <Form.Check // prettier-ignore
                                    type='radio'
                                    name="type"
                                    className='field-radio'
                                    isInvalid={errors.type}
                                    {...register("type")}
                                    value={"3"}
                                    label={"رهن و اجاره"}
                                    onChange={(event) => setType(event.target.value)}
                                />

                            </InputGroup>
                        </Col>

                        <Col xs={4}>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Form.Label xs={6}>
                                        {t("Number Of Rooms")}
                                    </Form.Label>
                                    <Form.Select className='room-option-bar' aria-label={t("Number Of Rooms")}>
                                        <option className='room-num-opt' {...register("numOfRooms")} value="1">1</option>
                                        <option className='room-num-opt' {...register("numOfRooms")} value="2">2</option>
                                        <option className='room-num-opt' {...register("numOfRooms")} value="3">3</option>
                                        <option className='room-num-opt' {...register("numOfRooms")} value="4">4</option>
                                        <option className='room-num-opt' {...register("numOfRooms")} value="5">5</option>
                                        <option className='room-num-opt' {...register("numOfRooms")} value="6">6</option>
                                        <option className='room-num-opt' {...register("numOfRooms")} value="7">7</option>
                                        <option className='room-num-opt' {...register("numOfRooms")} value="8">8</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <InputGroup className="mb-3 edit-field">
                                {/* <Col xs={12} md={5}> */}
                                <Form.Label column xs={6} xl={4}>
                                    {t("Sell Cost")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        type="text"
                                        placeholder={t("Sell Cost")}
                                        aria-label={t("Sell Cost")}
                                        {...register("sellCost")}
                                        disabled={type != "1"}
                                    />
                                </InputGroup>
                                {/* </Col> */}
                            </InputGroup>
                        </Col>
                    </ Row>
                    <hr />
                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <InputGroup className="mb-3 edit-field">
                                <Form.Label column xs={6} xl={4}>
                                    {t("Mortgage Cost")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        type="text"
                                        placeholder={t("Mortgage Cost")}
                                        aria-label={t("Mortgaeg Cost")}
                                        {...register("mortgage")}
                                        disabled={(type != "2")}
                                    />
                                </InputGroup>
                            </InputGroup>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <InputGroup className="mb-3 edit-field">
                                {/* <Col xs={12} md={5}> */}
                                <Form.Label column xs={6} xl={4}>
                                    {t("Pre Cost")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        type="text"
                                        placeholder={t("Pre Cost")}
                                        aria-label={t("Pre Cost")}
                                        {...register("preCost")}
                                        disabled={(type != "3")}
                                    />
                                </InputGroup>
                                {/* </Col> */}
                            </InputGroup>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <InputGroup className="mb-3 edit-field">
                                {/* <Col xs={12} md={5}> */}
                                <Form.Label column xs={6} xl={4}>
                                    {t("Rent Cost")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        type="text"
                                        placeholder={t("Rent Cost")}
                                        aria-label={t("Rent Cost")}
                                        {...register("rentCost")}
                                        disabled={(type != "3")}
                                    />
                                </InputGroup>
                                {/* </Col> */}
                            </InputGroup>
                        </Col>
                    </Row>
                    <hr />
                    <h4 className="facility-header-create">{t("Facilities")}</h4>
                    <Row className='facilities-creation'>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="parking"
                                name="parking"
                                {...register("parking")}
                                label={t("parking")}
                                value={parking}
                                onChange={() => {
                                    setparking(!parking)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="lobby"
                                name="lobby"
                                {...register("lobby")}
                                label={t("lobby")}
                                value={lobby}
                                onChange={() => {
                                    setlobby(!lobby)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="elevator"
                                name="elevator"
                                {...register("elevator")}
                                label={t("elevator")}
                                value={elevator}
                                onChange={() => {
                                    setelevator(!elevator)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="pool"
                                name="pool"
                                {...register("pool")}
                                label={t("pool")}
                                value={pool}
                                onChange={() => {
                                    setpool(!pool)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="sauna"
                                name="sauna"
                                {...register("sauna")}
                                label={t("sauna")}
                                value={sauna}
                                onChange={() => {
                                    setsauna(!sauna)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="gym"
                                name="gym"
                                {...register("gym")}
                                label={t("gym")}
                                value={gym}
                                onChange={() => {
                                    setgym(!gym)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="buildingGuard"
                                name="buildingGuard"
                                {...register("buildingGuard")}
                                label={t("buildingGuard")}
                                value={buildingGuard}
                                onChange={() => {
                                    setbuildingGuard(!buildingGuard)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="balcony"
                                name="balcony"
                                {...register("balcony")}
                                label={t("balcony")}
                                value={balcony}
                                onChange={() => {
                                    setbalcony(!balcony)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="rooftopGarden"
                                name="rooftopGarden"
                                {...register("rooftopGarden")}
                                label={t("rooftopGarden")}
                                value={rooftopGarden}
                                onChange={() => {
                                    setrooftopGarden(!rooftopGarden)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="airCondition"
                                name="airCondition"
                                {...register("airCondition")}
                                label={t("airCondition")}
                                value={airCondition}
                                onChange={() => {
                                    setairCondition(!airCondition)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="conferenceHall"
                                name="conferenceHall"
                                {...register("conferenceHall")}
                                label={t("conferenceHall")}
                                value={conferenceHall}
                                onChange={() => {
                                    setconferenceHall(!conferenceHall)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="jacuzzi"
                                name="jacuzzi"
                                {...register("jacuzzi")}
                                label={t("jacuzzi")}
                                value={jacuzzi}
                                onChange={() => {
                                    setjacuzzi(!jacuzzi)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="centralAntenna"
                                name="centralAntenna"
                                {...register("centralAntenna")}
                                label={t("centralAntenna")}
                                value={centralAntenna}
                                onChange={() => {
                                    setcentralAntenna(!centralAntenna)
                                    changeLogging();
                                }}
                            />
                        </Col>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="remoteControlledDoor"
                                name="remoteControlledDoor"
                                {...register("remoteControlledDoor")}
                                label={t("remoteControlledDoor")}
                                value={remoteControlledDoor}
                                onChange={() => {
                                    setremoteControlledDoor(!remoteControlledDoor)
                                    changeLogging();
                                }}
                            />
                        </Col>
                    </Row>
                    <hr />

                    <h4 className='facility-header-create'>{t("Conditions")}</h4>
                    <Row>

                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="cooperative"
                                name="cooperative"
                                {...register("cooperative")}
                                label={t("cooperative")}
                                value={cooperative}
                                onChange={() => {
                                    setcooperative(!cooperative)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="barter"
                                name="barter"
                                {...register("barter")}
                                label={t("barter")}
                                value={barter}
                                onChange={() => {
                                    setbarter(!barter)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="convertible"
                                name="convertible"
                                {...register("convertible")}
                                label={t("convertible")}
                                value={convertible}
                                onChange={() => {
                                    setconvertible(!convertible)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="presale"
                                name="presale"
                                {...register("presale")}
                                label={t("presale")}
                                value={presale}
                                onChange={() => {
                                    setpresale(!presale)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="buildingLocation"
                                name="buildingLocation"
                                {...register("buildingLocation")}
                                label={t("buildingLocation")}
                                value={buildingLocation}
                                onChange={() => {
                                    setbuildingLocation(!buildingLocation)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="loan"
                                name="loan"
                                {...register("loan")}
                                label={t("loan")}
                                value={loan}
                                onChange={() => {
                                    setloan(!loan)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="newlyBuilt"
                                name="newlyBuilt"
                                {...register("newlyBuilt")}
                                label={t("newlyBuilt")}
                                value={newlyBuilt}
                                onChange={() => {
                                    setnewlyBuilt(!newlyBuilt)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="equity"
                                name="equity"
                                {...register("equity")}
                                label={t("equity")}
                                value={equity}
                                onChange={() => {
                                    setequity(!equity)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="shoppingCenter"
                                name="shoppingCenter"
                                {...register("shoppingCenter")}
                                label={t("shoppingCenter")}
                                value={shoppingCenter}
                                onChange={() => {
                                    setshoppingCenter(!shoppingCenter)
                                }}
                            />
                        </Col>
                        <Col xs={6} sm={3}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="mall"
                                name="mall"
                                {...register("mall")}
                                label={t("mall")}
                                value={mall}
                                onChange={() => {
                                    setmall(!mall)
                                }}
                            />
                        </Col>
                    </Row>
                    <hr />

                    <Row>
                        <Col xs={12} sm={6} md={4}>
                            <InputGroup className="mb-3 edit-field">
                                {/* <Col xs={12} md={5}> */}
                                <Form.Label className='facility-header-create' column xs={6} xl={4}>
                                    {t("Photo")}
                                </Form.Label>
                                <InputGroup className="mb-3 edit-input">
                                    <Form.Control
                                        className='field-text-box'
                                        type="text"
                                        placeholder={t("Photo")}
                                        aria-label={t("Photo")}
                                        {...register("photo")}
                                    />
                                </InputGroup>
                                {/* </Col> */}
                            </InputGroup>
                        </Col>
                    </ Row>
                    <hr />

                    <Row className='details-row'>
                        <Col xs={12} sm={8}>
                            <InputGroup className="mb-3 edit-field">
                                {/* <Col xs={12} md={5}> */}
                                <Form.Label className='facility-header-create' column xs={6} xl={4}>
                                    {t("Details")}
                                </Form.Label>
                                <InputGroup className="mb-3 details-creation">
                                    <Form.Control
                                        className='field-text-box'
                                        type="textarea"
                                        as="textarea" rows={3}
                                        placeholder={t("Details")}
                                        aria-label={t("Details")}
                                        {...register("description")}
                                    />
                                </InputGroup>
                                {/* </Col> */}
                            </InputGroup>
                        </Col>
                    </Row>

                    <hr />

                    <InputGroup className="justify-content-end ad-creation-submit">
                        <Button className='ad-creation-submit-btn' type="submit">
                            {t("Accept")}
                        </Button>
                    </InputGroup>
                </Form>

            </div>
        </>
    )
}

export default CreateAd;