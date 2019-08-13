import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import VerifyPresenter from "./VerifyPhonePresenter";
import { LOG_USER_IN } from "src/SharedQueries";
import { VerifyPhoneData, VerifyPhoneVar } from "src/types/api";

export const VERIFY_PHONE = gql`
  mutation verifyPhone($key: String!, $phoneNumber: String!) {
    CompletePhoneVerification(key: $key, phoneNumber: $phoneNumber) {
      ok
      error
      token
    }
  }
`;


export default ({history}) => {

    if(!history.location.state){
        history.push({
            pathname: "/",
        });
    }

    console.log(`history : ${JSON.stringify(history)}`);

    const [verificationKey, setVerificationKey] = useState("");
    const [phoneNumber] = useState(history.location.state.phoneNumber);
    const [verifyPhoneMutation] = useMutation<VerifyPhoneData, VerifyPhoneVar>(VERIFY_PHONE);
    const [logUserIn] = useMutation(LOG_USER_IN);

    const onChange = event => {
        const {
            target: { value }
          } = event;

          setVerificationKey(value);

    }

    const onSubmit = async event => {

        const {data : {CompletePhoneVerification}} = await verifyPhoneMutation({
            variables : {
                phoneNumber : phoneNumber
                , key : verificationKey
            }
        });

        console.log(`CompletePhoneVerification : ${JSON.stringify(CompletePhoneVerification)}`);

        if (CompletePhoneVerification.ok) {
            if (CompletePhoneVerification.token) {
              logUserIn({
                variables: {
                  token: CompletePhoneVerification.token
                }
              });
            }
            toast.success("인증에 성공하였습니다.");
            history.push("/");
          } else {
            toast.error(CompletePhoneVerification.error);
          }
    }

    return (
        <div>
            <VerifyPresenter
                onSubmit={onSubmit}
                onChange={onChange}
                verificationKey={verificationKey}
                loading={false}
            />
        </div>
    );
};