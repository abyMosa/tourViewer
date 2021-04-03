import React from 'react';

const Container = (Parent: React.FunctionComponent, Child: React.FunctionComponent) => {
    return () => (
        <Parent>
            <Child />
        </Parent>
    );
};

export default Container;