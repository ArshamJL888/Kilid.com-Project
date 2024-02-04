import { Card, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { numberSeparator } from "../../utils";
import AccountButton from "../AccountButton/AccountButton";
import { useState } from "react";
// import DeleteModal from "../DeleteModal/DeleteModal";
import "./RequestCard.css"
function RequestCard({ requestInfo = {} }) {
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteRequestHandler = () => {
    console.log("Delete Request");
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(status => !status)
  }

  console.log(requestInfo);
  return (
    <>
      {/* <DeleteModal show={showDeleteModal} onHide={setShowDeleteModal} deleteRequest={deleteRequestHandler} /> */}
      <Col className="my-4" xs={12} md={6} lg={4}>
        <Card className="center-block custom-card">
          <Card.Body>
            <div className="mb-5 d-flex flex-row justify-content-center">
              <img className="request-img me-4" src={requestInfo.picture[0] ? requestInfo.picture[0].picture : "https://cdn.kilid.com/photos/large/listing_0d86b3a0-a418-42f1-a204-7ddedae338ad_hrz.jpg"} />
            </div>
            <div className="request-title">
              {requestInfo.property.title}
              {/* {numberSeparator(requestInfo.amount) + " " + t("Rial")} */}
            </div>
            <div className="request-pricing">
              {
                requestInfo.property.sellCost !== undefined ? (
                  <div className="field-row">
                    <span className="field-name">{t("Sell Price") + ": "}</span>
                    <span className="field-price">{numberSeparator(requestInfo.property.sellCost) + " "} {t("Toman")}</span>
                  </div>) :
                  requestInfo.property.mortgageCost !== undefined ? (
                    <div className="field-row">
                      <span className="field-name">{t("Full Mortgage Cost") + ": "}</span>
                      <span className="field-price">{numberSeparator(requestInfo.property.mortgageCost) + " "} {t("Toman")}</span>
                    </div>
                  ) :
                    requestInfo.property.preCost !== undefined ? (
                      <>
                        <div className="field-row">
                          <span className="field-name">{t("PreCost") + ": "}</span>
                          <span className="field-price">{numberSeparator(requestInfo.property.preCost) + " "} {t("Toman")}</span>
                        </div>
                        <div className="field-row">
                          <span className="field-name">{t("Montly Rental Cost") + ": "}</span>
                          <span className="field-price">{numberSeparator(requestInfo.property.monthlyRent) + " "} {t("Toman")}</span>
                        </div>
                      </>
                    ) : ""

              }
            </div>

            <div className="property-location">
              <svg className="locaiton-icon" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 25 25" aria-hidden="true" class="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="location-text ms-4">{requestInfo.property.city} - {requestInfo.property.zone}</span>
            </div>

            <div className="property-info">
              <div className="info-item">{requestInfo.property.area + " " + t("Meter")}</div>
              <div className="info-item">{requestInfo.facility.parking + " " + t("Parking")}</div>
              <div className="info-item">{requestInfo.property.age + " " + t("Years")}</div>
              <div className="info-item">{requestInfo.property.numberOfRoom + " " + t("Room")}</div>

            </div>

            <div className="card-buttons">

              <AccountButton
                btnText={t("See")}
                inputInfo={requestInfo}
              // clickAction={observePageHandler}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default RequestCard;
