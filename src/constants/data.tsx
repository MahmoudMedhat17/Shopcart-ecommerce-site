import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  Wallet,
  Headphones,
  RefreshCcw,
  Award,
  Clock3,
  Heart,
  Zap,
  Star,
  HeartIcon,
  Clock2,
  Shield,
} from "lucide-react";

export const headerMenuData = [
  {
    title: "Home",
    href: "/client",
  },
  {
    title: "Shop",
    href: "/client/shop",
  },
  {
    title: "Blog",
    href: "/client/blog",
  },
  {
    title: "Contact",
    href: "/client/contact",
  },
  {
    title: "Hot Deal",
    href: "/client/deals",
  },
];

export const socialMediaLinks = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/",
    icon: <Youtube />,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/",
    icon: <Facebook />,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/",
    icon: <Instagram />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: <Linkedin />,
  },
];

export const topFooterData = [
  {
    icon: (
      <MapPin className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
    title: "Visit Us",
    subTitle: "Cairo,EG",
  },
  {
    icon: (
      <Phone className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
    title: "Call Us",
    subTitle: "+201012107269",
  },
  {
    icon: (
      <Clock className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
    title: "Working Hours",
    subTitle: "Sunday - Thursday: 9AM - 5PM",
  },
  {
    icon: (
      <Mail className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
    title: "Email",
    subTitle: "m7moooud.17@gmail.com",
  },
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

// We could fetch the categoryTypes from Sanity CMS since it's defined there as a field but defining it here as an array of objects more simple.
export const categoryTypes = [
  {
    title: "Gadget",
  },
  {
    title: "Appliances",
  },
  {
    title: "Refrigerators",
  },
  {
    title: "Others",
  },
];

export const whyUsData = [
  {
    icon: <ShieldCheck size={50} color="#1760f2" />,
    title: "Secure Shopping",
    desc: "100% secure payment with SSL encryption",
    color: "#1760f2",
    howItWorks: [
      {
        stepOne:
          "Advanced SSL encryption protects all your transactions and personal data during checkout",
        stepTwo:
          "PCI DSS compliant payment processing ensures industry-standard security measures",
        stepThree:
          "Secure payment gateways from trusted providers like Stripe and PayPal",
        stepFour:
          "Regular security audits and monitoring to detect and prevent fraud",
        stepFive: "Your financial information is never stored on our servers",
      },
    ],
    benefits: [
      {
        benefitOne: "Shop with complete confidence",
        benefitTwo: "Protected personal information",
        benefitThree: "Safe payment processing",
        benefitFour: "Fraud prevention systems",
        benefitFive: "Encrypted data transmission",
        benefitSix: "Verified secure checkout",
      },
    ],
  },
  {
    icon: <Truck size={50} color="#03a53d" />,
    title: "Free Delivery",
    desc: "Free shipping on orders over $50",
    color: "#03a53d",
    howItWorks: [
      {
        stepOne:
          "Enjoy free standard shipping on all orders over $50 to anywhere in the country",
        stepTwo:
          "Track your package in real-time with our advanced tracking system",
        stepThree:
          "Partner with reliable carriers for timely and safe delivery",
        stepFour:
          "Eco-friendly packaging materials to reduce environmental impact",
        stepFive:
          "Delivery within 3-7 business days depending on your location",
      },
    ],
    benefits: [
      {
        benefitOne: "Save money on shipping",
        benefitTwo: "Real-time order tracking",
        benefitThree: "Reliable delivery partners",
        benefitFour: "Eco-friendly packaging",
        benefitFive: "Doorstep delivery",
        benefitSix: "No hidden charges",
      },
    ],
  },
  {
    icon: <Wallet size={50} color="#9316f1" />,
    title: "Easy Payments",
    desc: "Multiple payment options available",
    color: "#9316f1",
    howItWorks: [
      {
        stepOne:
          "Accept all major credit and debit cards including Visa, Mastercard, and Amex",
        stepTwo:
          "Digital wallets like PayPal, Apple Pay, and Google Pay for faster checkout",
        stepThree:
          "Buy now, pay later options available through trusted partners",
        stepFour: "Secure one-click checkout for returning customerst",
        stepFive: "International payment methods supported for global shopping",
      },
    ],
    benefits: [
      {
        benefitOne: "Multiple payment options",
        benefitTwo: "Quick one-click checkout",
        benefitThree: "Flexible payment plans",
        benefitFour: "Saved payment methods",
        benefitFive: "International cards accepted",
        benefitSix: "Instant payment confirmation",
      },
    ],
  },
  {
    icon: <Headphones size={50} color="#eb4e03" />,
    title: "24/7 Support",
    desc: "Dedicated customer support anytime",
    color: "#eb4e03",
    howItWorks: [
      {
        stepOne:
          "Round-the-clock customer support via live chat, email, and phone",
        stepTwo:
          "Knowledgeable support team ready to help with any questions or issues",
        stepThree:
          "Average response time of under 2 minutes for live chat inquiries",
        stepFour: "Multi-language support to assist customers worldwide",
        stepFive:
          "Comprehensive FAQ and help center for self-service solutions",
      },
    ],
    benefits: [
      {
        benefitOne: "24/7 availability",
        benefitTwo: "Quick response times",
        benefitThree: "Multiple contact channels",
        benefitFour: "Multi-language support",
        benefitFive: "Multi-language support",
        benefitSix: "Helpful resources",
      },
    ],
  },
  {
    icon: <RefreshCcw size={50} color="#db0b72" />,
    title: "Easy Returns",
    desc: "30-day hassle-free return policy",
    color: "#db0b72",
    howItWorks: [
      {
        stepOne:
          "Return any product within 30 days of delivery with no questions asked",
        stepTwo:
          "Simple online return process - just request a return in your account",
        stepThree: "Free return shipping labels provided for your convenience",
        stepFour:
          "Full refund processed within 5-7 business days after receiving the return",
        stepFive: "Exchange options available for different sizes or colors",
      },
    ],
    benefits: [
      {
        benefitOne: "30-day return window",
        benefitTwo: "No-hassle process",
        benefitThree: "Free return shipping",
        benefitFour: "Quick refund processing",
        benefitFive: "Easy exchanges",
        benefitSix: "Full money-back guarantee",
      },
    ],
  },
  {
    icon: <Award size={50} color="#ecab00" />,
    title: "Quality Assured",
    desc: "100% authentic products guaranteed",
    color: "#ecab00",
    howItWorks: [
      {
        stepOne:
          "Every product is sourced directly from authorized manufacturers and distributors",
        stepTwo:
          "Rigorous quality checks performed before shipping to ensure product condition",
        stepThree:
          "Authenticity certificates available for luxury and high-value items",
        stepFour: "Zero-tolerance policy for counterfeit products",

        stepFive:
          "Quality guarantee backed by our comprehensive warranty program",
      },
    ],
    benefits: [
      {
        benefitOne: "100% authentic products",
        benefitTwo: "Quality inspections",
        benefitThree: "Authorized sellers only",
        benefitFour: "Warranty coverage",
        benefitFive: "Authenticity certificates",
        benefitSix: "Premium product standards",
      },
    ],
  },
  {
    icon: <Clock3 size={50} color="#5547fa" />,
    title: "Fast Processing",
    desc: "Orders processed within 24 hours",
    color: "#5547fa",
    howItWorks: [
      {
        stepOne:
          "All orders placed before 3 PM are processed and shipped the same day",
        stepTwo: "Automated order confirmation sent immediately after purchase",
        stepThree: "Express shipping options available for urgent deliveries",
        stepFour: "Real-time inventory system prevents overselling and delays",
        stepFive: "Priority processing for members and repeat customers",
      },
    ],
    benefits: [
      {
        benefitOne: "Same-day processing",
        benefitTwo: "Immediate confirmation",
        benefitThree: "Express shipping options",
        benefitFour: "Real-time updates",
        benefitFive: "Priority handling",
        benefitSix: "No processing delays",
      },
    ],
  },
  {
    icon: <Heart size={50} color="#ec001a" />,
    title: "Best Prices",
    desc: "Competitive pricing with great deals",
    color: "#ec001a",
    howItWorks: [
      {
        stepOne:
          "Price match guarantee - we'll match any lower price you find elsewhere",
        stepTwo: "Exclusive member discounts and early access to sales",
        stepThree: "Daily deals and flash sales on popular products",
        stepFour: "Seasonal promotions and special holiday offers",
        stepFive: "Loyalty rewards program - earn points with every purchase",
      },
    ],
    benefits: [
      {
        benefitOne: "Competitive pricing",
        benefitTwo: "Price match guarantee",
        benefitThree: "Exclusive member deals",
        benefitFour: "Regular promotions",
        benefitFive: "Loyalty rewards",
        benefitSix: "Best value for money",
      },
    ],
  },
];

export const whyUsDataTargets = [
  {
    number: "50K+",
    title: "Happy Customers",
  },
  {
    number: "100K+",
    title: "Products Sold",
  },
  {
    number: "99%",
    title: "Satisfaction Rate",
  },
  {
    number: "24/7",
    title: "Customer Support",
  },
];

export const hotDealsStates = [
  {
    icon: <Zap size={40} color="#D08700" />,
    title: "Lightning Deals",
    desc: "Flash sales with limited time offers",
    borderColor: "#fff085",
  },
  {
    icon: <Star size={40} color="#9810FA" />,
    title: "Premium Quality",
    desc: "Top-rated products with best reviews",
    borderColor: "#e9d4ff",
  },
  {
    icon: <HeartIcon size={40} color="#E60076" />,
    title: "Customer Favorites",
    desc: "Most loved items by our customers",
    borderColor: "#fccee8",
  },
  {
    icon: <Clock2 size={40} color="#E7000B" />,
    title: "Limited Time",
    desc: "Hurry! These deals won't last long",
    borderColor: "#ffc9c9",
  },
];

export const singleProductService = [
  {
    icon: <Shield className="text-shop-orange" size={35} />,
    title: "Secure Payment",
    desc: "100% secure payment with SSL encryption",
  },
  {
    icon: <Truck className="text-shop-orange" size={35} />,
    title: "Fast Delivery",
    desc: "Free shipping on orders over $50",
  },
  {
    icon: <RefreshCcw className="text-shop-orange" size={35} />,
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
  },
];

export const priceList = [
  {
    title: "Under $100",
    value: "0-100",
  },
  {
    title: "$100 - $200",
    value: "100-200",
  },
  {
    title: "$200 - $300",
    value: "200-300",
  },
  {
    title: "$300 - $500",
    value: "300-500",
  },
  {
    title: "Over $500",
    value: "500-5000",
  },
];

export const addressTypes = [
  { title: "Home", value: "home" },
  { title: "Office", value: "office" },
  { title: "Other", value: "other" },
];
