import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
   verificationKey: string;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
   loading: boolean;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
   verificationKey,
   onChange,
   onSubmit,
   loading
}) => (
  <Container>
    <Helmet>
      <title>인증번호 입력</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"휴대폰 로그인"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder={"인증번호를 입력해주세요"}
        onChange={onChange}
        name={"verificationKey"}
      />
      <Button
        disabled={loading}
        value={loading ? "인증번호 확인중" : "제출"}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
