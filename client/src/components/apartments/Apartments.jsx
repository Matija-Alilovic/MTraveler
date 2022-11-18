import useFetch from 'hooks/useFetch';
import React from 'react';
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

const Apartments = () => {
  const { data, loading, error } = useFetch('/hotels/');
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-12 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Homes guests love
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative cursor-pointer">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.photos}
                  alt={product.desc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    City: {product.city.toUpperCase()}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.cheapestPrice} $
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apartments;
