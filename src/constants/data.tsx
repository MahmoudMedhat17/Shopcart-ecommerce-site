import { Facebook, Youtube } from "lucide-react";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

export const headerMenuData = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "Shop",
        href: "/shop"
    },
    {
        title: "Blog",
        href: "/blog"
    },
    {
        title: "Contact",
        href: "/contact"
    },
    {
        title: "Hot Deal",
        href: "/deals"
    }
];


export const socialMediaLinks = [
    {
        title: "Youtube",
        href: "https://www.youtube.com/",
        icon: <Youtube />
    },
    {
        title: "Facebook",
        href: "https://www.facebook.com/",
        icon: <Facebook />
    },
    {
        title: "Instagram",
        href: "https://www.instagram.com/",
        icon: <Instagram />
    },
    {
        title: "LinkedIn",
        href: "https://www.linkedin.com/",
        icon: <Linkedin />
    }
];



export const topFooterData = [
    {
        icon: (<MapPin className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />),
        title: "Visit Us",
        subTitle: "Cairo,EG"
    },
    {
        icon: (<Phone className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />),
        title: "Call Us",
        subTitle: "+201012107269"
    },
    {
        icon: (<Clock className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />),
        title: "Working Hours",
        subTitle: "Sunday - Thursday: 9AM - 5PM"
    },
    {
        icon: (<Mail className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />),
        title: "Email",
        subTitle: "m7moooud.17@gmail.com"
    }
];

export const quickLinksData = [
    { title: "About us", href: "/about" },
    { title: "Contact us", href: "/contact" },
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "FAQs", href: "/faqs" },
    { title: "Help", href: "/help" },
];
export const categoriesData = [
    { title: "Mobiles", href: "mobiles" },
    { title: "Appliances", href: "appliances" },
    { title: "Smartphones", href: "smartphones" },
    { title: "Air Conditioners", href: "air-conditioners" },
    { title: "Washing Machine", href: "washing-machine" },
    { title: "Kitchen Appliances", href: "kitchen-appliances" },
    { title: "gadget accessories", href: "gadget-accessories" },
];