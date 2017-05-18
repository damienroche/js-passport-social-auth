var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy = require('passport-twitter').Strategy;
// var GithubStrategy = require('passport-github2').Strategy;
// var GoogleStrategy = require('passport-google-oauth2').Strategy;
// var InstagramStrategy = require('passport-instagram').Strategy;
var User = require('../models/User.js');

module.exports = passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_KEY,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['id', 'displayName', 'photos', 'email', 'first_name']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ fbID: profile.id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        console.log(profile);
        user = new User({
          fbID: profile.id,
          name: profile.displayName,
          first_name: profile.name.givenName,
          photo_url: profile.photos[0].value,
          created: Date.now()
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));

// passport.use(new TwitterStrategy({
//   consumerKey: config.twitter.consumerKey,
//   consumerSecret: config.twitter.consumerSecret,
//   callbackURL: config.twitter.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOne({ oauthID: profile.id }, function(err, user) {
//       if(err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID: profile.id,
//           name: profile.displayName,
//           created: Date.now()
//         });
//         user.save(function(err) {
//           if(err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }
// ));

// module.exports = passport.use(new GithubStrategy({
//   clientID: process.env.GITHUB_ID,
//   clientSecret: process.env.GITHUB_KEY,
//   callbackURL: process.env.GITHUB_CALLBACK
//   },
//   (accessToken, refreshToken, profile, done) => {
//     User.findOne({ oauthID: profile.id }, (err, user) => {
//       if(err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID: profile.id,
//           name: profile.displayName,
//           created: Date.now()
//         });
//         user.save((err) => {
//           if(err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }
// ));

// passport.use(new GoogleStrategy({
//   clientID: config.google.clientID,
//   clientSecret: config.google.clientSecret,
//   callbackURL: config.google.callbackURL
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOne({ oauthID: profile.id }, function(err, user) {
//       if(err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID: profile.id,
//           name: profile.displayName,
//           created: Date.now()
//         });
//         user.save(function(err) {
//           if(err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }
// ));

// passport.use(new InstagramStrategy({
//   clientID: config.instagram.clientID,
//   clientSecret: config.instagram.clientSecret,
//   callbackURL: config.instagram.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOne({ oauthID: profile.id }, function(err, user) {
//       if(err) {
//         console.log(err);  // handle errors!
//       }
//       if (!err && user !== null) {
//         done(null, user);
//       } else {
//         user = new User({
//           oauthID: profile.id,
//           name: profile.displayName,
//           created: Date.now()
//         });
//         user.save(function(err) {
//           if(err) {
//             console.log(err);  // handle errors!
//           } else {
//             console.log("saving user ...");
//             done(null, user);
//           }
//         });
//       }
//     });
//   }
// ));
