import { router } from 'next/router';
import React from 'react';

export default function soon() {
  const handleClick = () => {
    router.push('/');
  };
  return (
    <div>
      <h1>Repeat The whole process until there is a payment gateway 🙂</h1>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        🥲🥲
      </button>
    </div>
  );
}
