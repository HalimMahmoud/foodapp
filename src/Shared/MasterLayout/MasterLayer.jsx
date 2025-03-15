import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import SideBar from "../SideBar/SideBar";
import { useLoginData } from "../../Hooks/useLoginData";

// eslint-disable-next-line react/prop-types
export default function MasterLayer() {
  const { loginData, removeLoginData } = useLoginData();

  return (
    <div className="d-flex">
      <div className="">
        <SideBar removeLoginData={removeLoginData} />
      </div>
      <div className="w-100 m-2">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
