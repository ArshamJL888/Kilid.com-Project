import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import './DealerAdButton.css'
import { useTranslation } from "react-i18next";

export default function DealerAdButton() {
    const { t } = useTranslation();
  return (
    <>
        <button className="real-state-register-ad">
            {t("Register Ad for Real States")}
        </button>
    </>
  )
}
