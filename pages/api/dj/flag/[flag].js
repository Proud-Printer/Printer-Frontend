import { connectDB } from 'db/connect';
import Dj from 'models/djModel';
import Clubber from 'models/clubberModel';

export default async function handler(req, res) {
  const { flag } = req.query;
  const { djId } = req.body;

  // get dj
  await connectDB();

  // flag song with clubberId
  const getDjById = async () => {
    const dj = Dj.findById(djId);
    return dj;
  };

  const dj = await getDjById();

  // check if dj exists
  if (!dj) {
    return res.status(404).json({ message: 'Dj not found' });
  }

  // check if song has already been flagged by dj
  const song = dj.clubbers.find((clubber) => clubber.clubberId == flag);

  if (song.isFlagged) {
    return res.status(400).json({ message: 'Song has already been flagged' });
  }

  // flag song
  const clubberIndex = dj.clubbers.findIndex(
    (clubber) => clubber.clubberId == flag
  );

  dj.clubbers[clubberIndex].isFlagged = true;

  // find song in clubber collection and delete it
  const clubber = await Clubber.findById(flag);
  await clubber.remove();


  // remove song from queue
  dj.clubbers.splice(clubberIndex, 1);
  await dj.save();
  res.status(200).json(dj);
}
