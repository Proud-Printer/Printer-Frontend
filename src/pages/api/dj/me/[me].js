import Dj from 'models/djModel';

export default async function handler(req, res) {
  // Get the user's details based on the id
  const { id } = req.query;

  // Get the user's details based on the id
  const getUser = Dj.collection;
  const user = await getUser.doc(id).get();

  // If the user exists, return the user's details
  if (user.exists) {
    res.status(200).json(user.data());
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}
