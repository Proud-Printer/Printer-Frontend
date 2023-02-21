import { connectDB } from 'db/connect';
import Clubber from 'models/clubberModel';
import Dj from 'models/djModel';

export default async function handler(req, res) {
  await connectDB();
  const { djId } = req.body;
  const { play } = req.query;

  // get dj
  const getDjById = async () => {
    const dj = Dj.findById(djId);
    return dj;
  };

  const dj = await getDjById();

  // check if dj exists
  if (!dj) {
    return res.status(404).json({ message: 'Dj not found' });
  }

  // check if song has already been played by dj
  const song = dj.clubbers.find((clubber) => clubber.clubberId == play);

  if (song.isPlayed) {
    return res.status(400).json({ message: 'Song has already been played' });
  }

  // play song
  const clubberIndex = dj.clubbers.findIndex(
    (clubber) => clubber.clubberId == play
  );

  dj.clubbers[clubberIndex].isPlayed = true;

  // find song in clubber collection and delete it
  const clubber = await Clubber.findById(flag);
  await clubber.remove();

  // remove song from queue
  dj.clubbers.splice(clubberIndex, 1);
  await dj.save();
  res.status(200).json(dj);
}
