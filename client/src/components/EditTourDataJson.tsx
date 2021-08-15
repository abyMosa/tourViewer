import React, { useEffect, useState } from 'react';
// import CodeMirror from '@uiw/react-codemirror';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/keymap/sublime';

import 'codemirror/theme/material.css';
import { Tour } from "../types/types";
import { api } from '../axios';
import { getTourUrl } from '../store/actions/tours'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import { Btn, Loader } from '@abymosa/ipsg';



// add a button to send changes to server 
// server -- create end point for a post req and update tour file

// hard reset the app on older version
// rebase codemirror branch on master
// merge codemirror to master

interface Props {
    tour: null | Tour;
    onSuccess: () => void;
    onError: () => void;
}

const EditTourDataJson = (props: Props) => {

    const [json, setJson] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.tour) {
            api.get(`${getTourUrl(props.tour.url)}/tourData.json`)
                .then(res => setJson(JSON.stringify(res.data, null, 8)))
                .catch(err => console.log(err));
        }

    }, [props.tour]);

    const onChange = (instance: CodeMirror.Editor, change: CodeMirror.EditorChange, value: string) => {
        setJson(value);
    }

    const saveJson = () => {
        setIsLoading(true);
        const jsonObj = JSON.parse(json);

        api.patch('/updateTourData', { tour: props.tour, tourData: jsonObj })
            .then(res => {
                setIsLoading(false);
                props.onSuccess();
            })
            .catch(err => {
                setIsLoading(false);
                props.onError();
            });
    }

    return (
        <>
            <Loader show={isLoading} />
            <CodeMirror
                value={json}
                options={{
                    theme: 'material',
                    keyMap: 'sublime',
                    mode: 'javascript',
                    tabSize: 4,
                }}
                onBeforeChange={onChange}
            />
            <div className="df f-jc-end">
                <Btn error text="save" onClick={saveJson} />
            </div>
        </>
    );
};

export default EditTourDataJson;