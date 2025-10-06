import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });

      try {
        const user = {
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          email: profile.emails?.[0]?.value,
        };
        return cb(null, user);
      } catch (error) {
        console.log("passport error", error);
        return cb(error, undefined);
      }
    },
  ),
);

// console.log("Registered strategies:", Object.keys((passport as any)._strategies));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => {
  if (obj) {
    done(null, obj);
  }
});
