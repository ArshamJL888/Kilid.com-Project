import { useEffect, useMemo, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { fetchData, fetchGETData, getFromLocalStorage } from "../../utils";
import PendingCover from "../../components/PendingCover/PendingCover";
import StatusAlert from "../../components/StatusAlert/StatusAlert";
import RequestCard from "../../components/RequestCard/RequestCard.jsx";
import ImageCard from "../../components/ImageCard/ImageCard";
import MainFooter from "../../components/MainFooter/MainFooter";
function MainPage() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const errorHandler = (errorBody) => {
    setIsPending(false);
    // when operation is NOT successful ==> set error and show alert with danger theme
    setErrorText(errorBody);
    // setShowError(true);
    // setTimeout(() => {
    //   setShowError(false);
    // }, 5000);
  };

  let subjects = [
    { id: 1, title: t("Waiting For Sign") },
    { id: 2, title: t("Ready To Pay") },
    { id: 3, title: t("Completed") },
  ];

  let AllRequests = [
    {
      "property": {
        "propertyId": 1,
        "title": "ولنجک 130 متر نوساز اجاره",
        "city": "تهران",
        "zone": "ولنجک",
        "area": 130,
        "usage": null,
        "numberOfRoom": 2,
        "age": 1,
        "agencyID": 302,
        "description": "اجاره ولنجک",
        "preCost": 2000000000,
        "monthlyRent": 100000000,
        "img": "https://cdn.kilid.com/photos/small/listing_79a5c4fa-4700-49a3-a66b-9b164c2974c7_vrt.jpg"
      },
      "facility": {
        "propertyId": 1,
        "parking": "1",
        "lobby": "1",
        "elevator": "1",
        "pool": "1",
        "sauna": "1",
        "gym": "1",
        "buildingGuard": "1",
        "balcony": "1",
        "rooftopGarden": "1",
        "airCondition": "1",
        "conferenceHall": "1",
        "jacuzzi": "1",
        "centralAntenna": "1",
        "remoteControlledDoor": "0"
      },
      "condition": {
        "propertyId": 1,
        "cooperative": null,
        "barter": null,
        "convertible": null,
        "presale": null,
        "buildingLocation": null,
        "loan": null,
        "newlyBuilt": "1",
        "equity": null,
        "shoppingCenter": null,
        "mall": null
      },
      "picture": []
    },
    {
      "property": {
        "propertyId": 2,
        "title": "نیاوران 250 متر 3 ساله",
        "city": "تهران",
        "zone": "نیاوران",
        "area": 250,
        "usage": null,
        "numberOfRoom": 4,
        "age": 3,
        "agencyID": 302,
        "description": "فروش نیاوران 250 متر سه ساله سند تک برگ",
        "sellCost": 50000000000,
        "img": "https://cdn.kilid.com/photos/small/listing_fbb055de-938c-4b7b-967b-6b3033f64ef2_vrt.jpg",
      },
      "facility": {
        "propertyId": 2,
        "parking": "2",
        "lobby": "1",
        "elevator": "1",
        "pool": "1",
        "sauna": "1",
        "gym": "1",
        "buildingGuard": "1",
        "balcony": "1",
        "rooftopGarden": "1",
        "airCondition": "1",
        "conferenceHall": "1",
        "jacuzzi": "1",
        "centralAntenna": "1",
        "remoteControlledDoor": "1"
      },
      "condition": {
        "propertyId": 2,
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
      "picture": []
    },
    {
      "property": {
        "propertyId": 3,
        "title": "سعادت آباد 150 متر رهن",
        "city": "تهران",
        "zone": "سعادت آباد",
        "area": 150,
        "usage": null,
        "numberOfRoom": 3,
        "age": 6,
        "agencyID": 303,
        "description": "رهن سعادت آباد",
        "mortgageCost": 2000000000,
        "img": "https://cdn.kilid.com/photos/small/listing_026b6331-e709-4888-8dbc-a91824b5fd48_vrt.jpg",
      },
      "facility": {
        "propertyId": 3,
        "parking": "1",
        "lobby": "1",
        "elevator": "1",
        "pool": "0",
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
        "newlyBuilt": "0",
        "equity": null,
        "shoppingCenter": null,
        "mall": null
      },
      "picture": []
    },
    {
      "property": {
        "propertyId": 4,
        "title": "فروش میرداماد 90 متر 10 ساله",
        "city": "تهران",
        "zone": "میرداماد",
        "area": 90,
        "usage": null,
        "numberOfRoom": 1,
        "age": 10,
        "agencyID": 302,
        "description": "میرداماد اکازیون زیر قیمت منطقه",
        "sellCost": 10000000000,
        "img": "https://cdn.kilid.com/photos/small/listing_026b6331-e709-4888-8dbc-a91824b5fd48_vrt.jpg",
      },
      "facility": {
        "propertyId": 4,
        "parking": "1",
        "lobby": "0",
        "elevator": "1",
        "pool": "0",
        "sauna": "0",
        "gym": "1",
        "buildingGuard": "1",
        "balcony": "0",
        "rooftopGarden": "0",
        "airCondition": "1",
        "conferenceHall": "0",
        "jacuzzi": "1",
        "centralAntenna": "1",
        "remoteControlledDoor": "0"
      },
      "condition": {
        "propertyId": 4,
        "cooperative": null,
        "barter": null,
        "convertible": null,
        "presale": null,
        "buildingLocation": null,
        "loan": null,
        "newlyBuilt": "0",
        "equity": null,
        "shoppingCenter": null,
        "mall": null
      },
      "picture": []
    },
  ]

  useEffect(() => {
    // function to showing all accounts in this page
    let resultData;
    async function getproperties() {
      try {
        resultData = await fetchGETData("http://127.0.0.1:8080/api/property/show/all");
        if (resultData !== null) {
          console.log("here");
          if (resultData.length === undefined) {
            resultData = AllRequests
          }
          setProperties(resultData)
        } else {
          throw resultData
        }
      } catch (errData) {
        errorHandler("در ارتباط با سرور مشکلی پیش آمده است.")
        navigate("/", { replace: true });
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
      {showError && <StatusAlert errorBody={errorText} colorType="danger" />}
      <ImageCard />
      <Card className="main-page-content" style={{ backgroundColor: "transparent" }}>

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
              {useMemo(
                () => (
                  <Row className="justify-content-evenly">
                    {properties.map((request) => (
                      <RequestCard key={request.id} requestInfo={request} />
                    ))}
                  </Row>
                ),
                [isPending]
              )}
            </Card.Body>
          </Card>
        </Card.Body>

      </Card>

      <MainFooter />
    </>
  );
}

export default MainPage;
