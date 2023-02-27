import './Box.css';
import React from "react";

interface Props {
    children?: React.ReactNode
    style?: React.HTMLAttributes<unknown>,
    shadow?: boolean
}

const Box = ({children, style, shadow}: Props): JSX.Element => {
    const boxShadowClass = shadow && 'box--shadow';

    return (
        <div style={style} className={`box ${boxShadowClass}`}>
            {children}
        </div>
    );
};

export default Box;