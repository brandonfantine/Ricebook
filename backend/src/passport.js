const passport = require('passport');
const { user, profile } = require('./mongo');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, newProfile, done) {
        let newUser = {
            googleId: newProfile.id,
            username: newProfile.name.givenName,
            name: newProfile.name.givenName + ' ' + newProfile.name.familyName,
            email: newProfile.emails[0].value,
            token: accessToken,
        };

        const dbUser = await user.findOne({ googleId: newUser.googleId });
        newUser.username = dbUser.username;

        if (!dbUser) {
            // REGISTER
            const dbUsers = await user.find({ username: new RegExp(`${newUser.username}*`) });
            if (dbUsers.length)
                user.username = user.username + dbUsers.length;
            const newUserDB = await new user({
                googleId: newUser.googleId,
                username: req.body.username,
                hash: hash,
                salt: salt,
            }).save();
            const newProfileDB = await new profile({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                zipcode: req.body.zipcode,
                headline: 'COMP 431 Dummy Data',
                following: [],
                avatar: "data:image/jpeg;base64,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"
            }).save();
        }

        return done(null, newUser);
    }
));

module.exports = passport;