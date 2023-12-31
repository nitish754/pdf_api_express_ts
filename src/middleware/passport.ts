import User from "../model/User";
import passportJwt from "passport-jwt";
import { Request } from 'express'
import { JWT_KEY } from "../config";
import { PassportStatic } from "passport";


const { Strategy } = passportJwt;


const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.headers.authorization) {
    jwt = req.headers?.authorization;
  }
  console.log("JWT AT PARSER",jwt);
  return jwt;
};

const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      // console.log("payload==>", payload);

      await User.findById(payload._id)
        .then((user) => {
          user ? done(null, user) : done(null, false);
        })
        .catch(() => done(null, false));
    })
  );
};