import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  //   SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { client } from "@/src/sanity/lib/client";
import { MapPin } from "lucide-react";

type AddressSchema = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  countryCode: string;
  stateCode: string;
  subArea: string;
  type: string;
  default: boolean;
};

const AddAddress = ({
  isOpen,
  handlePanelClick,
}: {
  isOpen: boolean;
  handlePanelClick: () => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddressSchema>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      countryCode: "",
      stateCode: "",
      subArea: "",
      type: "",
      default: false,
    },
  });

  const onSubmit: SubmitHandler<AddressSchema> = async (data) => {
    try {
      //   Need to create a new address and check if the default address changes or not then it to the changed new address and then set that default address to be selected
    } catch (error) {
      console.log("Failed to add new address!", error);
    }
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={handlePanelClick}>
        <SheetContent side="right" showCloseButton={false}>
          <SheetHeader className="mb-5 border-b">
            <SheetTitle className="flex items-center gap-2">
              <MapPin size={16} /> Add Shipping Address
            </SheetTitle>
            <SheetDescription>
              Add a new shipping address to your account.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddAddress;
