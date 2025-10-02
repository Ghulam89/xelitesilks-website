import React from 'react'

function SingleProductTabs() {
    const [activeTab, setActiveTab] = React.useState(0);
    const tab = [
        <h2>Ralated Products</h2>,
        <h2>Recently Viewed</h2>,
    ];

    const content = [
        <div>Products Ralated</div>,
        <div>Products Recently</div>,
    ]

  return (
    <div>
        <div className='flex justify-center gap-5'>

          
           
                {tab.map((item,index)=>(
                
                    <div>
                         <button
                         key={index}
                        onClick={()=>setActiveTab(index)}
                        className={`md:text-3xl text-lg whitespace-nowrap leading-10 font-semibold  transition-all ease-in-out duration-300  ${activeTab === index ? 'border-b-2' : 'border-b-0'} ` }
                         >{item}</button>

                    </div>
                   

                
                        
                 
                ))}
               
          
        </div>
        <div className='w-full h-auto mt-10'>
            {content && content.map((item, index)=>{
                if(activeTab === index){
                    return(<div key={index}>{item}</div>)
                }
            })}

        </div>
      
    </div>
  )
}

export default SingleProductTabs
