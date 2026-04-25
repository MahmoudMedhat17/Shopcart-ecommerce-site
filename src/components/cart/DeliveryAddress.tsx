"use client";

import { useState, useEffect } from "react";
import { Address, USERADDRESS_QUERY_RESULT } from "@/sanity.types";
import { MapPin, Plus } from "lucide-react";
import { client } from "@/src/sanity/lib/client";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import AddAddress from "@/src/components/cart/AddAddress";

const DeliveryAddress = () => {
  const [loading, setLoading] = useState(false);
  // Here we set 2 states one is to store the data coming from sanity inside it "address"
  const [address, setAddress] = useState<USERADDRESS_QUERY_RESULT | null>(null);
  // And the other is to store the address that the user selects from the list of addresses "selectedAddress"
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  // To handle the opening and closing of the add address modal
  const [isOpen, setIsOpen] = useState(false);

  const handlePanelClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchAddresseData = async () => {
      setLoading(true);
      try {
        // Query to fetch the data from sanity.
        const addressQuery = `*[_type == "address"] | order(_createdAt asc)`;
        const data = await client.fetch(addressQuery);
        // Here we store the data coming from sanity inside the first state "setAddress".
        setAddress(data);
        // Here we set this variable to find the default address we set inside the sanity studio.
        // Can do a better approach here with less lines of code!! tomorrow.
        const defaultAddress =
          data.find((address: Address) => address.default) ?? data[0] ?? null;
        setSelectedAddress(defaultAddress);
        // If the defaultAddress exists then set the selectedAddress to this default address "The user didn't choose the address so it's set to the default one".
        // if (defaultAddress) {
        //   setSelectedAddress(defaultAddress);
        // }
        // If there's multiple address and none is marked as default then set the address as the user selects.
        // else if (data.length > 0) {
        //   setSelectedAddress(data[0]);
        // }
        // If no address is found at all then set the selectedAddress to null.
        // else {
        //   setSelectedAddress(null);
        // }
      } catch (error) {
        console.log("Failed to fetch the addresse data!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresseData();
  }, [selectedAddress]);

  return (
    <div>
      <p className="text-shopLighterText">Add a shipping address to continue</p>
      <div className="flex flex-col items-center justify-center pt-10 space-y-4">
        <RadioGroup
          className="w-full"
          value={selectedAddress?._id}
          onValueChange={(value) => {
            const found =
              address?.find((address) => address._id === value) || null;
            setSelectedAddress(found);
          }}
        >
          {address?.map((address) => (
            <div key={address._id} className="flex items-start gap-3">
              <RadioGroupItem
                value={address._id}
                id={address._id}
                className={`${address === selectedAddress && "text-shop-dark-green mt-1"}`}
              />
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor={address._id}
                    className={`capitalize ${address === selectedAddress && "text-shop-dark-green font-semibold text-lg"}`}
                  >
                    {address.type}
                  </Label>
                  {address.default && (
                    <p className="text-xs text-blue-600 bg-blue-600/20 px-2 py-0.5 rounded-sm">
                      Default
                    </p>
                  )}
                </div>
                <p className="text-shopLighterText text-sm">
                  {address.address}
                </p>
                <p className="text-shopLighterText text-sm">{address.city}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
        {/* <MapPin size={50} className="text-shopLighterText" /> */}
        {/* <p className="text-shopLighterText text-xl">No saved addresses yet</p> */}
        <button
          onClick={handlePanelClick}
          className="flex items-center justify-center gap-2 bg-darkColor text-white py-2 px-4 rounded-lg w-full"
        >
          <Plus size={18} />
          Add Address
        </button>

        <AddAddress isOpen={isOpen} handlePanelClick={handlePanelClick} />
      </div>
    </div>
  );
};

export default DeliveryAddress;
