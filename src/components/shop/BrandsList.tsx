import { BRANDS_QUERYResult } from "@/sanity.types";
import { Title } from "@/src/components/Text";
import { Dispatch, SetStateAction } from "react";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";

interface BrandListProps {
  brands: BRANDS_QUERYResult;
  selectedBrand: string | null;
  setSelectedBrand: Dispatch<SetStateAction<string | null>>;
}

const BrandsList = ({
  brands,
  selectedBrand,
  setSelectedBrand,
}: BrandListProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-4">
        <Title className="text-base text-darkColor">Brands</Title>
        <p className="w-6 h-6 bg-shopLighterBg text-shop-dark-green rounded-full text-sm flex items-center justify-center">
          {brands.length}
        </p>
      </div>

      <RadioGroup
        value={selectedBrand || ""}
        onValueChange={(e) => setSelectedBrand(e)}
      >
        {brands.map((brand) => (
          <div key={brand._id} className="group cursor-pointer">
            <div className="flex items-center gap-3 group-hover:bg-shopLighterBg group-hover:text-shop-dark-green hoverEffect p-1">
              <RadioGroupItem
                value={`${brand.slug?.current}`}
                id={`${brand.slug?.current}`}
              />
              <Label
                htmlFor={`${brand.slug?.current}`}
                className={`${brand.slug?.current === selectedBrand ? "text-shop-dark-green font-semibold" : "font-normal"}`}
              >
                {brand.string}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
      {/* Here if the user filtered the data by Brand then show a button related to Brand filteration that clear the Brand filteration */}
      {selectedBrand && (
        <button
          className="text-sm text-left underline text-darkColor hover:text-shop-dark-green hoverEffect mt-4"
          onClick={() => setSelectedBrand(null)}
        >
          Clear Brand Filteration
        </button>
      )}
    </div>
  );
};

export default BrandsList;
