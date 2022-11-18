// @ts-nocheck
import React, { useContext, useState } from 'react';
import './header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

import {
  faBed,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from '../../context/SearchContext.js';

const Header = ({ type }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, op) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: op === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
    navigate('/hotels', { state: { destination, dates, options } });
    //window.location.reload(false);
  };

  return (
    <div className="header pb-10">
      <div className="relative overflow-hidden bg-slate-100">
        <div className="pt-16 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 z-0">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Find your next stay with MTraveler
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Search deals on hotels, homes, and much more...
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://i.insider.com/534445096da811a55372c34c?width=1000&format=jpeg&auto=webp"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://blog.valamar.com/wp-content/uploads/2020/05/Croatia_Filming_Locations_Korcula.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://img1.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://img.theculturetrip.com/wp-content/uploads/2021/01/90d3b33c-jpg.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://media.timeout.com/images/103710336/image.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://wander-lush.org/wp-content/uploads/2021/06/Most-beautiful-places-in-Croatia-DP-hero-Motovun.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!user && (
                  <button
                    onClick={() => {
                      navigate('/login');
                    }}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
                  >
                    Sign in / Register
                  </button>
                )}
                {user && (
                  <h1 className="font-bold tracking-tight text-indigo-600 sm:text-2xl">
                    Welcome {user.username.toUpperCase()}
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form className="headerSearch" onSubmit={handleSearch}>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Type city you want to go"
              className="headerSearchInput"
              onChange={(e) => setDestination(e.target.value.toLowerCase())}
              required
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />

            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
              dates[0].endDate,
              'dd/MM/yyyy'
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      type="button"
                      disabled={options.adult <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption('adult', 'd')}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button
                      type="button"
                      className="optionCounterButton"
                      onClick={() => handleOption('adult', 'i')}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      type="button"
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption('children', 'd')}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      type="button"
                      className="optionCounterButton"
                      onClick={() => handleOption('children', 'i')}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      type="button"
                      disabled={options.room <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption('room', 'd')}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      type="button"
                      className="optionCounterButton"
                      onClick={() => handleOption('room', 'i')}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button
              type="submit"
              className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
