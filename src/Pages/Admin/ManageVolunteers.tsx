import {useEffect, useState} from "react";
import axios from "axios";
import routes from "../../routes/routes";
import ManagePage from "../templates/ManagePage";
import {volunteerDto} from "../../dto/volunteer.dto";


export default function ManageVolunteers() {
  const [volunteers,setVolunteers] = useState([])
  const [searchResult, setSearchResult] = useState([])


  useEffect(() => {
    axios.get(routes.volunteerRoot).then((response) => {
      setVolunteers(response.data)
      setSearchResult(response.data)
    })
  },[])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const result = volunteers.filter((entity : volunteerDto) => {
      return (
        entity.username.toLowerCase().includes(search.toLowerCase()) ||
        entity.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResult(result);
  }

  return (
    <div>
      <ManagePage searchResult={searchResult} handleSearch={handleSearch}/>
    </div>
  )
}