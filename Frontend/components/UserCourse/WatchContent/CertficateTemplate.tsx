import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import MainButton from '../../shared/button/MainButton';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import axios from 'axios';
import { PopupMessageContext } from '../../../pages/_app';
import Spinner from '../../shared/spinner/Spinner';
import DataContext from '../../../context/DataContext';
import { useRouter } from 'next/router';

type Props = {
  SendEmail?: boolean
}

const CertficateTemplate = (props: Props) => {
  const { viewPopupMessage } = useContext(PopupMessageContext);
  const [FirstTime, setFirstTime] = React.useState(false);
  const [Data, setData] = React.useState<any>(null);
  const { CourseName } = React.useContext(DataContext);
  const [Loading, SetLoading] = React.useState(false);
  let router = useRouter();

  useEffect(() => {
    //@ts-ignore
    let LocalStorage = JSON.parse(localStorage.getItem('UserInfo'));
    setData(LocalStorage)
  }, [])


  useEffect(() => {
    if (props.SendEmail && FirstTime) {
      //@ts-ignore
      html2canvas(document.querySelector('#certificate-template')).then(async canvas => {
        console.log(canvas.toDataURL('image/jpeg', 0.5));
        Response = await axios.post("http://localhost:5000/User/RecieveMail", {
          dataUrl: canvas.toDataURL('image/jpeg', 0.5),
        })
        viewPopupMessage(true, "Congratulations You have Passed The Exam and Received certificate on Your Mail!");

      }).catch(err => console.log(err));

    }
    else {
      setFirstTime(true);
    }
  }, [])


  const handleDownload = () => {
    //@ts-ignore
    html2canvas(document.querySelector('#certificate-template')).then(canvas => {
      const doc = new jsPDF();
      doc.addImage(canvas.toDataURL(), 'PNG', 15, 15, 170, 0);
      doc.save('certificate.pdf');
      console.log(canvas.toDataURL('image/jpeg', 0.5));
      ////////////Change place
    });
  };
  const handleBack = async () => {
    SetLoading(true);
    router.back();

  }


  if (!Data) return (<Spinner></Spinner>)

  return (
    <div className='w-[80vw] h-[100vh] ml-auto mr-auto'  >
      <div className='absolute'>

        <MainButton outline Size='md' btnText='Back' Loading={Loading} HandleClick={handleBack} Back  ></MainButton>
      </div>

      <div id='certificate-template' className='w-[700px] h-[500px] mt-10 mb-10 relative ml-auto mr-auto  ' >
        <Image alt='certificate' className='relative object-contain' fill src={'/images/CertficateTemplate.png'}></Image>
        {/* <img className=' object-contain' src='/images/CertficateTemplate.png'></img> */}
        <div className='absolute  text-center w-[60%] top-[14.2rem] left-[9rem]'>

          <p className='mb-4 text-6xl FontCertif'>{Data.firstname + " " + Data.lastname}</p>

          <p className='text-md text-gray-500' >For successfully completing the {CourseName} course,
            on 3rd December 2022. </p>
        </div>
        <p className='absolute top-[24.5rem] left-[9rem] FontCertif'>Radwan</p>

        <p className='absolute top-[24.5rem] left-[30rem] FontCertif'>David</p>

      </div >
      <div className='flex justify-center'>
        <MainButton Size='md' btnText='Download' HandleClick={handleDownload} ></MainButton>
      </div>
    </div >

  );
};

export default CertficateTemplate;