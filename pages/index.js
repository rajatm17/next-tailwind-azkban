import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import data from '@/utils/data';
import Productitem from '@/components/Productitem';
import Product from '@/models/Product';
import db from '@/utils/db';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ products }) {
  return (
    <Layout title="Homepage">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Productitem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
