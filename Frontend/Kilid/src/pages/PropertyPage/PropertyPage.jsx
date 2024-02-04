import React, { useEffect, useState } from 'react'
import "./PropertyPage.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import PendingCover from '../../components/PendingCover/PendingCover';
import StatusAlert from '../../components/StatusAlert/StatusAlert';
import { fetchGETData, getStringArrayBasedOnBreaks, numberSeparator } from '../../utils';
export default function PropertyPage() {

    const defaultObj = {
        "property": {
            "propertyId": 3,
            "title": "سعادت آباد 150 متر رهن",
            "city": "تهران",
            "zone": "سعادت آباد",
            "area": 150,
            "usage": null,
            "numberOfRoom": 3,
            "age": 6,
            "agencyID": 302,
            "description": "رهن سعادت آباد",
            "mortgageCost": 2000000000
        },
        "facility": {
            "propertyId": 3,
            "parking": "1",
            "lobby": "1",
            "elevator": "1",
            "pool": null,
            "sauna": "0",
            "gym": "0",
            "buildingGuard": "1",
            "balcony": "0",
            "rooftopGarden": "0",
            "airCondition": "1",
            "conferenceHall": "0",
            "jacuzzi": "0",
            "centralAntenna": "1",
            "remoteControlledDoor": "0"
        },
        "condition": {
            "propertyId": 3,
            "cooperative": null,
            "barter": null,
            "convertible": null,
            "presale": null,
            "buildingLocation": null,
            "loan": null,
            "newlyBuilt": null,
            "equity": null,
            "shoppingCenter": null,
            "mall": null
        },
        "picture": [
            {
                "pictureKey": {
                    "propertyID": 3,
                    "pictureID": 3
                },
                "picture": "https://cdn.kilid.com/photos/small/listing_026b6331-e709-4888-8dbc-a91824b5fd48_vrt.jpg",
                "primary": true
            }
        ]
    }

    const params = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [propertyId, setPropertyId] = useState(params.propertyId);
    const [propertyInfo, setPropertyInfo] = useState(defaultObj);
    const [agency, setAgency] = useState({});
    const [isPending, setIsPending] = useState(true);
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState("");


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
        let resultData;
        let agencyId;
        async function getproperty() {
            try {
                resultData = await fetchGETData(`http://127.0.0.1:8080/api/property/show/${propertyId}`);
                if (resultData !== null) {
                    setPropertyInfo(resultData)
                    agencyId = resultData.property.agencyID;
                    getAgency();
                    console.log(resultData)
                } else {
                    throw resultData
                }
            } catch (errData) {
                console.log(errData)
                errorHandler("در ارتباط با سرور مشکلی پیش آمده است.")
                // navigate("/", { replace: true });
            }

        }

        async function getAgency() {
            try {
                let agencyData = await fetchGETData(`http://127.0.0.1:8080/api/agency/show/${agencyId}`);
                if (agencyData !== null) {
                    setAgency(agencyData)
                    console.log(agencyData)
                } else {
                    throw agencyData
                }
            } catch (errData) {
                console.log(errData)
                errorHandler("در ارتباط با سرور مشکلی پیش آمده است.")
                // navigate("/", { replace: true });
            }
        }

        getproperty();
        setTimeout(() => {
            setIsPending(false);
            console.log(propertyInfo);
        }, 2000);

    }, [isPending])






    return (
        <>
            <PendingCover pending={isPending} />
            {showError && <StatusAlert errorBody={errorText} colorType="danger" />}
            <div className="property-details-card">
                <div className="property-image-detail">
                    <img className='property-details-card-image' src={propertyInfo.picture[0] ? propertyInfo.picture[0].picture : "https://cdn.kilid.com/photos/large/listing_0d86b3a0-a418-42f1-a204-7ddedae338ad_hrz.jpg"} />
                </div>

                <div className="property-detail-content">

                    <div className="proprty-details-title">
                        {propertyInfo.property.title}
                    </div>
                    <div className="property-details-pricing">
                        {
                            propertyInfo.property.sellCost !== undefined ? (
                                <div className="property-detail-row">
                                    <span className="property-details-name">{t("Sell Price") + ": "}</span>
                                    <span className="property-details-price">{numberSeparator(propertyInfo.property.sellCost) + " "} {t("Toman")}</span>
                                </div>) :
                                propertyInfo.property.mortgageCost !== undefined ? (
                                    <div className="property-detail-row">
                                        <span className="property-details-name">{t("Full Mortgage Cost") + ": "}</span>
                                        <span className="property-details-price">{numberSeparator(propertyInfo.property.mortgageCost) + " "} {t("Toman")}</span>
                                    </div>
                                ) :
                                    propertyInfo.property.preCost !== undefined ? (
                                        <>
                                            <div className="property-detail-row">
                                                <span className="property-details-name">{t("PreCost") + ": "}</span>
                                                <span className="property-details-price">{numberSeparator(propertyInfo.property.preCost) + " "} {t("Toman")}</span>
                                            </div>
                                            <div className="property-detail-row">
                                                <span className="property-details-name">{t("Montly Rental Cost") + ": "}</span>
                                                <span className="property-details-price">{numberSeparator(propertyInfo.property.monthlyRent) + " "} {t("Toman")}</span>
                                            </div>
                                        </>
                                    ) : ""
                        }
                    </div>

                    <div className='property-details-location'>
                        <svg className='property-details-location-icon w-6 h-6 mr-2 text-gray-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="currentColor" ><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                        {propertyInfo.property.city + "، " + propertyInfo.property.zone}
                    </div>


                    <div className="property-details-info">
                        <div className="property-details-info-item">{propertyInfo.property.area + " " + t("Meter")}</div>
                        <div className="property-details-info-item">{propertyInfo.facility.parking + " " + t("Parking")}</div>
                        <div className="property-details-info-item">{propertyInfo.property.age + " " + t("Years")}</div>
                        <div className="property-details-info-item">{propertyInfo.property.numberOfRoom + " " + t("Room")}</div>
                    </div>
                    <hr />

                    <div className="property-details-facilities">
                        <h4 className='property-details-facilities-header'>{t("Facilities")}</h4>

                        <div className="property-facilities-details-content">
                            {
                                Object.keys(propertyInfo.facility).map((key) => {
                                    if (propertyInfo.facility[key] === "1" && key != "propertyId") {
                                        return (

                                            <div className='property-facilities-details-item'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-4 text-gray-800 ltr:mr-4 check-item-icon"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                <span className='facility-item-details'>{t(key)}</span>
                                            </div>

                                        )
                                    }
                                }
                                )
                            }
                        </div>
                    </div>

                    <hr />

                    <div className='property-details-main-details'>
                        <h4 className='property-details-facilities-header'>{t("Details")}</h4>
                        <div className="property-details-description">
                            {
                                getStringArrayBasedOnBreaks(propertyInfo.property.description).map(item => (<p>{item}</p>))
                            }
                        </div>
                    </div>
                    <hr />

                    <div className="property-conditions">
                        <h4 className='property-details-facilities-header'>{t("Conditions")}</h4>
                        <div className="property-conditions-content">
                            {
                                Object.keys(propertyInfo.condition).map((key) => {
                                    if (propertyInfo.condition[key] === "1" && key != "propertyId") {
                                        return (
                                            <div className="property-details-info-item">{t(key)}</div>
                                        )
                                    }
                                }
                                )
                            }

                        </div>
                    </div>
                    <hr />
                    <div className='agency-information'>
                    <h4 className='property-details-facilities-header'>{t("Agency Information")}</h4>
                        <div className="agency-information-content">
                            <div className="agency-title-name">{agency.aname}</div>
                            <div className="agency-field-row">
                                <p className='agency-field-key'>{t("Agency Code") + ": "}</p>
                                <p className='agency-field-value'>{agency.id}</p>
                            </div>

                            <div className="agency-field-row">
                                <p className='agency-field-key'>{t("Agency City") + ": "}</p>
                                <p className='agency-field-value'>{agency.acity}</p>
                            </div>

                            <div className="agency-field-row">
                                <p className='agency-field-key'>{t("Agency Phone") + ": "}</p>
                                <p className='agency-field-value'>{agency.aphone}</p>
                            </div>

                            <div className="agency-field-row">
                                <p className='agency-field-key'>{t("Manager Name") + ": "}</p>
                                <p className='agency-field-value'>{agency.mname}</p>
                            </div>

                            <div className="agency-field-row">
                                <p className='agency-field-key'>{t("Manager Family") + ": "}</p>
                                <p className='agency-field-value'>{agency.mfamily}</p>
                            </div>

                            <div className="agency-field-row">
                                <p className='agency-field-key'>{t("Manager Phone") + ": "}</p>
                                <p className='agency-field-value'>{agency.mphone}</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
