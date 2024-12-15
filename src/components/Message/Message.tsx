import React from "react";
import classes from "./Message.module.scss";

interface MessageProps {
    message: string;
}

const Message = ({ message }: MessageProps) => {
    return <div data-testid="message" className={classes.message}>{message}</div>;
};

export default Message;