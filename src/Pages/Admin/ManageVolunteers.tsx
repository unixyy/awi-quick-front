import { useEffect, useState } from "react";
import { volunteerByUUID, volunteerRoot } from "../../routes/routes";
import ManagePage from "../templates/ManagePage";
import { VolunteerDto } from "../../dto/volunteer.dto";
import axios from "axios";

interface Volunteer extends VolunteerDto {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}
export default function ManageVolunteers() {
  const [updated, setUpdated] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const keyofVolunteer = [
    "id",
    "username",
    "firstName",
    "lastName",
    "email",
    "isAdmin",
  ];

  useEffect(() => {
    axios.get(volunteerRoot).then((response) => {
      setVolunteers(response.data);
      setSearchResult(response.data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    const result = volunteers.filter((entity: VolunteerDto) => {
      return (
        entity.username.toLowerCase().includes(search.toLowerCase()) ||
        entity.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchResult(result);
  };

  // TODO : Fix this
  const handleSubmit = (oldData: Volunteer, newData: Volunteer) => {
    const sentData: any = { ...newData };
    delete sentData.id;

    if (oldData.email === newData.email) delete sentData.email;
    if (oldData.username === newData.username) delete sentData.username;
    if (oldData.isAdmin === newData.isAdmin) delete sentData.isAdmin;
    if (oldData.firstName === newData.firstName) delete sentData.firstName;
    if (oldData.lastName === newData.lastName) delete sentData.lastName;

    axios.put(volunteerByUUID(oldData.id), sentData).then((response) => {});

    setUpdated(!updated);
  };

  return (
    <>
      <div className="flex ml-10 md:ml-20 mb-6 md:mb-10 maroon-palet font-bold text-6xl mr-auto">
        Manage Volunteers
      </div>
      <ManagePage
        searchResult={searchResult}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        names={keyofVolunteer}
      />
    </>
  );
}
