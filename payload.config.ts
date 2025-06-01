import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { resendAdapter } from "@payloadcms/email-resend";
import { Users } from "@/lib/collections/Users";
import { BusinessAccounts } from "@/lib/collections/BusinessAccounts";
import { RetailerAccounts } from "@/lib/collections/RetailerAccounts";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, BusinessAccounts, RetailerAccounts],
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
  admin: {
    components: {
      afterNavLinks: ["./src/app/(payload)/admin/custom-logout-button.tsx"],
    },
  },
});
