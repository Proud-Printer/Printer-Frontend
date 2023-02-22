import { connectDB } from 'db/connect';
import Dj from 'models/djModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await Dj.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  user.isDjOnline = true;
  await user.save();

  // Validate password
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    jwt.sign(
      { id: user._id },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isDjOnline: user.isDjOnline,
            clubbers: user.clubbers,
          },
        });
      }
    );
  });
}
