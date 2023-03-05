import { useEffect, useState } from "react";
import { volunteerRoot } from "../../routes/routes";
import ManagePage from "../templates/ManagePage";
import { volunteerDto } from "../../dto/volunteer.dto";
import axios from "axios";

export default function ManageVolunteers() {
  const [volunteers,setVolunteers] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const keyofVolunteer = ["id","username","email","isAdmin"]


  useEffect(() => {
    axios.get(volunteerRoot, {
      method: "GET",
    })
      .then((response) => {
        setVolunteers(response.data);
        setSearchResult(response.data);
      });
  }, []);

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
  const handleSubmit = (olddata: volunteerDto,newdata:volunteerDto) => {
    axios.put(volunteerRoot, newdata)
      .then((response) => {
        console.log(response);
      })
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