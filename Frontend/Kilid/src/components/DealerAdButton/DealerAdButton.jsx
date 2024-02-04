import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import './DealerAdButton.css'
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function DealerAdButton() {
    const { t } = useTranslation();
  return (
    <>
        <NavLink  to={"/add-new-agency"} className="real-state-register-ad">
            {t("Register Ad for Real States")}
        </NavLink>
    </>
  )
}
