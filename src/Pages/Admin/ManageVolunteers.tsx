import { useEffect, useState } from "react";
import {volunteerByUUID, volunteerRoot} from "../../routes/routes";
import ManagePage from "../templates/ManagePage";
import { volunteerDto } from "../../dto/volunteer.dto";
import axios from "axios";

interface volunteer extends volunteerDto {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;

}
export default function ManageVolunteers() {
  const [updated,setUpdated] = useState(false)
  const [volunteers,setVolunteers] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const keyofVolunteer = ["id","username","firstName","lastName","email","isAdmin"]


  useEffect(() => {
    axios.get(volunteerRoot, {
      method: "GET",
    })
      .then((response) => {
        setVolunteers(response.data);
        setSearchResult(response.data);
      });
  }, [updated]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const result = volunteers.filter((entity: volunteerDto) => {
      return (
        entity.username.toLowerCase().includes(search.toLowerCase()) ||
        entity.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResult(result);
  };

  // TODO : Fix this
  const handleSubmit = (olddata: volunteer,newdata:volunteer) => {
    const sentData : any = {...newdata}
    delete sentData.id
    if(olddata.email === newdata.email) {
      delete sentData.email
    }
    if(olddata.username === newdata.username) {
      delete sentData.username
    }
    if(olddata.isAdmin === newdata.isAdmin) {
      delete sentData.isAdmin
    }
    if (olddata.firstName === newdata.firstName) {
      delete sentData.firstName
    }
    if (olddata.lastName === newdata.lastName) {
      delete sentData.lastName
    }


    axios.put(volunteerByUUID(olddata.id), sentData)
      .then((response) => {
      })

    setUpdated(!updated)

  }

  return (
    <>
      <div className="flex ml-10 md:ml-20 mb-6 md:mb-10 maroon-palet font-bold text-6xl mr-auto" >Manage Volunteers</div>
      <ManagePage searchResult={searchResult}
                  handleSearch={handleSearch}
                  handleSubmit={handleSubmit}
                  names={keyofVolunteer}/>
    </>
  )
}