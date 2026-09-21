import React from 'react'
import Image from 'next/image';

const HotFive = () => {
  return (
    <div className="w-full h-full bg-brand-orange/90 flex flex-col justify-between relative ">
     <Image src={'https://ik.imagekit.io/willsbucket/Outsyde/rave.jpg'} alt='rave' width={500} height={500} className='w-full h-full object-cover'/>
    </div>
  );
}

export default HotFive