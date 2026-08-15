import { Title, SubText } from "@/src/components/Text";
import { FAQS } from "@/src/constants/data";

const FAQ = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-20 space-y-4">
        <Title className="text-center text-2xl md:text-3xl text-shop-dark-green">
          {" "}
          Frequently Asked Questions
        </Title>
        <SubText className="text-shopLightText text-center text-sm md:text-lg px-10 sm:max-w-lg md:max-w-xl">
          Find quick answers to common questions about our services and
          policies.
        </SubText>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-20">
        {FAQS.map((faq, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-md">
            <Title className="text-lg text-shop-dark-green">{faq.ques}</Title>
            <SubText className="text-shopLightText text-start text-base pt-2 sm:max-w-lg">
              {faq.ans}
            </SubText>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
