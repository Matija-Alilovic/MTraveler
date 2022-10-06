import React from 'react';

import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ContactUs from '../../components/contact-us/ContactUs';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Pateo Santo Estevao-Self Catering',
    href: '#',
    imageSrc:
      'https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg',
    imageAlt: 'Fdsaolkdhasiou',
    price: 'Starting from $35',
    rating: '8.9 Rating',
  },
  {
    id: 2,
    name: 'Pateo Santo Estevao-Self Catering',
    href: '#',
    imageSrc:
      'https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg',
    imageAlt: 'Fdsaolkdhasiou',
    price: 'Starting from $35',
    rating: '8.9 Rating',
  },
  {
    id: 4,
    name: 'Pateo Santo Estevao-Self Catering',
    href: '#',
    imageSrc:
      'https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg',
    imageAlt: 'Fdsaolkdhasiou',
    price: 'Starting from $35',
    rating: '8.9 Rating',
  },
  {
    id: 5,
    name: 'Pateo Santo Estevao-Self Catering',
    href: '#',
    imageSrc:
      'https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg',
    imageAlt: 'Fdsaolkdhasiou',
    price: 'Starting from $35',
    rating: '8.9 Rating',
  },
  {
    id: 6,
    name: 'Pateo Santo Estevao-Self Catering',
    href: '#',
    imageSrc:
      'https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg',
    imageAlt: 'Fdsaolkdhasiou',
    price: 'Starting from $35',
    rating: '8.9 Rating',
  },
  {
    id: 3,
    name: 'Pateo Santo Estevao-Self Catering',
    href: '#',
    imageSrc:
      'https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg',
    imageAlt: 'Fdsaolkdhasiou',
    price: 'Starting from $35',
    rating: '8.9 Rating',
  },
  {
    id: 3,
    name: 'Pateo Santo Estevao-Self Catering',
    href: '#',
    imageSrc:
      'https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg',
    imageAlt: 'Fdsaolkdhasiou',
    price: 'Starting from $35',
    rating: '8.9 Rating',
  },
  {
    id: 3,
    name: 'Pateo Santo Estevao-Self Catering',
    href: '#',
    imageSrc:
      'https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg',
    imageAlt: 'Fdsaolkdhasiou',
    price: 'Starting from $35',
    rating: '8.9 Rating',
  },
];

const List = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar></Navbar>
      <Header></Header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative"
            onClick={() => navigate(`/hotels/${product.id}`)}
          >
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </>
  );
};

export default List;
