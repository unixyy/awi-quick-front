import {Outlet} from "react-router-dom";

export default function Manage() {

  return (
    <div className={" rounded-lg flex flex-col align-center"}>
      <Outlet/>
    </div>
  );
}