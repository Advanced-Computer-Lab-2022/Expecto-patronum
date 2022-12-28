import classNames from 'classnames'
import React from 'react'

type Props = {
  Title: string,
  SubTitle?: string

}

const SectionTitle = (props: Props) => {
  return (
    <div className={TitleSection}>
      <h2 className={Title}>{props.Title}</h2>
      {
        props.SubTitle && <p className={SubTitle}>{props.SubTitle}</p>
      }
    </div>
  )
}

export default SectionTitle
const TitleSection = classNames("text-center w-full border-b-2 border-gray-300 py-4");
const Title = classNames("text-2xl font-bold");
const SubTitle = classNames("text-lg text-gray-500");