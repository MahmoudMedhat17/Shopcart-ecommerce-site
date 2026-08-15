import FormComponent from "@/src/components/contact/FormComponent";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const Form = () => {
  const phoneNumber = "01012107269";

  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 w-full py-14">
        {/* Contact Info */}
        <div className="lg:col-span-1 bg-white shadow-md py-6 px-4 rounded-md">
          <h3 className="text-shop-dark-green text-2xl font-semibold">
            Contact Information
          </h3>
          <div className="mt-4 space-y-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="bg-shop-light-bg p-2 rounded-md">
                <MapPin size={25} className="text-shop-dark-green" />
              </div>
              {/* Info */}
              <div>
                <h3 className="text-shop-dark-green font-bold">
                  Visit Our Store
                </h3>
                <p className="flex items-center gap-4 text-shopLightText text-sm group hover:text-shop-dark-green hoverEffect cursor-pointer">
                  District 12, Zayed city
                  <span className="hidden group-hover:block">
                    <ExternalLink size={10} />
                  </span>
                </p>
                <span className="text-xs text-shopLighterText">Giza, EG</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="bg-shop-light-bg p-2 rounded-md">
                <Phone size={25} className="text-shop-dark-green" />
              </div>
              {/* Info */}
              <div>
                <h3 className="text-shop-dark-green font-bold">Call Us</h3>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  className="flex items-center gap-4 text-shopLightText text-sm group hover:text-shop-dark-green hoverEffect cursor-pointer"
                >
                  +201012107269
                </a>
                <span className="text-xs text-shopLighterText">
                  Sunday - Thursday: 9AM - 5PM
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="bg-shop-light-bg p-2 rounded-md">
                <Mail size={25} className="text-shop-dark-green" />
              </div>
              {/* Info */}
              <div>
                <h3 className="text-shop-dark-green font-bold">Support</h3>
                <p className="flex items-center gap-4 text-shopLightText text-sm group hover:text-shop-dark-green hoverEffect cursor-pointer">
                  m7moooud.17@gmail.com
                </p>
                <span className="text-xs text-shopLighterText">
                  24/7 Support
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="bg-shop-light-bg p-2 rounded-md">
                <Clock size={25} className="text-shop-dark-green" />
              </div>
              {/* Info */}
              <div>
                <h3>Business Hours</h3>
                <p className="flex items-center gap-4 text-shopLightText text-sm group hover:text-shop-dark-green hoverEffect cursor-pointer">
                  Sunday - Thursday: 9AM - 5PM
                </p>
                <span className="text-xs text-shopLighterText">
                  Friday - Saturday: Closed
                </span>
              </div>
            </div>
          </div>
          <div className="bg-shop-light-pink p-4 rounded-md mt-2">
            <h3 className="flex items-center gap-2 text-shop-dark-green font-bold">
              <MessageCircle size={20} />
              Quick Response
            </h3>
            <p className="text-sm text-shopLighterText">
              We typically respond within 24 hours
            </p>
          </div>
        </div>
        {/* Send a msg */}
        <div className="lg:col-span-3">
          <FormComponent />
        </div>
      </div>
    </>
  );
};

export default Form;
