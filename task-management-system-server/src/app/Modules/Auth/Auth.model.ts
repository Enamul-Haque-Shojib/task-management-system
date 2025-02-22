import { model, Schema } from 'mongoose';
import { TAuth, AuthStaticModel } from './Auth.interface';




const authSchema = new Schema<TAuth, AuthStaticModel>(
  {

    authName: {
      type: String,
      default: '',
    },
    authImgUrl: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
 
    role: {
      type: String,
      enum: {
        values: ['Admin', 'User'],
      },
      default: 'User',
    },
  },
  {
    timestamps: true,
  },
);

authSchema.statics.isAuthExistById = async function (id: string) {
  return await AuthModel.findById(id, { authId: 1 });
};
authSchema.statics.isAuthExistByEmail = async function (email: string) {
  return await AuthModel.findOne({ email });
};

export const AuthModel = model<TAuth, AuthStaticModel>('Auth', authSchema);

