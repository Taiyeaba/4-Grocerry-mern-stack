import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import ServicesSection from './ServicesSection';
import BestSeller from './BestSeller';

const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <BestSeller/>
      <div className='mb-10'><ServicesSection/></div>
      
    </div>
  );
};

export default Home;