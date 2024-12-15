import React from "react";
import classes from "./Box.module.scss";

interface BoxProps {
    children: React.ReactNode;
}   

const Box = ({
    children
}: BoxProps) => {
    return ( 
        <div className={classes.container}>
            {children}
        </div>
    )
};

export default Box;