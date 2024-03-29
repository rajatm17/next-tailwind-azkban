import Layout from '@/components/Layout';
import Product from '@/models/Product';
import { Store } from '@/utils/Store';

import db from '@/utils/db';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';
import { useContext } from 'react';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  if (!product) {
    return <Layout title="Product not found">Product not found</Layout>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry.Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/"> back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li> Category : {product.category}</li>
            <li> Brand : {product.brand}</li>
            <li>
              {' '}
              {product.rating} of {product.numReviews}
            </li>
            <li> Description : {product.description}</li>
          </ul>
        </div>
        <div className="card p-5 h-min">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div> {product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
          </div>
          <button
            className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 border border-amber-700 rounded w-full"
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
