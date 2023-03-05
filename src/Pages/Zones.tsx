import React, { useEffect, useState } from "react";
import { ZoneDto } from "../dto/zones.dto";
import { zoneRoot } from "../routes/routes";
import DisplayPage from "./templates/DisplayPage";
import {Outlet, useNavigate} from "react-router-dom";

export default function Zones() {
  return (
    <>
      <Outlet />
    </>
  );
}
