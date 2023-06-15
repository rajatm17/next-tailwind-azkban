import { Store } from '@/utils/Store';
import Head from 'next/head';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

import Cookies from 'js-cookie';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const [cartItemsCount, setcartItemsCount] = useState(0);
  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  });

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Azkban' : 'Amazona'}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <div>
          <header>
            <nav className="flex h-12 justify-between shadow-md px-4 items-center">
              <Link href="/" legacyBehavior>
                <a className="text-lg font-bold ">Azkban</a>
              </Link>
              <div>
                <Link href="/Cart" legacyBehavior>
                  <a className="p-2">
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-full bg-green-800 py-1 text-xs font-bold text-white ">
                        {cartItemsCount}
                      </span>
                    )}
                  </a>
                </Link>

                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu
                    as="div"
                    className="relative inline-block"
                    legacyBehavior
                  >
                    <Menu.Button className="text-yellow-600">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                      {/* <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item> */}
                      {/* <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item> */}
                      <Menu.Item className="dropdown-link">
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login" legacyBehavior>
                    <p className="p-2">Login</p>
                  </Link>
                )}
              </div>
            </nav>
          </header>
        </div>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          Made with 💕 by Rajat @Copyright
        </footer>
      </div>
    </>
  );
}
