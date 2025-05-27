import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { resendAdapter } from "@payloadcms/email-resend";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  email: resendAdapter({
    defaultFromAddress: "dev@leaf-r-us.com",
    defaultFromName: "Leaf-R-Us",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
});
