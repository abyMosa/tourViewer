import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Row, Col } from "@abymosa/ipsg";
// import Footer from "../Components/Footer";
// import MobileMenu from '../Components/MobileMenu';

const MainLayout: React.FunctionComponent = (props) => {
    return (
        <div className="mainLayout" style={{ minHeight: '100vh' }}>
            <Header />
            {/* <MobileMenu /> */}
            <div className="mainLayout__content">
                <Row>
                    <Col md12 > {props.children} </Col>
                </Row>
            </div>

            <Footer />
        </div>
    )
};

export default MainLayout;