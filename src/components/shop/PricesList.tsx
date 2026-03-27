import { Title } from "@/src/components/Text";
import { Dispatch, SetStateAction } from "react";
import { priceList } from "@/src/constants/data";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";

interface PriceListProps {
  selectedPrice: string | null;
  setSelectedPrice: Dispatch<SetStateAction<string | null>>;
}

const PricesList = ({ selectedPrice, setSelectedPrice }: PriceListProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Title className="text-base text-darkColor">Price</Title>
        <p className="w-6 h-6 bg-shopLighterBg text-shop-dark-green rounded-full text-sm flex items-center justify-center">
          {priceList.length}
        </p>
      </div>

      <RadioGroup
        value={selectedPrice || ""}
        onValueChange={(e) => setSelectedPrice(e)}
      >
        {priceList.map((price) => (
          <div key={price.value} className="group cursor-pointer ">
            <div className="flex items-center gap-3 group-hover:bg-shopLighterBg group-hover:text-shop-dark-green hoverEffect p-1">
              <RadioGroupItem value={`${price.value}`} id={`${price.value}`} />
              <Label
                htmlFor={`${price.value}`}
                className={`${price.value === selectedPrice ? "text-shop-dark-green font-semibold" : "font-normal"}`}
              >
                {price.title}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <button
          className="text-sm text-left underline text-darkColor hover:text-shop-dark-green hoverEffect mt-4"
          onClick={() => setSelectedPrice(null)}
        >
          Clear Category Filteration
        </button>
      )}
    </div>
  );
};

export default PricesList;
