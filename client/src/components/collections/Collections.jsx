import useFetch from '../../hooks/useFetch.js';
import React from 'react';

const callouts = [
  {
    name: 'Zagreb',
    description: 'Zagreb, Croatia’s northwestern capital',
    imageSrc:
      'https://www.visit-croatia.co.uk/wp-content/uploads/2017/12/zagreb.jpg',
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'New York',
    description:
      'New York City comprises 5 boroughs sitting where the Hudson River',
    imageSrc:
      'https://static01.nyt.com/images/2022/07/28/nyregion/28nytoday-skyline/28nytoday-skyline-superJumbo.jpg',
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'London',
    description: 'London, the capital of England and the United Kingdom',
    imageSrc:
      'https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/United%20Kingdom/London/london-aerial-thames-guide.jpg?imwidth=680',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Berlin',
    description: 'Berlin, Germany’s capital, dates to the 13th century.',
    imageSrc:
      'https://cdn.britannica.com/49/179449-138-9F4EC401/Overview-Berlin.jpg?w=800&h=450&c=crop',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];

const Collections = () => {
  const { data, loading, error } = useFetch(
    '/hotels/countByCity?cities=zagreb,new york,london'
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-12 lg:max-w-none lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900">Popular Cities</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
