import React from 'react'
import banner from '../../assets/images/about-banner.webp'
import about1 from '../../assets/images/about1.jpg'
import about2 from '../../assets/images/about2.jpg'
import about3 from '../../assets/images/about3.jpg'
import team1 from '../../assets/images/team-1.jpg'
import team2 from '../../assets/images/team-2.jpg'
import team3 from '../../assets/images/team-3.jpg'
import team4 from '../../assets/images/team-4.jpg'
import Navbar from '../../components/Header/Navbar'
import TopNav from '../../components/Header/TopNav'
import Footer from '../../components/Footer/Footer'

function About() {
  const teams = [
    { name: 'Maria Rossi', role: 'Founder & CEO', image: team1, bio: 'Maria founded the company in 2004 with a vision to bring authentic Italian craftsmanship to the world.' },
    { name: 'Francesca Bianchi', role: 'Co-Founder & Creative Director', image: team2, bio: 'Francesca joined the team in 2020, bringing fresh ideas and a modern touch to our classic designs.' },
    { name: 'Luca Verdi', role: 'Head of Production', image: team3, bio: 'Luca oversees our production process, ensuring every piece meets our high standards of quality.' },
    { name: 'Giulia Neri', role: 'Marketing Manager', image: team4, bio: 'Giulia manages our marketing efforts, connecting us with customers around the globe.' },
  ];
  return (
    <>

     <TopNav />
         <Navbar/>
      {/**Hero section */}
      <div className='container-fluid mx-auto'>
        <div className='flex justify-center items-center  text-shadow-2xs'>
          <h1 className='md:text-3xl text-lg p-5 text-center'>Crafting Luxury Italian Scarves, Ties & Pocket Squares Since 2004</h1>
        </div>
        <div
          className="md:pt-30 pt-10 md:pb-40 pb-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className=" text-center w-full">

            <div className="flex flex-col bg-[#ffffffca] justify-center items-center gap-4 md:p-10 p-2 rounded-md md:w-2xl w-[300px] mx-auto">
              <h3 className="md:text-4xl text-lg font-semibold text-[#454444]  text-balance md:leading-10 leading-6">In a Tuscan village, life itself becomes inspiration art, culture, and tradition woven into every design</h3>
              <span className="md:text-lg text-sm text-gray-500">Homepage / About Us</span>

            </div>
          </div>
        </div>
      </div>
      {/**Main section */}
      <div className='container-fluid'>
        <div className='container mx-auto py-6'>

          <h1 className='md:text-3xl text-xl p-5 text-center font-semibold'>Slow Fashion. Fair Value.</h1>

        </div>
        {/**section One */}
        <div className='bg-[#f7f3ef]'>
          <div className='container mx-auto md:p-10 p-5'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
              <div><img src={about1} alt="" className='w-full rounded-2xl shadow-2xl md:h-100 h-50 object-cover' /></div>
              <div className='flex flex-col justify-center items-start gap-5'>
                <h4 className='md:text-3xl text-2xl font-semibold capitalize text-balance'>It all started with a childhood in Rome</h4>
                <p className='md:text-lg text-sm text-pretty'>Where my friends and I played in the piazzas and old streets which in the '60s and '70s  were populated with small artisanal shops where I shopped with my mother. My favorites were the fabric shops. I loved to sew and create things, and walls lined with rolls of fabrics fascinated me.</p>
              </div>
            </div>
          </div>




        </div>
        {/**section two */}
        <div className=''>
          <div className='container mx-auto md:p-10 p-5'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-10 reverse'>

              <div className='flex flex-col justify-center items-start gap-5'>
                <h4 className='md:text-3xl text-2xl font-semibold capitalize '>In 2003, during a trip to Lake Como, everything changed</h4>
                <p className='md:text-lg text-sm text-pretty'>During that trip I had the good fortune to be introduced to the silk that Como is historically famous for, and some of the people who make it.A love affair was born along with a determination to bring Como silk to the USA where I was living at the time.In 2004, I opened the online boutique, selling women's scarves. It was a bit crazy, as at the time I did not even have a computer.</p>
              </div>
              <div><img src={about2} alt="" className='w-full rounded-2xl shadow-2xl md:h-100 h-50 object-cover' /></div>
            </div>
          </div>




        </div>
        {/**section three */}
        <div className='bg-[#f7f3ef]'>
          <div className='container mx-auto md:p-10 p-5'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-10 reverse'>
              <div><img src={about3} alt="" className='w-full rounded-2xl shadow-2xl md:h-100 h-50 object-cover' /></div>
              <div className='flex flex-col justify-center items-start gap-5'>
                <h4 className='md:text-3xl text-2xl font-semibold capitalize text-balance'>In 2020, my daughter Francesca joined me</h4>
                <p className='md:text-lg text-sm text-pretty'>And together we made a new website together.Francesca lives in Germany and I live on a small organic farm in Le Marche, Italy. This is a photo taken from my front veranda.Living surrounded by nature is a continuous source of design inspiration for me.</p>
              </div>

            </div>
          </div>




        </div>
        <div className='container mx-auto py-6 text-center p-2'>
          <div className=' flex flex-col justify-center items-center gap-5 md:p-10 p-5 bg-[#f7f3ef] rounded-2xl'>

            <h1 className='md:text-4xl text-xl p-5 text-center font-bold capitalize'>Eco-conscious and fair labor</h1>
            <p className='md:text-xl text-sm text-balance lg:w-250 md:w-auto w-auto font-semibold'>Every item in our boutique is made in sweatshop-free, eco-conscious, family-run businesses in Italy. I personally visit these workshops several times a year, and they have become a part of our family.</p>

          </div>
        </div>

      </div>
      {/**Meet Our Team Section */}
      <div className='container mx-auto py-6 text-center'>
        <div className=' flex flex-col justify-center items-center  '>

          <h1 className='md:text-3xl text-xl p-5 text-center font-semibold'>Meet Our Team</h1>
          <p className='md:text-lg text-sm text-balance lg:w-250 md:w-auto w-auto font-semibold text-center'>We are a small family-run business based in Italy and Germany, passionate about bringing you the finest Italian scarves, ties, and pocket squares.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
          {teams.map((member, index) => (
            <div key={index} className="flex flex-col justify-center items-start gap-2 p-5 group shadow rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <img src={member.image} alt={member.name} className="w-full object-cover rounded-lg shadow-lg" />

              <h4
                className="mt-3 font-semibold text-lg relative inline-block
               after:content-[''] after:absolute after:left-0 after:bottom-0
               after:h-[2px] after:w-0 after:bg-black
               after:transition-all after:duration-300 
               after:[transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)]
               group-hover:after:w-full group-hover:text-[#c5a980] cursor-pointer"
              >
                {member.name}
              </h4>

              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="text-start text-lg text-pretty">{member.bio}</p>
            </div>

          ))}
        </div>



      </div>
      <Footer/>
    </>

  )
}

export default About
