import React, {useState} from "react";
import { gql } from "apollo-boost";
import { toast } from "react-toastify";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { useMutation } from "react-apollo-hooks";


interface StartPhoneVerificationData {
    ok: boolean;
    error: string;
  }
  
interface StartPhoneVerificationVar {
    phoneNumber: string;
  }

export const PHONE_SIGN_IN = gql`
  mutation startPhoneVerification($phoneNumber: String!) {
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;




export default ({history}) => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+82");
    const [loading, setLoading] = useState(false);

    const [phoneSignInMutation] = useMutation<StartPhoneVerificationData, StartPhoneVerificationVar>(PHONE_SIGN_IN);

    console.log(`countryCode : ${countryCode}`);

    const onInputChange = event => {
        const {
            target: { name, value }
          } = event;

        console.log(event.which);

        switch (name) {
            case 'countryCode':

                setCountryCode(value);
                
                break;

            case 'phoneNumber':

                setPhoneNumber(value);
            
                break;
    
            default:
                break;
        }
    }

    const onSubmit = async event => {
        event.preventDefault();
        try {
            setLoading(true);
            const {data : {StartPhoneVerification}} = await phoneSignInMutation({
                variables : {
                    phoneNumber : `${countryCode}${phoneNumber}`
                }
            });

            if(StartPhoneVerification.ok){
                toast.success("입력하신 휴대폰번호로 인증번호가 발송되었습니다.");

                setTimeout(() => {
                    history.push({
                      pathname: "/verify-phone",
                      state: {
                        phoneNumber : `${countryCode}${phoneNumber}`
                      }
                    });
                  }, 2000);
            }else{
                toast.error(StartPhoneVerification.error);
            }
        } catch (error) {
            toast.error(error);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <PhoneLoginPresenter
                countryCode={countryCode}
                phoneNumber={phoneNumber}
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                loading={loading}
            />
        </div>
    );
}