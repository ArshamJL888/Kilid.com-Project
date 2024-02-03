import { Card, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AccountButton from "../AccountButton/AccountButton";
import { setInLocalStorage } from "../../utils";
import { useNavigate } from "react-router-dom";

function AccountCard({ account = [] }) {
  let navigate = useNavigate()
  const { t } = useTranslation();
  const payInstructionHandler = (mainAccount) => {
    setInLocalStorage("mainAccount", mainAccount.accountNumber)
    navigate('/new-pay-request', { replace: true });
  };
  const observePageHandler = (mainAccount) => {
    setInLocalStorage("mainAccount", mainAccount.accountNumber)
    navigate('/requests', { replace: true });
  };

  const balanceFormatter = (balance) => {
    balance = balance.split("");
    let lastElem = balance[balance.length - 1];
    if (lastElem === "+" || lastElem === "-") {
      balance.pop();
      if (lastElem === "-") {
        balance *= -1;
      }
    }
    balance = Number(balance.join(""));
    balance = Intl.NumberFormat('en-US').format(balance)
    return balance;
  };
  return (
    <>
      <Col className="m-2" xs={12} xl={5} xxl={4}>
        <Card className="center-block custom-card">
          <Card.Body>
              <div className="mb-3 account-information">
                <span className="subject-title">
                  {t("Firstname And Lastname") + ": "}
                </span>
                <span className="subject-result">{account.accountTitle}</span>
              </div>
              <div className="mb-3 account-information">
                <span className="subject-title">
                  {t("Account Number") + ": "}
                </span>
                <span className="subject-result">{account.accountNumber}</span>
              </div>
              <div className="mb-3 account-information">
                <span className="subject-title">
                  {t("Account Balance") + ": "}
                </span>
                <span className="subject-result">
                  {balanceFormatter(account.accountBalance) + " " + t('Rial')} 
                </span>
              </div>
            <div className="card-buttons">
              <AccountButton
                btnText={t("Pay Instruction")}
                inputInfo={account}
                clickAction={payInstructionHandler}
              />
              <AccountButton
                btnText={t("Observe")}
                inputInfo={account}
                clickAction={observePageHandler}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default AccountCard;
