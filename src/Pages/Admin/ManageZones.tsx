import { useEffect, useState } from "react";
import { zoneRoot } from "../../routes/routes";

export default function ManageZones() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    fetch(zoneRoot)
      .then((response) => response.json())
      .then((response) => setZones(response.data));
  }, []);
  return (
    <div>
      <h1>Management Zones</h1>
    </div>
  );
}
