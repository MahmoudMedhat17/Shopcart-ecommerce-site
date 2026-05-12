import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Address, USERADDRESS_QUERY_RESULT } from "@/sanity.types";
import AddressFields, {
  AddressSchema,
} from "@/src/components/cart/AddressFields";
import createNewAddress from "@/src/actions/createNewAddress";
import { MapPin } from "lucide-react";
import zustandStore from "@/src/store/zustandStore";

const AddAddress = ({
  isOpen,
  handlePanelClick,
  address,
  setAddress,
  setIsOpen,
}: {
  isOpen: boolean;
  handlePanelClick: () => void;
  address: USERADDRESS_QUERY_RESULT | null;
  setAddress: React.Dispatch<
    React.SetStateAction<USERADDRESS_QUERY_RESULT | null>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setSelectedAddress } = zustandStore();

  const handleNewAddress = async (data: AddressSchema) => {
    try {
      // Here we create a new address in sanity when the user wants to create a new address.
      // const newAddressDoc = {
      //   ...data,
      //   _type: "address",
      // };
      // const newAddress = await client.create(newAddressDoc);

      const response = await createNewAddress(data);

      if (!response?.success || !response.data) {
        throw new Error("Failed to create a new address!");
      }

      const newAddress = response.data;

      // Here we update the default address to false if the user wants to make the new address as default and if not then we don't update anything.
      const updateDefaultAddress = data.default
        ? (address?.map((addr) => ({ ...addr, default: false })) ?? [])
        : (address ?? []);

      // Here we add the new address to the list of addresses.
      const newAddressWithUpdatedDefault = [
        newAddress,
        ...updateDefaultAddress,
      ] as USERADDRESS_QUERY_RESULT;

      // Here we set the new address to the list of addresses.
      setAddress(newAddressWithUpdatedDefault);

      // here we close the modal when the new address is submitted.
      setIsOpen(false);

      // here we set the new address as the selected address.
      setSelectedAddress(newAddress as Address);
    } catch (error) {
      console.log("Failed to add new address!", error);
    }
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={handlePanelClick}>
        <SheetContent side="right" showCloseButton={false}>
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <MapPin size={20} /> Add Shipping Address
            </SheetTitle>
            <SheetDescription className="tracking-wider">
              Add a new shipping address to your account.
            </SheetDescription>
          </SheetHeader>

          <AddressFields
            onSubmitHandler={handleNewAddress}
            handlePanelClick={handlePanelClick}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddAddress;
