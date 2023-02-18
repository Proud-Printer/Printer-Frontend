import mongoose from 'mongoose';

const djSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDjOnline: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Dj = mongoose.models.Dj || mongoose.model('Dj', djSchema);

export default Dj;
