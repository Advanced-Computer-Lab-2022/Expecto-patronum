import React from 'react';


const CertficateTemplate = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-red-300  rounded-lg shadow-xl">
      <div className="bg-center bg-cover h-64" style={{ backgroundImage: 'url(/images/certificate-bg.jpg)' }}>
        <div className="px-6 py-4">
          <h1 className="text-4xl font-bold text-white mb-2">Certificate of Completion</h1>
          <p className="text-xl font-semibold text-white mb-4">This certifies that</p>
          <p className="text-3xl font-bold text-white mb-6">John Doe</p>
          <p className="text-lg text-white mb-4">has successfully completed the course</p>
          <p className="text-2xl font-semibold text-white mb-4">Introduction to Next.js</p>
          <p className="text-lg text-white">on</p>
          <p className="text-2xl font-semibold text-white">December 20, 2021</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <div className="w-1/3">
            <img src="/images/signature.png" alt="Signature" className="h-12" />
          </div>
          <div className="w-2/3">
            <p className="text-lg font-bold mb-0">John Smith</p>
            <p className="text-sm font-semibold text-gray-700">Course Instructor</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/3">
            <img src="/images/seal.png" alt="Seal" className="h-12" />
          </div>
          <div className="w-2/3">
            <p className="text-lg font-bold mb-0">Acme Learning Institute</p>
            <p className="text-sm font-semibold text-gray-700">Accredited Education Institution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertficateTemplate;