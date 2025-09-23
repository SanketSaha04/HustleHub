import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from '../models/User.js';

export default function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        try {
            let user = await User.findOne({ email: email });
            if (user) {
                return done(null, user);
            } else {
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: email,
                });
                await newUser.save();
                return done(null, newUser);
            }
        } catch (err) {
            return done(err, null);
        }
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}