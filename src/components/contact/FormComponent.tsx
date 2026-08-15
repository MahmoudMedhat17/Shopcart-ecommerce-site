import { Send } from "lucide-react";

const FormComponent = () => {
  return (
    <>
      <div className="bg-white shadow-md py-6 px-4 rounded-md">
        <h3 className="text-shop-dark-green text-2xl font-semibold">
          Send us a Message
        </h3>

        <form action="#" method="POST" className="mt-4 space-y-4">
          <div className="flex items-center gap-4 ">
            <div className="flex flex-col w-full">
              <label
                htmlFor="fullName"
                className="text-shop-dark-green text-sm"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                required
                className="w-full p-2 rounded-md border focus:outline-none focus:border-shop-dark-green hoverEffect placeholder:text-sm"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-shop-dark-green text-sm">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
                className="w-full p-2 rounded-md border focus:outline-none focus:border-shop-dark-green hoverEffect placeholder:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="subject" className="text-shop-dark-green text-sm">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Brief description of your inquiry"
              required
              className="w-full p-2 rounded-md border focus:outline-none focus:border-shop-dark-green hoverEffect placeholder:text-sm"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="message" className="text-shop-dark-green text-sm">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Please provide detailed information about your inquiry..."
              required
              className="w-full p-2 rounded-md border focus:outline-none focus:border-shop-dark-green hoverEffect placeholder:text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center gap-4 bg-shop-dark-green text-white font-bold p-2.5 rounded-md hover:bg-shop-light-green hover:scale-105 hoverEffect"
          >
            <Send size={20} />
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default FormComponent;
