import mongoose from 'mongoose';

const clubberSchema = mongoose.Schema(
  {
    song: {
      type: String,
      required: true,
    },
    djId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dj',
    },
  },
  {
    timestamps: true,
  }
);

const Clubber =
  mongoose.models.Clubber || mongoose.model('Clubber', clubberSchema);

export default Clubber;
