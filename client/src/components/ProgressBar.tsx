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
    let percentageMax100 = percentage > 100 ? 100 : percentage;

    return (
        !show ? <span></span> :
            <div className="ab-progress-bar">
                <div className="ab-progress-bar__inner" style={{ width: `${percentageMax100}%` }}>
                    <div>{percentage}%</div>
                </div>
            </div>
    );
};

export default ProgressBar;