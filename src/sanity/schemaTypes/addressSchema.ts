import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const addressSchema = defineType({
  name: "address",
  title: "Address",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      description: "Full Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emailAddress",
      title: "Email Address",
      type: "email",
      description: "Email address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone No.",
      type: "string",
      description: "Phone No. (Optional)",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      description: "Your address in details.",
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: "streetAddress",
      title: "Street Address",
      type: "string",
      description: "Street Address",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      description: "State, province, or region",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zipCode",
      title: "Zip Code",
      type: "string",
      description: "Postal code for this address",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      description: "Country for this address",
      initialValue: "Egypt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "countryCode",
      title: "Country Code",
      type: "string",
      description: "Two letter country code (e.g. US, CA, GB)",
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: "stateCode",
      title: "State Code",
      type: "string",
      description: "State/Province code for international addresses",
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: "subArea",
      title: "Sub Area",
      type: "string",
      description: "Sub area, district, or neighborhood",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "addressType",
      title: "Address Type",
      type: "string",
      description: "Type of address (home, office, other)",
      options: {
        list: [
          {
            title: "Home",
            value: "home",
          },
          {
            title: "Office",
            value: "office",
          },
          {
            title: "Other",
            value: "other",
          },
        ],
      },
      initialValue: "Home",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "default",
      title: "Default Address",
      type: "boolean",
      description: "Is this the default shipping address?",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "address",
      city: "city",
      state: "state",
      isDefault: "default",
      type: "type",
    },
    prepare({ title, subtitle, city, state, isDefault, type }) {
      return {
        title: `${title} ${isDefault ? "(Default)" : ""}`,
        subtitle: `${type} ${subtitle} ${city} ${state}`,
      };
    },
  },
});
