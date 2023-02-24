import {useEffect, useState} from "react";
import axios from "axios";
import routes from "../../routes/routes";

export default function ManageZones() {

  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios.get(routes.zoneRoot).then(function (response) {
      setZones(response.data);
      console.log(response.data);
    });
  },[])
  return (
    <div>
      <h1>Management Zones</h1>
    </div>
  )
}