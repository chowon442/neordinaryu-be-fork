import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "./generated/prisma";
import { Profile } from "passport-google-oauth20";

dotenv.config();
export const prisma = new PrismaClient({ log: ["query"] });
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

interface GoogleUser {
  id: number;
  email: string;
  name: string;
}

const googleVerify = async (profile: Profile): Promise<GoogleUser> => {
  const email: string | undefined = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      password: null,
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};
