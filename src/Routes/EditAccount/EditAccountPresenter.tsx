import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import styled from "../../typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;


interface IProps {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
    onSubmit: any;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    uploading: boolean;
  }

const EditAccountPresenter : React.SFC<IProps> = ({
  loading
  , firstName
  , lastName
  , email
  , profilePhoto
  , onSubmit
  , onInputChange
  , uploading
}) => {

    return (
        <Container>
            <Helmet>
            <title>회원정보 수정</title>
            </Helmet>
            <Header title={"회원정보 수정"} backTo={"/"} />
            <ExtendedForm submitFn={onSubmit}>
            <PhotoInput
                uploading={false}
                fileUrl={""}
                onChange={()=>""}
            />
            <ExtendedInput
                onChange={onInputChange}
                type={"text"}
                value={firstName || ""}
                placeholder={"성"}
                name={"firstName"}
            />
            <ExtendedInput
                onChange={onInputChange}
                type={"text"}
                value={lastName || ""}
                placeholder={"이름"}
                name={"lastName"}
            />
            <ExtendedInput
                onChange={onInputChange}
                type={"email"}
                value={email || ""}
                placeholder={"이메일주소"}
                name={"email"}
            />
            <Button onClick={null} value={loading || uploading ? "Loading" : "Update"} />
            </ExtendedForm>
        </Container>
    );
};

export default EditAccountPresenter;