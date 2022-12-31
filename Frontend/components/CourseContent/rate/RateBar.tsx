import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react'
import OneStar from '../../shared/rating/OneStar';
import { MdCancel } from 'react-icons/md';

type Props = {
  Rate: { 1: number, 2: number, 3: number, 4: number, 5: number, avg: number };
  index: number;
  Clicked: number;
  SetClicked: (index: number) => void;

}

const RateBar = (props: Props) => {
  function ArrayPrecentage() {
    let array = [props.Rate[1], props.Rate[2], props.Rate[3], props.Rate[4], props.Rate[5]];
    let sum = array.reduce((a, b) => a + b, 0);
    let precentage = array.map(item => Math.round((item / sum) * 100));
    return precentage;
  }
  let precentage = ArrayPrecentage()

  function onclick() {
    if (precentage[6 - props.index - 1] !== 0) {

      if (props.Clicked == props.index) {
        props.SetClicked(0);
      }
      else {
        props.SetClicked(props.index);
      }
    }
  }
  return (
    <div key={props.index} onClick={onclick}
      className={"flex  w-[20rem] gap-2 items-center mb-3 cursor-pointer transition-all  " + " " + (props.Clicked != props.index && props.Clicked != 0 && 'opacity-50')}>
      <OneStar rating={6 - props.index}></OneStar>
      <div className=" w-[6rem] bg-gray-200 rounded-sm h-2.5 dark:bg-gray-700">
        <div
          className="bg-yellow-400 h-2.5"
          style={{ width: precentage[6 - props.index - 1] + "%" }}>
        </div>
      </div>
      <div className='flex'>
        <p className='text-sm  text-blue-700 underline'>{precentage[6 - props.index - 1] + "%"}</p>
        {props.Clicked == props.index && <MdCancel className='text-red-500'></MdCancel>}
      </div>

    </div >
  )
}

export default RateBar
