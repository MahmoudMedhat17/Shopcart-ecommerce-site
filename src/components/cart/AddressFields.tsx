import { useForm, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getData } from "country-list";
import { addressTypes } from "@/src/constants/data";
import { Check, X } from "lucide-react";

export type AddressSchema = {
  addressName: string;
  phone: string;
  addressType: string;
  streetAddress: string;
  country: string;
  default?: boolean;
};

const countries = getData().slice(0, 100);

// console.log(countries);

const AddressFields = ({
  onSubmitHandler,
}: {
  onSubmitHandler: (data: AddressSchema) => void | Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddressSchema>({
    defaultValues: {
      addressName: "",
      phone: "",
      addressType: "",
      streetAddress: "",
      country: "",
    },
  });

  const onSubmitHandlerFunction: SubmitHandler<AddressSchema> = async (
    data,
  ) => {
    onSubmitHandler(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandlerFunction)}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="addressName" className="font-semibold">
            Address Name*
          </Label>
          <input
            type="text"
            id="addressName"
            placeholder="e.g. Home, Office, Street Name, etc.."
            {...register("addressName", {
              required: "Address name is required",
            })}
            className="w-full p-2 rounded-md outline-none border border-gray-300 focus:border-darkColor duration-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="font-semibold">
            Phone Number*
          </Label>
          <input
            type="text"
            id="phone"
            placeholder="e.g. (Country Code) 123-456-789"
            {...register("phone", {
              required: "Phone number is required",
            })}
            className="w-full p-2 rounded-md outline-none border border-gray-300 focus:border-darkColor duration-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="addressType" className="font-semibold">
            Address Type*
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an Address Type" />
            </SelectTrigger>
            <SelectContent className="h-fit">
              <SelectGroup>
                {addressTypes.map(
                  (address: { title: string; value: string }) => (
                    <SelectItem key={address.title} value={address.value}>
                      {address.title}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="streetAddress" className="font-semibold">
            Street Address*
          </Label>
          <input
            type="text"
            id="streetAddress"
            placeholder="Enter your Street Address"
            {...register("streetAddress")}
            className="w-full p-2 rounded-md outline-none border border-gray-300 focus:border-darkColor duration-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="country" className="font-semibold">
            Country*
          </Label>

          {/* Need to decide here How to display the list of countries. */}
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Country" />
            </SelectTrigger>
            <SelectContent className="h-80">
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {countries.map((country: { code: string; name: string }) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4 space-x-2 p-4 border rounded-md">
          <div className="space-y-2">
            <Label htmlFor="Set as Default Address" className="font-semibold">
              Set as Default Address
            </Label>
            <p className="text-shopLighterText text-sm">
              This address will be used as your primary shipping address
            </p>
          </div>
          <Switch id="Set as Default Address" />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button className="w-full flex items-center justify-center gap-2 bg-darkColor text-white py-1.5 rounded-md hoverEffect hover:bg-darkColor/80">
            <Check />
            Save Address
          </button>
          <button className="w-1/3 flex items-center justify-center gap-2 hoverEffect border py-1.5 rounded-md hover:bg-shopLighterBg/60 hoverEffect">
            <X />
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressFields;
