import Link from 'next/link'
import React from 'react'

type Props = {
  Data: { Error: boolean, Message: string, Cta?: string, CtaLink?: string } | { Success: boolean, Message: string, Cta?: string, CtaLink?: string }

}

const FormFeedBack = (props: Props) => {
  return (
    <div>
      <p className="text-white">{props.Data.Message}</p>
      {props.Data.Cta && props.Data.CtaLink && <Link href={props.Data.CtaLink}>{props.Data.Cta}</Link>}
    </div>


  )
}

export default FormFeedBack