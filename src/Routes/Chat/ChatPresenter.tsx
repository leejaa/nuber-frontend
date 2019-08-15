import React from "react";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Message from "../../Components/Message";
import styled from "../../typed-components";

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  overflow: scroll;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  loading: boolean;
  messages: any;
  newMessage: string;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatPresenter: React.SFC<IProps> = ({
  loading
  , onSubmit
  , onInputChange
  , messages
  , newMessage
}) => (
  <Container>
    <Header title={"대화하기"} />
    {!loading &&
        <React.Fragment>
          <Chat>
            {
                messages.map(message => (
                    <Message
                        key={Math.floor(Math.random() * 1000000) + 1}
                        text={message.text}
                        mine={message.me}
                    />
                ))
            }


          </Chat>
          <InputCont>
            <Form submitFn={onSubmit}>
              <Input
                value={newMessage}
                placeholder={"메시지를 입력해주세요"}
                onChange={onInputChange}
                name={"message"}
              />
            </Form>
          </InputCont>
        </React.Fragment>
    }
  </Container>
);

export default ChatPresenter;
