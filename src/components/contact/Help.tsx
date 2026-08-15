import { Title, SubText } from "@/src/components/Text";

const Help = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-20 space-y-4 bg-linear-to-r from-shop-dark-green via-shop-dark-green to-shop-light-green">
        <p className="text-xs text-white font-semibold bg-shopLighterBg/40 hover:bg-shopLighterBg/70 px-2 py-0.5 rounded-sm hoverEffect border border-white">
          We&apos;re Here to Help
        </p>
        <Title className="text-4xl md:text-6xl text-white">Contact Us</Title>
        <SubText className="text-shopLighterBg text-center text-sm md:text-lg px-10 sm:max-w-lg md:max-w-xl">
          Have questions about our products or need assistance? We&apos;d love
          to hear from you. Our team is here to help with any inquiries you may
          have.
        </SubText>
      </div>
    </>
  );
};

export default Help;
