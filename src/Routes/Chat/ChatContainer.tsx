import React, { useState } from "react";
import ChatPresenter from "./ChatPresenter";

export default ({history}) => {

    const [messages, setMessages] = useState([{text: "지금 이동중입니다. 잠시만 기다려주세요.", me: false}]);
    const [newMessage, setNewMessage] = useState("");

    const onSubmit = () => {
        setMessages([...messages, {text: newMessage, me: true}, {text: "지금 이동중입니다. 잠시만 기다려주세요.", me: false}]);
        setNewMessage("");
    }

    const onInputChange = e => {

        const {
            target: { value }
          } = e;

        setNewMessage(value);
    }

    return (
        <div>
          <ChatPresenter
                loading={false}
                messages={messages}
                newMessage={newMessage}
                onSubmit={onSubmit}
                onInputChange={onInputChange}
          />
        </div>
      );
}
