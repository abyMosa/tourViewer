import React from 'react';


interface Props {
    show: boolean;
    position: number;
    total: number;
}

const ProgressBar = (props: Props) => {
    let { show, position, total } = props;
    let percentageFloat = position / total * 100;
    let percentage = Math.ceil(percentageFloat);

    return (
        !show ? <span></span> :
            <div className="ab-progress-bar">
                <div className="ab-progress-bar__inner" style={{ width: `${percentage}%` }}>
                    <div>{percentage}%</div>
                </div>
            </div>
    );
};

export default ProgressBar;