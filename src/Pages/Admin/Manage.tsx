import {Outlet} from "react-router-dom";

export default function Manage() {

  return (
    <div className={"py-2 lg:p-6 rounded-lg flex flex-col align-center"}>
      <Outlet/>
    </div>
  );
}