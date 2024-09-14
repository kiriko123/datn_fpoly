import React from "react";
import './head.css';

const Head = () => {
    return (
        <section className="head">
            <div className="container d_flex">
                <div className="left row">
                    <i className="fa fa-phone"></i>
                    <label>+88012 3456 7894</label>
                    <i className="fa fa-envelope"></i>
                    <label>support@ui-lib.com</label>
                </div>
                <div className="right row RText">
                    <label>Theme FAQ's</label>
                    <label>Need Help?</label>
                    <span role="img" aria-label="flag">🏳️‍⚧️</span>
                    <label>EN</label>
                    <span role="img" aria-label="flag">🏳️‍⚧️</span>
                    <label>VI</label>
                </div>
            </div>
        </section>
    );
}

export default Head;
