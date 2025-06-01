import type { CollectionConfig } from "payload";

export const BusinessAccounts: CollectionConfig = {
  slug: "business-accounts",
  admin: { useAsTitle: "businessName" },
  fields: [
    { name: "businessName", type: "text", required: true },
    {
      name: "businessType",
      type: "select",
      options: [
        { label: "Manufacturer", value: "manufacturer" },
        { label: "Distributor", value: "distributor" },
        { label: "Wholesaler", value: "wholesaler" },
        { label: "Import/Export", value: "import_export" },
      ],
      required: true,
    },
    { name: "businessRegistrationNumber", type: "text", required: true },
    { name: "taxId", type: "text", required: true },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        { name: "phone", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "website", type: "text" },
        { name: "salesContactName", type: "text" },
        { name: "salesContactPhone", type: "text" },
        { name: "salesContactEmail", type: "email" },
      ],
    },
    {
      name: "address",
      type: "group",
      fields: [
        { name: "street", type: "text", required: true },
        { name: "city", type: "text", required: true },
        { name: "state", type: "text", required: true },
        { name: "zipCode", type: "text", required: true },
        { name: "country", type: "text", required: true },
      ],
    },
    {
      name: "verificationStatus",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Verified", value: "verified" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "pending",
    },
    { name: "isActive", type: "checkbox", defaultValue: true },
    {
      name: "createdAt",
      type: "date",
      admin: { readOnly: true },
      defaultValue: () => new Date(),
    },
  ],
};
