import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

type Props = {
    isOpened: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAccepted: React.Dispatch<React.SetStateAction<boolean>>,
    className?: string,
    title?: string,
}

const TermsAndConditions = (props: Props) => {

    let router = useRouter();

    async function logout() {
    Response = await axios.get("http://localhost:5000/User/logout", {
      }).then((res: { data: any; }) => { return res.data });
      router.push({
        pathname: 'http://localhost:3000/Auth'
      });
      localStorage.clear();
    }

    const termsRef = useRef<HTMLDivElement>(null);
    const popUpRef = useRef<HTMLDivElement>(null);

    function goToHome() {
        props.setIsAccepted(true);
        props.setIsOpened(false);
    }

    function declineTerms() {
        popUpRef.current?.classList.remove('hidden');
    }

    function goBack() {
        popUpRef.current?.classList.add('hidden');
    }

    function confirmReject() {
        popUpRef.current?.classList.add('hidden');
        props.setIsOpened(false);
        props.setIsAccepted(false);
        logout();
    }


  return (
    <div ref={termsRef} className={`${props.className} ${props.isOpened ? '': 'scale-0'} fixed z-[100] backdrop-blur-sm mt-2.5 h-full right-0 left-0 top-0 text-right transition-all duration-300`}>
        <div className='w-[48rem] nv-max:w-screen bg-white rounded-lg pb-6 mx-auto h-[34rem] relative'>
            <h1 className='text-center text-2xl font-bold py-2'>{props.title ? props.title :'Terms & Conditions'}</h1>
            <div className='overflow-x-hidden max-h-[80%] mx-6 px-3 border-1.5 rounded-lg text-center'>
                In General
                Canadian Chamber of Commerce - Middle East (“CanChamLearningSystem.com”) owns and operate this Website.  This document governs your relationship with [Your Online Store URL] (“Website”). Access to and use of this Website and the products and services available through this Website (collectively, the "Services") are subject to the following terms, conditions and notices (the "Terms of Service"). By using the Services, you are agreeing to all of the Terms of Service, as may be updated by us from time to time. You should check this page regularly to take notice of any changes we may have made to the Terms of Service.

                Access to this Website is permitted on a temporary basis, and we reserve the right to withdraw or amend the Services without notice. We will not be liable if for any reason this Website is unavailable at any time or for any period. From time to time, we may restrict access to some parts or all of this Website.
                This Website may contain links to other websites (the "Linked Sites"), which are not operated by [Your Online Store URL]. [Your Online Store URL] has no control over the Linked Sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them. Your use of the Linked Sites will be subject to the terms of use and service contained within each such site.

                Privacy Policy
                Our privacy policy, which sets out how we will use your information, can be found at [Privacy Policy Link]. By using this Website, you consent to the processing described therein and warrant that all data provided by you is accurate.

                Prohibitions
                You must not misuse this Website. You will not: commit or encourage a criminal offense; transmit or distribute a virus, trojan, worm, logic bomb or any other material which is malicious, technologically harmful, in breach of confidence or in any way offensive or obscene; hack into any aspect of the Service; corrupt data; cause annoyance to other users; infringe upon the rights of any other person's proprietary rights; send any unsolicited advertising or promotional material, commonly referred to as "spam"; or attempt to affect the performance or functionality of any computer facilities of or accessed through this Website. Breaching this provision would constitute a criminal offense and [Your Online Store URL] will report any such breach to the relevant law enforcement authorities and disclose your identity to them.

                We will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material due to your use of this Website or to your downloading of any material posted on it, or on any website linked to it.

                Intellectual Property, Software and Content
                The intellectual property rights in all software and content (including photographic images) made available to you on or through this Website remains the property of [Your Online Store URL] or its licensors and are protected by copyright laws and treaties around the world. All such rights are reserved by [Your Online Store URL] and its licensors. You may store, print and display the content supplied solely for your own personal use. You are not permitted to publish, manipulate, distribute or otherwise reproduce, in any format, any of the content or copies of the content supplied to you or which appears on this Website nor may you use any such content in connection with any business or commercial enterprise.

                Terms of Sale
                By placing an order you are offering to purchase a product on and subject to the following terms and conditions. All orders are subject to availability and confirmation of the order price.
                Dispatch times may vary according to availability and subject to any delays resulting from postal delays or force majeure for which we will not be responsible. 

                In order to contract with [Your Online Store URL] you must be over 18 years of age and possess a valid credit or debit card issued by a bank acceptable to us. [Your Online Store URL] retains the right to refuse any request made by you. If your order is accepted we will inform you by email and we will confirm the identity of the party which you have contracted with. This will usually be [Your Online Store URL] or may in some cases be a third party. Where a contract is made with a third party [Your Online Store URL] is not acting as either agent or principal and the contract is made between yourself and that third party and will be subject to the terms of sale which they supply you. When placing an order you undertake that all details you provide to us are true and accurate, that you are an authorized user of the credit or debit card used to place your order and that there are sufficient funds to cover the cost of the goods. The cost of foreign products and services may fluctuate. All prices advertised are subject to such changes.

                (a) Our Contract 
                When you place an order, you will receive an acknowledgement e-mail confirming receipt of your order: this email will only be an acknowledgement and will not constitute acceptance of your order. A contract between us will not be formed until we send you confirmation by e-mail that the goods which you ordered have been dispatched to you. Only those goods listed in the confirmation e-mail sent at the time of dispatch will be included in the contract formed.

                (b) Pricing and Availability
                Whilst we try and ensure that all details, descriptions and prices which appear on this Website are accurate, errors may occur. If we discover an error in the price of any goods which you have ordered we will inform you of this as soon as possible and give you the option of reconfirming your order at the correct price or cancelling it. If we are unable to contact you we will treat the order as cancelled. If you cancel and you have already paid for the goods, you will receive a full refund.
                Delivery costs will be charged in addition; such additional charges are clearly displayed where applicable and included in the 'Total Cost'.

                (c) Payment 
                Upon receiving your order we carry out a standard authorization check on your payment card to ensure there are sufficient funds to fulfil the transaction. Your card will be debited upon authorisation being received. The monies received upon the debiting of your card shall be treated as a deposit against the value of the goods you wish to purchase. Once the goods have been despatched and you have been sent a confirmation email the monies paid as a deposit shall be used as consideration for the value of goods you have purchased as listed in the confirmation email.

                Disclaimer of Liability
                The material displayed on this Website is provided without any guarantees, conditions or warranties as to its accuracy. Unless expressly stated to the contrary to the fullest extent permitted by law [Your Online Store URL] and its suppliers, content providers and advertisers hereby expressly exclude all conditions, warranties and other terms which might otherwise be implied by statute, common law or the law of equity and shall not be liable for any damages whatsoever, including but without limitation to any direct, indirect, special, consequential, punitive or incidental damages, or damages for loss of use, profits, data or other intangibles, damage to goodwill or reputation, or the cost of procurement of substitute goods and services, arising out of or related to the use, inability to use, performance or failures of this Website or the Linked Sites and any materials posted thereon, irrespective of whether such damages were foreseeable or arise in contract, tort, equity, restitution, by statute, at common law or otherwise. This does not affect [Your Online Store URL]'s liability for death or personal injury arising from its negligence, fraudulent misrepresentation, misrepresentation as to a fundamental matter or any other liability which cannot be excluded or limited under applicable law.

                Linking to this Website
                You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it, but you must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists. You must not establish a link from any website that is not owned by you. This Website must not be framed on any other site, nor may you create a link to any part of this Website other than the home page. We reserve the right to withdraw linking permission without notice.

                Disclaimer as to ownership of trade marks, images of personalities and third party copyright
                Except where expressly stated to the contrary all persons (including their names and images), third party trade marks and content, services and/or locations featured on this Website are in no way associated, linked or affiliated with [Your Online Store URL] and you should not rely on the existence of such a connection or affiliation. Any trade marks/names featured on this Website are owned by the respective trade mark owners. Where a trade mark or brand name is referred to it is used solely to describe or identify the products and services and is in no way an assertion that such products or services are endorsed by or connected to [Your Online Store URL].

                Indemnity
                You agree to indemnify, defend and hold harmless [Your Online Store URL], its directors, officers, employees, consultants, agents, and affiliates, from any and all third party claims, liability, damages and/or costs (including, but not limited to, legal fees) arising from your use this Website or your breach of the Terms of Service.

                Variation
                [Your Online Store URL]  shall have the right in its absolute discretion at any time and without notice to amend, remove or vary the Services and/or any page of this Website.

                Invalidity
                If any part of the Terms of Service is unenforceable (including any provision in which we exclude our liability to you) the enforceability of any other part of the Terms of Service will not be affected all other clauses remaining in full force and effect. So far as possible where any clause/sub-clause or part of a clause/sub-clause can be severed to render the remaining part valid, the clause shall be interpreted accordingly. Alternatively, you agree that the clause shall be rectified and interpreted in such a way that closely resembles the original meaning of the clause /sub-clause as is permitted by law.

                Complaints
                We operate a complaints handling procedure which we will use to try to resolve disputes when they first arise, please let us know if you have any complaints or comments.

                Waiver
                If you breach these conditions and we take no action, we will still be entitled to use our rights and remedies in any other situation where you breach these conditions.

                Entire Agreement
                The above Terms of Service constitute the entire agreement of the parties and supersede any and all preceding and contemporaneous agreements between you and [Your Online Store URL]. Any waiver of any provision of the Terms of Service will be effective only if in writing and signed by a Director of [Your Online Store URL].

            </div>
            <button onClick={declineTerms} className="rounded-md border-1.5 border-bright-gray h-8 px-4 mr-4 mt-4 ml-4 text-gray-500 hover:text-white hover:bg-bright-gray transition-all duration-300">Decline</button>
            <button onClick={goToHome} className="rounded-md border-1.5 border-canadian-red bg-calm-red h-8 px-4 mr-8 mt-4 ml-4 text-white hover:bg-canadian-red transition-all duration-300">Accept</button>
            <div ref={popUpRef} className='absolute rounded-lg mx-12 right-0 top-40 shadow-md bg-white hidden transition-all duration-300'>
                <div className='p-4 space-y-2'>
                    <h1 className='text-lg font-bold tracking-wider text-left'>Are you sure you want to cancel?</h1>
                    <p className='text-gray-600 text-left'>You won't be able to access any of our website features without accepting the terms and conditions.</p>
                </div>
                <div className='bg-gray-100 rounded-b-lg px-4 py-3'>
                    <button onClick={goBack} className="rounded-md border-1.5 border-bright-gray h-8 px-4 mr-4 ml-4 text-gray-500 hover:text-white hover:bg-bright-gray transition-all duration-300">No</button>
                    <button onClick={confirmReject} className="rounded-md border-1.5 border-canadian-red bg-calm-red h-8 px-4 mr-8 ml-4 text-white hover:bg-canadian-red transition-all duration-300">Yes, cancel</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TermsAndConditions;