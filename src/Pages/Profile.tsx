import React, {useEffect, useState} from "react";
import {volunteerDto} from "../dto/volunteer.dto";
import axios from "axios";
import {volunteerByUUID} from "../routes/routes";
import {getSub} from "../Middlewares/auth";
import Editor from "./templates/Editor";
import Cookies from "js-cookie";


interface volunteer {
  uuid: string;
  username: string;
  email: string;
  isAdmin: boolean;

}
export default function Profile() {
  const [volunteer, setVolunteer] = useState({});
  const keysOfVolunteers = ["uuid", "username","email","isAdmin"]
  const [loaded, setLoaded] = useState(false);


  const handleSubmit = (olddata:volunteer,newdata: volunteer) => {
    const sentData : any = {...newdata};
    delete sentData.id;
    if (olddata.username !== newdata.username) {
      console.log(olddata.username, newdata.username)
      alert("You cannot change your username");
      return;
    }else{
      delete sentData.username;
    }
    if (olddata.email == newdata.email) {
      delete sentData.email;
    }

    console.log(sentData)

    axios.put(volunteerByUUID(getSub()), sentData)
      .then((response) => {
        console.log(response);
        Cookies.set("token", response.data.token)
      })
  }

  useEffect(() => {
    axios.get(volunteerByUUID(getSub()))
      .then((response) => {
        setVolunteer(response.data);
        setLoaded(true);
      }
    );
  }, []);

  return (
    <div>
      <div className="flex text-5xl flex-nowrap font-bold ml-20 my-5 justify-start maroon-palet">
        Profile
      </div>
      {loaded ? <Editor  data={volunteer} id={getSub()} names={keysOfVolunteers} onSubmit={handleSubmit} type={typeof volunteer}/> : <div>Loading...</div>  }

    </div>
  )
}