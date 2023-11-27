import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='h-screen w-screen'>
      <div className='flex sticky top-0 left-0 right-0 h-20 bg-[#5a62f7]/50 backdrop-blur text-white'>
        <div className='pl-6 text-2xl font-extrabold pt-8'>
          Image Forgery Detection System
        </div>
        <div className='flex pr-4 h-full mt-8 ml-auto text-xl'>
          <Link className='pl-4 font-bold hover:underline'>Home</Link>
          <Link className='pl-4 font-bold hover:underline'>About</Link>
          <Link to={'/Login'} className='pl-4 font-bold hover:underline'>Login</Link>
        </div>
      </div>

      <div className='w-[90%] m-auto pt-10'>
        <h1 className='text-[#5a62f7] text-4xl font-extrabold mb-6'>
          Image Forgery
        </h1>
        <p className='text-[#5a62f7] text-lg font-medium'>
          Image forgery means the manipulation of digital images to conceal meaningful or useful information.
          In some cases, it can be difficult to identify the edited regions in the original image.
          The detection of forged images is crucial for ensuring authenticity and maintaining image integrity.
        </p>
      </div>

      <div className='w-[90%] m-auto pt-10'>
        <h2 className='text-[#5a62f7] text-2xl font-extrabold mb-4'>
          Types of Image Forgery
        </h2>
        <ul className='list-disc list-inside text-[#5a62f7] text-lg font-medium'>
          <li>Copy-Move Forgery</li>
          <li>Splicing Forgery</li>
          <li>Retouching Forgery</li>
          <li>Object Removal Forgery</li>
          <li>Geometric Transformation Forgery</li>
        </ul>
      </div>
    </div>
  );
};