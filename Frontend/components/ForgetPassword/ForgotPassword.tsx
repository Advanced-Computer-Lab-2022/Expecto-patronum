import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import AuthForm from '../shared/Form/AuthForm';
import Spinner from '../shared/spinner/Spinner';
import EmailSent from './EmailSent';
import ErrorPasswordChange from './ErrorPasswordChange';

type Props = {}

const ForgotPassword = (props: Props) => {

  const [Success, setSuccess] = React.useState<{ Success: boolean, Message: string }>({ Success: false, Message: "" });
  let emailRef = React.useRef<any>();

  const [Loading, setLoading] = React.useState(false);
  let emailData = { ref: emailRef, name: "Email", placeholder: "Type your Email", required: true };

  let FormData: [{ ref: any, name: string, placeholder: string, required: boolean }] = [emailData];
  let router = useRouter()
  async function Submit(e: any) {
    setLoading(true);
    e.preventDefault();
    await axios
      .post("http://localhost:5000/User/forgetPassword", {
        email: emailRef.current.value,
      })
      .then(() => {
        setSuccess({ Success: true, Message: "Email sent" });
        setLoading(false);
      });

  }

  if (Loading) {
    return (
      <Spinner></Spinner>

    )
  }



  return (
    <AuthForm Success={Success} Submit={Submit} ButtonText={"Reset your password"} FormTitle={"Forgot Password"} Inputs={FormData} ></AuthForm>

  )
}

export default ForgotPassword