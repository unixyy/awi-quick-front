import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gameById, whenToPlayGame } from "../routes/routes";
import { GameDto, GamePlayroomDto } from "../dto/games.dto";
import axios from "axios";

const defaultGame: GameDto = {
  id: "",
  name: "",
  type: "",
};

export default function Game() {
  const params = useParams();
  const [game, setGame] = useState<GameDto>(defaultGame);
  const [playingRooms, setRooms] = useState<GamePlayroomDto>({});

  useEffect(() => {
    axios
      .get(gameById(params.gameId!))
      .then((response) => setGame(response.data));
    axios
      .get(whenToPlayGame(params.gameId!))
      .then((response) => setRooms(response.data));
  }, [params.gameId]);

  return (
    <>
      <div className="maroon-palet font-bold text-6xl mr-auto">
        Games - {game.name}
      </div>
      <div>
        <div className="font-bold text-2xl">For {game.type}</div>
      </div>
      {game.description && (
        <div>
          <div className="font-bold">Description</div>
          <div>{game.description}</div>
        </div>
      )}
      <div className="mt-10 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
          <div className="grid grid-cols-3 gap-4 w-full col-span-3 border-b-2 pb-4">
            <div className="font-bold">Weekday</div>
            <div className="font-bold">Room</div>
            <div className="font-bold">Timeslot</div>
          </div>
          {Object.entries(playingRooms).map(([weekday, rooms]) => (
            <div
              key={weekday}
              className="grid grid-cols-3 gap-4 w-full col-span-6 border-dashed border-b-2 pb-4"
            >
              <div className="flex items-center justify-center">{weekday}</div>
              <div className="col-span-2">
                {Object.entries(rooms).map(([roomName, interval]) => (
                  <div
                    key={roomName}
                    className="grid grid-cols-2 gap-4 w-full pb-4"
                  >
                    <div className="flex items-center justify-center">
                      {roomName}
                    </div>
                    <div className="max-w-max">
                      {interval.map((time) => {
                        const start = new Date(time.start);
                        const end = new Date(time.end);
                        return (
                          <div
                            key={start.toISOString() + end.toISOString()}
                            className="flex items-center max-w-max justify-center"
                          >
                            {start.toLocaleTimeString() +
                              " - " +
                              end.toLocaleTimeString()}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
