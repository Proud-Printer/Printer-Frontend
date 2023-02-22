import { connectDB } from 'db/connect';
import Dj from 'models/djModel';

export default async function handler(req, res) {
  // Connect to the database
  await connectDB();

  const { logout } = req.query;
  const dj = await Dj.findById(logout);
  dj.isDjOnline = false;
  await dj.save();
  res.status(200).json({ message: 'DJ logged out' });
}
