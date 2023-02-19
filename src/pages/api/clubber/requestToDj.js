import { connectDB } from 'db/connect';
import Clubber from 'models/clubberModel';
import Dj from 'models/djModel';

export default async function handler(req, res) {
  const { djId, clubberSong } = req.body;

  // get dj
  await connectDB();

  const getDjById = async () => {
    const dj = Dj.findById(djId);
    return dj;
  };

  const dj = await getDjById();

  // create clubber
  const clubber = await Clubber.create({
    song: clubberSong,
    djId: dj._id,
  });

  // add clubber to dj
  dj.clubbers.push({
    song: clubber.song,
    clubberId: clubber._id,
  });
  await dj.save();

  res.status(200).json(dj);
}
