import errorImage from "../../../public/images/404-3.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './Error404Page.css'
function Error404Page() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const GoToMainPage = () => {
    navigate('/', { replace: true });
  }
  return (
    <div className="error-page">
      <img src={errorImage} alt="404 Error" className="error-img" />
      <p className="Error-number">404</p>
      <p className="Error-message">{t('Page Not Found')}</p>
      <p className="Error-message">{t('Try Again')}</p>
      <button className="return-main-page-btn-404" onClick={() => GoToMainPage()}>
        <span>{t("Return")}</span>
        <div className="return-symbol-btn-404">
          <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 -rotate-90 !w-3 !h-3"><path d="M8 15V1M8 1L1 8M8 1L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </button>
    </div>
  );
}

export default Error404Page;
