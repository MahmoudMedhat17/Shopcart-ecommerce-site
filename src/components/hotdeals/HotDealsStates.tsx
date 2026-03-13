import { hotDealsStates } from "@/src/constants/data";

const HotDealsStates = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
      {hotDealsStates.map((data) => (
        <div key={data.title} className="group">
          <div
            style={{ borderColor: data.borderColor }}
            className={`flex flex-col justify-center items-center space-y-4 border-3 border-(--hotDealsStatesBorderColor) p-8 rounded-lg group-hover:shadow-xl hoverEffect`}
          >
            <p>{data.icon}</p>
            <p className="text-darkColor font-semibold text-lg text-center">
              {data.title}
            </p>
            <p className="text-center max-w-60 text-shopLightText">{data.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotDealsStates;
