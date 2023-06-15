//api/orders/:id

import db from '@/utils/db';
import { getSession } from 'next-auth/react';

const { default: Order } = require('@/models/Order');

async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  await db.connect();

  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
}

export default handler;
