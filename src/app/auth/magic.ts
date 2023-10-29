import { Magic } from 'magic-sdk';
import { Magic as MagicAdmin } from "@magic-sdk/admin";

const createMagic = (key: string) => {
  // We make sure that the window object is available
  // Then we create a new instance of Magic using a publishable key
  if (typeof window !== "undefined") {
    return new Magic(key);
  }
};

const createMagicAdmin = (key: string) => {
  // We make sure that the window object is available
  // Then we create a new instance of Magic using a secret key
  if (typeof window !== "undefined") {
    return new MagicAdmin(key);
  }
};

// Pass in your publishable key from your .env file
const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY as string);
const magicAdmin = createMagicAdmin(process.env.MAGIC_SECRET_KEY as string);

export { magic, magicAdmin }