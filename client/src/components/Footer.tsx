import React from 'react';
import { Toolbar } from "@abymosa/ipsg";

const Footer = () => {
    return (
        <div>
            <Toolbar lg >
                <p>Copyright © 2021 {process.env.REACT_APP_TITLE}</p>
            </Toolbar>
        </div>
    );
};

export default Footer;