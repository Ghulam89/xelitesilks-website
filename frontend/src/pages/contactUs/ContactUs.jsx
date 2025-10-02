import React, { useState } from 'react'
// import PopupLoginSignUp from '../component/PopupLoginSignUp'

function ContactUs() {

    const [showModel, setShowModel] = useState(false)
    return (
        <div>
            {/** Map */}
            <div className='container-fluid'>
                <iframe
                    className='bg-[#f7f7f7] rounded-[8px] p-2'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.521941824463!2d-118.40357272390203!3d34.03048011887841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbbf80eec803%3A0x8425555061bf7fe8!2sUmbrella%20Custom%20Packaging%20USA!5e0!3m2!1sen!2s!4v1742941460574!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            {/** Contact Info */}
            <div className='my-10 mx-2'>
                <div className='container mx-auto px-5 bg-gray-100 p-2 rounded-lg shadow-md'>
                  {/* {showModel && <PopupLoginSignUp onClose={()=>setShowModel(false)}/>} */}
                    {/* <button className='bg-amber-300 p-4 rounded-2xl shadow w-30' onClick={()=>setShowModel(true)}> Login / Sign Up</button>  */}
                    <div className='grid md:grid-cols-12 grid-cols-1 gap-10 mt-10'>
                        <div className='md:col-span-8 col-span-1'>
                            <div>
                                <h4 className='text-3xl leading-10 mb-[7px] font-medium'>Get In Touch</h4>
                                <p className='text-lg text-[#a0a0a0] mb-6'>Use the form below to get in touch with the sales team</p>

                            </div>
                            <div>
                                <form action="">
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>

                                        <input className=' text-lg text-[#181818] font-normal leading-6 border-2 border-[#e9e9e9] py-2.5 px-4 rounded-lg w-full' type="text" placeholder='Your Name *' />

                                        <input className='text-lg text-[#181818] font-normal leading-6 border-2 border-[#e9e9e9] py-2.5 px-4 rounded-lg w-full' type="email" placeholder='Your Email *' />




                                    </div>
                                    <div className='mt-5'>
                                        <textarea name="" id="" placeholder='Your Message *' className='text-lg text-[#181818] font-normal leading-6 border-2 border-[#e9e9e9] py-2.5 px-4 rounded-lg w-full' cols="30" rows="5"></textarea>
                                    </div>
                                    <div>
                                        <button className='bg-[#181818] text-white text-lg font-medium leading-6 py-3 px-8 rounded-full mt-5 hover:bg-[#3c3c3c]'>Send message</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className='md:col-span-4 col-span-1'>
                            <div>
                                <h1 className='text-3xl leading-10 mb-[7px] font-medium'>Information</h1>
                                <div className='flex flex-col mt-6'>
                                    <h6 className='text-xl leading-6 font-medium'>Phone:</h6>
                                    <p className='text-lg text-[#4d4e4f] mt-1.5'>+1 666 234 8888</p>
                                </div>
                                <div className='flex flex-col mt-6'>
                                    <h6 className='text-xl leading-6 font-medium'>Email:</h6>
                                    <p className='text-lg text-[#4d4e4f] mt-1.5'>info@xelitesilks.com</p>
                                </div>
                                <div className='flex flex-col mt-6'>
                                    <h6 className='text-xl leading-6 font-medium'>Address:</h6>
                                    <p className='text-lg text-[#4d4e4f] mt-1.5'>2163 Phillips Gap Rd, West Jefferson, North Carolina, United States</p>
                                </div>
                                <div className='flex flex-col mt-6'>
                                    <h6 className='text-xl leading-6 font-medium'>Open Time:</h6>
                                    <p className='text-lg text-[#4d4e4f] mt-1.5'>Mon - Sat:
                                        7:30am - 8:00pm PST

                                        Sunday:
                                        9:00am - 5:00pm PST</p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>





        </div>
    )
}

export default ContactUs
