import axios from 'axios';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react'
import { ApiUrl } from '../../constants/constants';
import AuthForm from '../shared/Form/AuthForm';
import Spinner from '../shared/spinner/Spinner';
import ErrorPasswordChange from './ErrorPasswordChange';

type Props = {
  token: string
}

function ResetPassword(props: Props) {

  const [Error, setError] = React.useState<{ Error: boolean, Message: string }>({ Error: false, Message: "" });
  const [Success, setSuccess] = React.useState<{ Success: boolean, Message: string }>({ Success: false, Message: "" });
  const [Loading, setLoading] = React.useState(false);
  let PasswordRef = React.useRef<HTMLInputElement>(null);
  let reWritePasswordRef = React.useRef<HTMLInputElement>(null);
  let passwordData = { ref: PasswordRef, name: "Password", placeholder: "Type your Password", required: true };
  let reWritePasswordData = { ref: reWritePasswordRef, label: "Rewrite Password", name: "Password", placeholder: "Type your Password again", required: true };
  let router = useRouter();

  async function Submit() {
    let Password = PasswordRef.current?.value;
    let reWritePassword = reWritePasswordRef.current?.value;
    if (Password !== reWritePassword) {
      console.log("Password doesn't match");
    }
    else {
      setLoading(true)
      await axios
        .post(`${ApiUrl}/User/ChangeForgottenPassword/${props.token}`, {
          password: Password
        })
        .then((res: { data: { Error: boolean, Message: string } | undefined }) => {
          setLoading(false)
          if (res.data) {
            if (!res.data.Error) {
              setSuccess({ Success: true, Message: res.data.Message })

            }
            else {
              setError({ Error: true, Message: res.data.Message });
            }
          }
        });

    }
  }
  if (Loading) {
    return (
      <Spinner></Spinner>
    )
  }

  return (
    <AuthForm Error={Error} Success={{ ...Success, Cta: "Sign in Now", CtaLink: '/Auth' }} Submit={Submit} FormTitle='Reset Password' ButtonText='Reset Password' Inputs={[passwordData, reWritePasswordData]}></AuthForm>

  )

}




export default ResetPassword