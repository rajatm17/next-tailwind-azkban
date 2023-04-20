import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <div>
          <header>
            <nav className="flex h-12 justify-between shadow-md px-4 items-center">
              <Link href="/" legacyBehavior>
                <a className="text-lg font-bold ">Azkban</a>
              </Link>
              <div>
                <Link href="/cart" legacyBehavior>
                  <a className="p-2">Cart</a>
                </Link>
                <Link href="/login" legacyBehavior>
                  <a className="p-2">Login</a>
                </Link>
              </div>
            </nav>
          </header>
        </div>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          footer
        </footer>
      </div>
    </>
  );
}