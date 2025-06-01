import type { CollectionConfig } from "payload";

export const RetailerAccounts: CollectionConfig = {
  slug: "retailer-accounts",
  admin: { useAsTitle: "businessName" },
  fields: [
    { name: "businessName", type: "text", required: true },
    {
      name: "retailType",
      type: "select",
      options: [
        { label: "Online Store", value: "online" },
        { label: "Physical Store", value: "physical" },
        { label: "Both Online & Physical", value: "hybrid" },
        { label: "Marketplace Seller", value: "marketplace" },
        { label: "Reseller", value: "reseller" },
      ],
      required: true,
    },
    { name: "businessRegistrationNumber", type: "text", required: true },
    { name: "taxId", type: "text", required: true },
    { name: "resellersLicense", type: "text", required: true },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        { name: "phone", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "website", type: "text" },
      ],
    },
    {
      name: "billingAddress",
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
  ],
};
