import React, { useContext } from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <>
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <span
                      className="text-gray-100 text-2xl cursor-pointer"
                      onClick={() => navigate('/')}
                    >
                      MTraveler
                    </span>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => navigate('/')}
                        className={classNames(
                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                      >
                        Home
                      </button>

                      {!user && (
                        <>
                          {' '}
                          <button
                            onClick={() => navigate('/login')}
                            className={classNames(
                              'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          >
                            Login
                          </button>
                          <button
                            onClick={() => navigate('/register')}
                            className={classNames(
                              'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          >
                            Register
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {user && (
                  <div className="right-0 text-gray-100 flex gap-4 justify-center items-center">
                    <span>{user.username}</span>
                    <button
                      onClick={() => {
                        dispatch({
                          type: 'LOGOUT',
                        });
                      }}
                      className="inline-block rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-center font-medium text-white hover:bg-indigo-700"
                    >
                      Logout
                    </button>
                    {user.isAdmin && (
                      <button
                        onClick={() => navigate('/admin')}
                        className={classNames(
                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                      >
                        Admin Panel
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {!user && (
                  <>
                    {' '}
                    <Disclosure.Button
                      onClick={() => navigate('/')}
                      className={classNames(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                    >
                      Home
                    </Disclosure.Button>
                    <Disclosure.Button
                      onClick={() => navigate('/login')}
                      className={classNames(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                    >
                      Login
                    </Disclosure.Button>
                  </>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
