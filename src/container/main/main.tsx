import React from "react";
import Message from "../../components/Message/Message";
import Box from "../../components/Box/Box";
import classes from "./main.module.scss";

const Main = () => {
    return (
        <div className={classes.container}>
            <Box>
                <Message message="Hello World" />
            </Box>
        </div>
    )
};

export default Main;