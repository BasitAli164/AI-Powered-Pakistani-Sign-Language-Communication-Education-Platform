/**
 * User Model
 * MongoDB schema for user data
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      match: [/^03[0-9]{9}$/, 'Please provide a valid Pakistani phone number'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't return password by default
    },

    // Profile
    avatar: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say'],
      required: [true, 'Gender is required'],
    },

    // User Type & Accessibility
    userType: {
      type: String,
      enum: [
        'deaf',
        'hard_of_hearing',
        'speech_impaired',
        'hearing',
        'family',
        'teacher',
        'healthcare',
        'volunteer',
      ],
      required: [true, 'User type is required'],
    },
    hearingLevel: {
      type: String,
      enum: ['profound', 'severe', 'moderate', 'mild', 'normal'],
      default: null,
    },

    // Preferences
    preferredLanguage: {
      type: String,
      enum: ['en', 'ur', 'psl'],
      default: 'en',
    },
    preferredSignLanguage: {
      type: String,
      enum: ['PSL', 'ASL'],
      default: 'PSL',
    },

    // Settings
    settings: {
      accessibility: {
        highContrast: { type: Boolean, default: false },
        fontSize: {
          type: String,
          enum: ['small', 'medium', 'large', 'extra-large'],
          default: 'medium',
        },
        vibrationEnabled: { type: Boolean, default: true },
        flashlightAlerts: { type: Boolean, default: true },
        captionSpeed: { type: Number, default: 1.0, min: 0.5, max: 2.0 },
      },
      notifications: {
        enabled: { type: Boolean, default: true },
        sound: { type: Boolean, default: false },
        vibration: { type: Boolean, default: true },
        emergency: { type: Boolean, default: true },
      },
      privacy: {
        shareLocation: { type: Boolean, default: false },
        showOnlineStatus: { type: Boolean, default: true },
        allowCommunityPosts: { type: Boolean, default: true },
      },
    },

    // Verification
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    verificationExpires: {
      type: Date,
      select: false,
    },

    // OTP
    otp: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
      select: false,
    },

    // Password Reset
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },

    // Activity
    lastLogin: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ userType: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to generate OTP
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  this.otpExpires = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY_MINUTES || 10) * 60 * 1000);
  return otp;
};

// Method to verify OTP
userSchema.methods.verifyOTP = function (candidateOTP) {
  if (!this.otp || !this.otpExpires) {
    return false;
  }
  if (Date.now() > this.otpExpires) {
    return false;
  }
  return this.otp === candidateOTP;
};

// Method to clear OTP
userSchema.methods.clearOTP = function () {
  this.otp = undefined;
  this.otpExpires = undefined;
};

// Static method to find by email or phone
userSchema.statics.findByEmailOrPhone = function (identifier) {
  return this.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;

// Made with Bob
