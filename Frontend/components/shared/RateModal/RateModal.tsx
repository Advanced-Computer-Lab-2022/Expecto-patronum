import classNames from 'classnames'
import React, { useEffect } from 'react'
import Modal from '../Modal/Modal'
import BigRating from '../rating/BigRating'

type Props = {
  setOpen: (Open: boolean) => void
  CurrentRate: number
  SetCurrentRate: (Rate: number) => void
}

const RateModal = (props: Props) => {
  const [RateChange, setRateChange] = React.useState(0);



  return (
    <Modal SetOpen={props.setOpen} CloseBtn={true}>
      <div className={RateModalCont}>
        <p className={Title} >Why did you leave this rating?</p>
        <div>
          <p className={Subtitle}>
            {RateChange ?
              RateChange <= 0.5 ? "Awful, not what I expected at all" :
                RateChange === 1 ? "Awful / Poor" :
                  RateChange === 1.5 ? "Poor, pretty disappointed" :
                    RateChange === 2 ? "Fair" :
                      RateChange === 2.5 ? "Poor / Average" :
                        RateChange === 3 ? "Average, could be better" :
                          RateChange === 3.5 ? "Average / Good" :
                            RateChange === 4 ? "Good, what I expected" :
                              RateChange === 4.5 ? "Good / Amazing" :
                                RateChange === 5 ? "Amazing, above expectations!" : ""
              :
              props.CurrentRate <= 0.5 ? "Awful, not what I expected at all" :
                props.CurrentRate === 1 ? "Awful / Poor" :
                  props.CurrentRate === 1.5 ? "Poor, pretty disappointed" :
                    props.CurrentRate === 2 ? "Fair" :
                      props.CurrentRate === 2.5 ? "Poor / Average" :
                        props.CurrentRate === 3 ? "Average, could be better" :
                          props.CurrentRate === 3.5 ? "Average / Good" :
                            props.CurrentRate === 4 ? "Good, what I expected" :
                              props.CurrentRate === 4.5 ? "Good / Amazing" :
                                props.CurrentRate === 5 ? "Amazing, above expectations!" : ""}

          </p>
          <BigRating Hover={setRateChange} Setter={props.SetCurrentRate} RateAction={true} Rate={props.CurrentRate} size={50}></BigRating>
        </div>
        <textarea placeholder='Your Review..' className={TextBox}></textarea>
        <div className={ButtonCont}>
          <p className={Button}>Save and Continue</p>
        </div>

      </div>
    </Modal>

  )
}

export default RateModal

const RateModalCont = classNames("text-center py-10 bg-white px-4");
const Title = classNames("text-2xl font-bold mb-4");
const Subtitle = classNames("text-md font-bold");
const TextBox = classNames("max-h-64  min-h-[5rem] w-[40vw]  bg-white border  border-gray-800 rounded-lg p-2 ");
const ButtonCont = classNames("flex justify-end mt-2");
const Button = classNames("py-2 px-1 w-1/4 cursor-pointer bg-canadian-red rounded-md text-white hover:bg-calm-red");
