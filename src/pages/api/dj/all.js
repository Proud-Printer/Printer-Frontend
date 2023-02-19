import { connectDB } from 'db/connect';
import Dj from 'models/djModel';

export default async function handler(req, res) {
  // get all djs
  await connectDB();
  const djs = await Dj.find({});
  res.status(200).json(djs);
}
