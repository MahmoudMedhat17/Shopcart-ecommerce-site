"use client";
import { useState } from "react";
import Sidebar from "@/src/components/Sidebar";
import { AlignLeft } from "lucide-react";


const Mobilemenu = () => {

  // Open state of the sidebar if it's open or not.
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handelOpenSideBar = () => {
    setSideBarOpen((prev) => !prev);
  };


  const handelCloseSideBar = () => {
    setSideBarOpen(false);
  };

  return (
    <>
      <AlignLeft onClick={handelOpenSideBar} className="w-5 h-5 hover:text-darkColor cursor-pointer md:hidden" />
      {/* We passing the sideBarOpen state and handleCloseSideBar as props to Sidebar component so we can control the sidebar there. */}
      <div className="md:hidden">
        <Sidebar isOpen={sideBarOpen} onSideBarClose={handelCloseSideBar} />
      </div>
    </>
  )
}

export default Mobilemenu;