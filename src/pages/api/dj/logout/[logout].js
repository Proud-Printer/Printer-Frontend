import Dj from 'models/djModel';

export default async function handler(req, res) {
  const { id } = req.query;
  const dj = await Dj.findById(id);
  dj.isDjOnline = false;
  await dj.save();
  res.status(200).json({ message: 'DJ logged out' });
}
