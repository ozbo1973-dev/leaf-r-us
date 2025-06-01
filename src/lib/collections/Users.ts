import type { CollectionConfig } from "payload";

const userRoles = [
  { label: "Super Admin", value: "super-admin" },
  { label: "Business Admin", value: "business-admin" },
  { label: "Business Manager", value: "business-manager" },
  { label: "Business Staff", value: "business-staff" },
  { label: "Retailer Admin", value: "retailer-admin" },
  { label: "Retailer Manager", value: "retailer-manager" },
  { label: "Retailer Employee", value: "retailer-employee" },
];
const accountTypes = [
  { label: "Business/Supplier", value: "business" },
  { label: "Retailer", value: "retailer" },
  { label: "Platform Admin", value: "admin" },
];

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [
    { name: "email", type: "email", required: true, unique: true },
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    {
      name: "role",
      type: "select",
      options: userRoles,
      required: true,
    },
    {
      name: "accountType",
      type: "select",
      options: accountTypes,
      required: true,
    },
    {
      name: "parentBusinessAccount",
      type: "relationship",
      relationTo: "business-accounts",
      required: false,
      admin: {
        condition: (data: any) => data?.accountType === "business",
      },
    },
    {
      name: "parentRetailerAccount",
      type: "relationship",
      relationTo: "retailer-accounts",
      required: false,
      admin: {
        condition: (data: any) => data?.accountType === "retailer",
      },
    },
    {
      name: "parentUser",
      type: "relationship",
      relationTo: "users",
      required: false,
      admin: {
        condition: (data: any) =>
          [
            "retailer-manager",
            "retailer-employee",
            "business-manager",
            "business-staff",
          ].includes(data?.role),
      },
    },
    { name: "isActive", type: "checkbox", defaultValue: true },
    { name: "lastLogin", type: "date", admin: { readOnly: true } },
  ],
};
