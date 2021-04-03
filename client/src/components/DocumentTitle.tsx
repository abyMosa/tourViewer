import { FunctionComponent, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { documentTitleFromPath } from '../utils/url';

const DocumentTitle: FunctionComponent<any> = (props) => {
    let location = useLocation();
    useEffect(() => {

        // document.title = (process.env.REACT_APP_TITLE && location.pathname)
        //     ? documentTitleFromPath(process.env.REACT_APP_TITLE!, location.pathname)
        //     : "";

        document.title = documentTitleFromPath(process.env.REACT_APP_TITLE || "App", location.pathname);
    }, [location]);

    return (props.children);
};

export default DocumentTitle;