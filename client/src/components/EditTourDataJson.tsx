import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/mdn-like.css';
import { Tour } from "../types/types";
import { api } from '../axios';
import { getTourUrl } from '../store/actions/tours'


interface Props {
    tour: null | Tour;
}

const EditTourDataJson = (props: Props) => {

    const [json, setJson] = useState({});


    useEffect(() => {
        if (props.tour) {
            api.get(`${getTourUrl(props.tour.url)}/tourData.json`)
                .then(res => setJson(res.data))
                .catch(err => console.log(err));
        }

    }, [props.tour]);

    return (
        <CodeMirror
            value={JSON.stringify(json, null, 8)}
            options={{
                theme: 'material',
                keyMap: 'sublime',
                mode: 'json',
                tabSize: 4,
            }}
        />
    );
};

export default EditTourDataJson;