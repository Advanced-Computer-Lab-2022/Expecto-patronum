import Image from 'next/image';
import React from 'react';
import MainButton from '../../shared/button/MainButton';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const CertficateTemplate = () => {

  const handleDownload = () => {
    //@ts-ignore
    html2canvas(document.querySelector('#certificate-template')).then(canvas => {
      const doc = new jsPDF();
      doc.addImage(canvas.toDataURL(), 'PNG', 15, 15, 170, 0);
      doc.save('certificate.pdf');
    });
  };


  return (
    <div className='w-[80vw] h-[100vh] ml-auto mr-auto'  >
      <div id='certificate-template' className='w-[700px] h-[500px] mt-10 mb-10 relative ml-auto mr-auto  ' >
        <Image alt='certificate' className='relative object-contain' fill src={'/images/CertficateTemplate.png'}></Image>
        {/* <img className=' object-contain' src='/images/CertficateTemplate.png'></img> */}
        <div className='absolute  text-center w-[60%] top-[14.2rem] left-[9rem]'>

          <p className='mb-4 text-6xl FontCertif'>Mohamed Salem</p>

          <p className='text-md text-gray-500' >For successfully completing the Applied Department of Linguistic,
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