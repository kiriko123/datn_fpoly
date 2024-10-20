import React from "react";
import '../../i18n.js';
import {useTranslation} from "react-i18next";

const Head = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <section className="bg-[#0f3460] py-2 text-white text-sm">
            <div className="container-fluid mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <i className="fa fa-phone"></i>
                    <label>+84 8813 598</label>
                    <i className="fa fa-envelope"></i>
                    <label>tankhang101a@gmail.com</label>
                </div>
                <div className="flex items-center space-x-4">
                    <label>{t('faqs')}</label>
                    <label>{t('need_help')}</label>
                    <label onClick={() => changeLanguage('en')} className="cursor-pointer hover:text-[#11998e]">
                        <span role="img" aria-label="flag">🏳️‍⚧️</span>EN
                    </label>
                    <label onClick={() => changeLanguage('vi')} className="cursor-pointer hover:text-[#11998e]">
                        <span role="img" aria-label="flag">🏳️‍⚧️</span>VI
                    </label>
                </div>
            </div>
        </section>
    );
}

export default Head;
