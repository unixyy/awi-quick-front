import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function ManageMenu() {

  const [gamesImg, setGamesImg] = useState({
    title: "",
    src: "",
    alt: ""
  });

  const [zonesImg, setZonesImg] = useState({
    title: "",
    src: "",
    alt: ""
  });

  const [volunteersImg, setVolunteersImg] = useState({
    title: "",
    src: "",
    alt: ""
  });

  useEffect(() => {
    setGamesImg(
      {
        title: "Slide 1",
        src: "../front-bg/boardgame1.webp",
        alt: "Slide 1",
      })

    setZonesImg(
      {
        title: "Slide 2",
        src: "../front-bg/esplanade.webp",
        alt: "Slide 2",
      }
    )

      setVolunteersImg(
        {
          title: "Slide 3",
          src: "../front-bg/volunteer.webp",
          alt: "Slide 3",
        }
      )
  },[])



  return (
    <div className={"py-2 lg:p-6 rounded-lg flex flex-col align-center"}>
      <ul className="w-max cards grid grid-cols-1 align-center sm:grid-cols-2 md:grid-cols-3 ">
        <li className={`px-4 py-2 w-80 lg:w-96 align-middle`}>
          <Link to={"/manage/games"}>
            <img src={gamesImg.src} className={"rounded-lg h-80"} alt={gamesImg.alt} />
            <div className={""}>Games</div>
          </Link>
        </li>
        <li className={`px-4 py-2 w-80 lg:w-96 align-middle`}>
          <Link to={"/manage/zones"}>
            <img src={zonesImg.src} className={"rounded-lg h-80"} alt={zonesImg.alt} />
            <div className={""}>Zones</div>
          </Link>
        </li>
        <li className={`px-4 py-2 w-80 lg:w-96 align-middle`}>
          <Link to={"/manage/volunteers"}>
            <img src={volunteersImg.src} className={"rounded-lg h-80"} alt={volunteersImg.alt} />
            <div className={""}>Volunteers</div>
          </Link>
        </li>
        <li className={`px-4 py-2 w-80 lg:w-96 align-middle`}>
          <Link to={"/manage/AssignGame"}>
            <img src={gamesImg.src} className={"rounded-lg h-80"} alt={gamesImg.alt} />
            <div className={""}>Assign Game to a Zone</div>
          </Link>
        </li>
        <li className={`px-4 py-2 w-80 lg:w-96 align-middle`}>
          <Link to={"/manage/AssignVolunteer"}>
            <img src={volunteersImg.src} className={"rounded-lg h-80"} alt={volunteersImg.alt} />
            <div className={""}>Assign Volunteer to a Game</div>
          </Link>
        </li>
        <li className="px-4 py-2 w-80 lg:w-96 align-middle">
          <Link to="/manage/volunteers-assignments">
            <img src={volunteersImg.src} className={"rounded-lg h-80"} alt={volunteersImg.alt} />
            <div className={"text-black"}>Volunteer Assignments</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}