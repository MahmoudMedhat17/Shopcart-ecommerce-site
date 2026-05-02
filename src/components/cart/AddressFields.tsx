import {
  useForm,
  SubmitHandler,
  useController,
  Controller,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { addressTypes } from "@/src/constants/data";
import { Check, X } from "lucide-react";
import ReactSelect from "react-select";
import countries from "world-countries";
import InputField from "@/src/components/InputField";

export type AddressSchema = {
  fullName: string;
  emailAddress: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  streetAddress: string;
  country: string;
  countryCode: string;
  addressType: string;
  default?: boolean;
};

const countryOptions = countries.map((country) => ({
  value: country.flag,
  label: country.name.common,
}));

const formatOptionLabel = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => (
  <div className="flex gap-2">
    <span className="text-gray-400 text-sm">{value}</span>
    <span>{label}</span>
  </div>
);

const AddressFields = ({
  onSubmitHandler,
  handlePanelClick,
}: {
  onSubmitHandler: (data: AddressSchema) => void | Promise<void>;
  handlePanelClick: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddressSchema>({
    defaultValues: {
      fullName: "",
      emailAddress: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      streetAddress: "",
      country: "",
      addressType: "",
      default: false,
    },
  });

  const { field: countryField } = useController({
    name: "country",
    control,
    rules: { required: "Country is required" },
  });

  const onSubmitHandlerFunction: SubmitHandler<AddressSchema> = async (
    data,
  ) => {
    console.log("FORM DATA PAYLOAD:", data);
    await onSubmitHandler(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandlerFunction)}
      className="overflow-y-auto"
    >
      <div className="flex flex-col gap-4 p-4">
        <InputField
          id="fullName"
          label="Full Name*"
          placeholder="e.g. John Doe"
          register={register}
          rules={{ required: "Full name is required" }}
          error={errors.fullName}
        />
        <InputField
          id="emailAddress"
          label="Email Address*"
          placeholder="e.g. [EMAIL_ADDRESS]"
          register={register}
          rules={{ required: "Email address is required" }}
          error={errors.emailAddress}
        />
        <InputField
          id="phone"
          label="Phone Number*"
          placeholder="e.g. (Country Code) 123-456-789"
          register={register}
          rules={{ required: "Phone number is required" }}
          error={errors.phone}
        />
        <InputField
          id="address"
          label="Address*"
          placeholder="e.g. Home, Office, Street Name, etc.."
          register={register}
          rules={{ required: "Address name is required" }}
          error={errors.address}
        />
        <InputField
          id="city"
          label="City*"
          placeholder="Enter your city"
          register={register}
          rules={{ required: "City name is required" }}
          error={errors.city}
        />
        <InputField
          id="state"
          label="State*"
          placeholder="Enter your state"
          register={register}
          rules={{ required: "State name is required" }}
          error={errors.state}
        />
        <InputField
          id="zipCode"
          label="Zip Code*"
          placeholder="Enter your zip code"
          register={register}
          rules={{ required: "Zip code is required" }}
          error={errors.zipCode}
        />
        <div className="flex flex-col gap-2">
          <Label htmlFor="country" className="font-semibold">
            Country*
          </Label>
          <ReactSelect
            options={countryOptions}
            formatOptionLabel={formatOptionLabel}
            placeholder="Search Your country..."
            onChange={(selected) => countryField.onChange(selected?.value)}
            onBlur={countryField.onBlur}
            value={
              countryField.value
                ? countryOptions.find(
                    (country) => country.value === countryField.value,
                  )
                : null
            }
            classNames={{
              control: (state) =>
                `border rounded-md ${
                  state.isFocused
                    ? "!border-shop-dark-green !ring-1 !ring-shop-dark-green shadow-none"
                    : "!border-gray-300"
                }`,
            }}
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>
        <InputField
          id="countryCode"
          label="Country Code*"
          placeholder="Enter your country code"
          register={register}
          rules={{ required: "Country code is required" }}
          error={errors.countryCode}
        />
        <div className="flex flex-col gap-2">
          <Label htmlFor="AddressType" className="font-semibold">
            Address Type*
          </Label>
          <Controller
            name="addressType"
            control={control}
            rules={{ required: "Address type is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
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
            )}
          />
          {errors.addressType && (
            <p className="text-red-500 text-sm">{errors.addressType.message}</p>
          )}
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
          <Controller
            name="default"
            control={control}
            render={({ field }) => (
              <Switch
                id="Set as Default Address"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="w-full flex items-center justify-center gap-2 bg-darkColor text-white py-1.5 rounded-md hoverEffect hover:bg-darkColor/80">
            <Check />
            Save Address
          </button>
          <button
            onClick={handlePanelClick}
            className="w-1/3 flex items-center justify-center gap-2 hoverEffect border py-1.5 rounded-md hover:bg-shopLighterBg/60 hoverEffect"
          >
            <X />
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressFields;
