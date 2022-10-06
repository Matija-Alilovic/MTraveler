import React from 'react';

import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Collections from '../../components/collections/Collections';
import Apartments from '../../components/apartments/Apartments';
import ContactUs from '../../components/contact-us/ContactUs';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div className={'bg-slate-100'}>
      <Navbar />
      <Header />
      <Collections />
      <Apartments />
      <ContactUs></ContactUs>
      <Footer></Footer>
    </div>
  );
};

export default Home;
