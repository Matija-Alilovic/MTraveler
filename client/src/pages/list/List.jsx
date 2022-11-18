import React, { useState } from 'react';

import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ContactUs from '../../components/contact-us/ContactUs';
import { useNavigate } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { useLocation } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}`
  );

  return (
    <>
      <Navbar></Navbar>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
        {data.map((item) => (
          <div
            key={item._id}
            className="group relative"
            onClick={() => navigate(`/hotels/${item._id}`)}
          >
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                src={item.photos[0]}
                alt={item.imageAlt}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.address}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {item.cheapestPrice}$
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </>
  );
};

export default List;
