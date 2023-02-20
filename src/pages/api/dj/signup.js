import { connectDB } from 'db/connect';
import Dj from 'models/djModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    const hash = await bcrypt.hash(password, salt);
    if (!hash) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    const newUser = new Dj({
      name,
      email,
      password: hash,
      isDjOnline: true,
      clubbers: [],
    });

    const savedUser = await newUser.save();
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      {
        expiresIn: 3600,
      }
    );

    res.json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        isDjOnline: true,
        clubbers: [],
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
