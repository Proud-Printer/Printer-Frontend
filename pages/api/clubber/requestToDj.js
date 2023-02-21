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

  // song already requested for can be requested again after 30 minutes (1800000 milliseconds) throw error
  const isSongRequested = dj.clubbers.find(
    (clubber) => clubber.song === clubberSong
  );

  if (isSongRequested) {
    return res.status(400).json({
      error: 'Song already requested',
    });
  }

  // create clubber
  const clubber = await Clubber.create({
    song: clubberSong,
    djId: dj._id,
  });

  // add clubber to dj
  dj.clubbers.push({
    song: clubber.song,
    clubberId: clubber._id,
    isPlayed: false,
    isFlagged: false,
  });
  await dj.save();

  res.status(200).json(dj);
}
