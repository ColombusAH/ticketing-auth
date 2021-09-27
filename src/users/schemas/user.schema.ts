import * as mongoose from 'mongoose';
import { CryptoService } from 'src/utils/crypto/crypto.service';
import { User } from '../interfaces';
import { UserDoc } from '../interfaces/user.interface';
const cryptoUtil = new CryptoService();
export const UserSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },

    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc: UserDoc, ret: User) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

UserSchema.pre('save', async function (next: () => void) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user: User = this;

  if (user.isModified('password')) {
    const hashed = await cryptoUtil.hash(user.get('password'));
    user.set('password', hashed);
  }
  next();
});
