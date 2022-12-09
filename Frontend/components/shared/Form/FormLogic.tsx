import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AuthForm from './AuthForm';

interface SignUp {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  confirmPassword: string
  gender: string
}
interface Login {
  userName: string
  password: string
}

interface CorporateForm {
  firstName: string
  lastName: string
  CompanyName: string
  CompanyEmail: string
  CompanyCity: string
  numberOfEmployees: "A" | "B" | "C" | "D" | "E" | "F";

}
////// SignUp Schema

const SignUpschema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  userName: yup.string().min(6).max(30).required(),
  email: yup.string().email().required(),
  password: yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number "
    )
    .required('No password provided.'),


  confirmPassword: yup.string()
    .required('Password is mendatory')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  gender: yup.string().required(),
}).required();

////// Login Schema
const Loginschema = yup.object({
  userName: yup.string().required().test('is-email', 'Invalid email', (value) => {
    if (value) {
      return value.includes('@') ? yup.string().email().isValidSync(value) : true
    }
    return true
  }).test('is-username', 'userName should atleast 6 characters and atmost 30', (value) => {
    if (value) {
      return value.includes('@') ? true : yup.string().min(6).max(30).isValidSync(value)
    }
    return true
  }),
  password: yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
}).required();

////// Corporate Form Schema
const Corpchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  CompanyName: yup.string().required(),
  CompanyEmail: yup.string().required(),
  CompanyCity: yup.string().required(),
  numberOfEmployees: yup.string().required(),
}).required();



type Props = {
  FormType: "SignUp" | "Login" | "CorporateForm"
}

const FormLogic = (props: Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<SignUp | Login | CorporateForm>({
    resolver: yupResolver(props.FormType === "SignUp" ? SignUpschema : props.FormType === "Login" ? Loginschema : props.FormType === "CorporateForm" ? Corpchema : SignUpschema)
  });

  let Inputs: {
    ref: any,
    name: string,
    label: string,
    type: string,
    placeholder: string,
    required: boolean
  }[] = []



  if (props.FormType === "SignUp") {
    Inputs = [
      { ref: register("firstName"), type: 'text', name: "firstName", label: "First Name", placeholder: "First Name", required: true },
      { ref: register("lastName"), type: 'text', name: "lastName", label: "Last Name", placeholder: "Last Name", required: true },
      { ref: register("userName"), type: 'text', name: "userName", label: "User Name", placeholder: "User Name", required: true },
      { ref: register("email"), type: 'email', name: "email", label: "Email", placeholder: "Email", required: true },
      { ref: register("password"), type: 'password', name: "password", label: "Password", placeholder: "Password", required: true },
      { ref: register("confirmPassword"), type: "password", name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password", required: true },
      { ref: register("gender"), type: 'dropdown', name: "gender", label: "Gender", placeholder: "", required: true },

    ]

  }

  if (props.FormType === "Login") {
    Inputs = [
      { ref: register("userName"), type: 'text', name: "userName", label: "Username Or Email", placeholder: "User Name", required: true },
      { ref: register("password"), type: 'password', name: "password", label: "Password", placeholder: "Password", required: true },
    ]
  }

  if (props.FormType === "CorporateForm") {
    Inputs = [
      { ref: register("firstName"), type: 'text', name: "firstName", label: "First Name", placeholder: "First Name", required: true },
      { ref: register("lastName"), type: 'text', name: "lastName", label: "Last Name", placeholder: "Last Name", required: true },
      { ref: register("CompanyName"), type: 'text', name: "CompanyName", label: "Company Name", placeholder: "Company Name", required: true },
      { ref: register("CompanyEmail"), type: 'email', name: "CompanyEmail", label: "Company Email", placeholder: "Company Email", required: true },
      { ref: register("CompanyCity"), type: "text", name: "CompanyCity", label: "Company City", placeholder: "Company City", required: true },
      { ref: register("numberOfEmployees"), type: 'text', name: "numberOfEmployees", label: "Number of Employees", placeholder: "", required: true },
    ]
  }



  function onSubmit(data: SignUp | Login | CorporateForm) {
    console.log(data)
  }



  return (
    <AuthForm FormTitle={""} ValidationErrors={errors} Submit={handleSubmit(onSubmit)} Inputs={Inputs} ButtonText={props.FormType == 'CorporateForm' ? "Contact Sales" : props.FormType}></AuthForm>
  )
}

export default FormLogic