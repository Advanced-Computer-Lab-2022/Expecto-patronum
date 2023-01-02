import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import AuthForm from '../../components/shared/Form/AuthForm';
import FormFeedBack from '../../components/shared/Form/FormFeedBack';
import Spinner from '../../components/shared/spinner/Spinner';

type Props = {}

const ChangePassword = (props: Props) => {
  const [Loading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState({ Error: false, Message: "" });
  const [Success, setSuccess] = React.useState({ Success: false, Message: "" });
  let router = useRouter();

  let oldpasswordRef = React.useRef<any>();
  let passwordRef = React.useRef<any>();


  let oldpasswordData = { ref: oldpasswordRef, name: "Password", label: "your password", placeholder: "Type your Password", required: true };
  let passwordData = { ref: passwordRef, name: "Password", label: "new password", placeholder: "Type your new Password", required: true };
  let reTypepasswordData = { ref: passwordRef, name: "Password", label: "Re-Type new password", placeholder: "Re-Type your new Password", required: true };


  async function Submit(e: any) {
    setLoading(true);
    e.preventDefault();
    try {
      let res = await axios
        .post("http://localhost:5000/User/ChangePassword", {
          password: passwordRef.current.value,
          oldpasswordData: oldpasswordRef.current.value
        })
      router.push("/Auth");

    } catch (error) {
      //@ts-ignore
      setError({ Error: true, Message: error.response.data || "Somthin went wrong" })
      console.log(error)
    }
  }
  if (Loading) {
    return (
      <Spinner></Spinner>

    )
  }

  return (
    //@ts-ignore
    <AuthForm Error={Error} Success={{ ...Success, Cta: "Sign in", CtaLink: "/Login" }} Submit={Submit} FormTitle='Change Password' Inputs={[oldpasswordData, passwordData, reTypepasswordData]} ButtonText={"Change Password"}></AuthForm>

  )
}

export default ChangePassword