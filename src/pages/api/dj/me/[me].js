import { connectDB } from 'db/connect';
import Dj from 'models/djModel';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Connect to the database
  await connectDB();
  // Get the user's details based on the id

  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  const { me } = req.query;

  // Get the user's details based on the id
  const coll = Dj.collection;
  const cursor = coll.find({ _id: new ObjectId(me) });
  const user = await cursor.toArray();

  // If the user exists, return the user's details
  if (user) {
    res.status(200).json(user[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}
