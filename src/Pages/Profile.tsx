import { useEffect, useState } from "react";
import axios from "axios";
import { volunteerByUUID } from "../routes/routes";
import { getSub } from "../Middlewares/auth";
import Editor from "./templates/Editor";
import Cookies from "js-cookie";

interface Volunteer {
  uuid: string;
  username: string;
  email: string;
  isAdmin: boolean;
}
export default function Profile() {
  const [volunteer, setVolunteer] = useState({});
  const keysOfVolunteers = ["uuid", "username", "email", "isAdmin"];
  const [loaded, setLoaded] = useState(false);

  const handleSubmit = (oldData: Volunteer, newData: Volunteer) => {
    // tu peux aussi faire const {id, username, email, ...rest} = newData
    // et réutiliser rest dans ton axios.put
    const sentData: any = { ...newData };
    delete sentData.id;
    if (oldData.username !== newData.username) {
      alert("You cannot change your username");
      return;
    } else delete sentData.username;
    oldData.email == newData.email && delete sentData.email;

    axios.put(volunteerByUUID(getSub()), sentData).then((response) => {
      console.log(response);
      Cookies.set("token", response.data.token);
    });
  };

  useEffect(() => {
    axios.get(volunteerByUUID(getSub())).then((response) => {
      setVolunteer(response.data);
      setLoaded(true);
    });
  }, []);

  return (
    <div>
      <div className="flex text-5xl flex-nowrap font-bold ml-20 my-5 justify-start maroon-palet">
        Profile
      </div>
      {loaded ? (
        <Editor
          data={volunteer}
          id={getSub()}
          names={keysOfVolunteers}
          onSubmit={handleSubmit}
          type={typeof volunteer}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
