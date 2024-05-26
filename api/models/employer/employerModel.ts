import mongoose, {HydratedDocument} from 'mongoose';
import {randomUUID} from 'crypto';
import {EmployerFields, EmployerModel, UserFields, UserMethods} from '../../types';
import bcrypt from 'bcrypt';

export const SALT_WORK_FACTOR = 10;

const employerSchema = new mongoose.Schema<EmployerFields, EmployerModel, UserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<UserFields>, email: string): Promise<boolean> {
        if (!this.isModified('email')) return true;

        const user: HydratedDocument<UserFields> | null = await Employer.findOne({
          email,
        });

        return !user;
      },
      message: 'This user is already registered!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'employer',
  },
  avatar: String,
  googleID: String,
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contacts: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  documents: [{
    type: String,
  }],
  vacancies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vacancy',
    },
  ],

});

employerSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

employerSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

employerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

employerSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const Employer = mongoose.model<EmployerFields, EmployerModel>('Employer', employerSchema);
export default Employer;