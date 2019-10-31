import React from "react";
import IndividualText from "../individualText/IndividualText";
import "./chatlist.css";

const ChatList = ({ listText }) => {
  return (
    <div className="chat-item">
      {listText.map((msgObj, index) => (
        <IndividualText msgObj={msgObj} key={index} />
      ))}
    </div>
  );
};

export default ChatList;
