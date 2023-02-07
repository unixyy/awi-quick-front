import React, { useState } from "react";

interface TableData {
  id: number;
  name: string;
  type: string;
  zone: string[];
}

const data: TableData[] = [
  {
    id: 1,
    name: "Game 1",
    type: "Boardgame",
    zone: ["Europe", "North America"],
  },
  { id: 2, name: "Game 2", type: "Video Game", zone: ["Asia"] },
  { id: 3, name: "Game 3", type: "Card Game", zone: ["Europe"] },
  {
    id: 4,
    name: "Game 4",
    type: "Boardgame",
    zone: ["North America", "South America"],
  },
  { id: 5, name: "Game 5", type: "Video Game", zone: ["Europe", "Asia"] },
  { id: 6, name: "Game 6", type: "Card Game", zone: ["Asia"] },
];

export default function GameSearchBar() {
  type Prop = "name" | "type" | "zone";
  const [searchOption, setSearchOption] = useState<Prop>("name");
  const [searchValue, setSearchValue] = useState("");
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value as Prop);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Searching for ${searchValue} by ${searchOption}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-emerald-800 p-6 rounded-lg flex flex-col items-center"
    >
      <div className="flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="p-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:shadow-outline flex-grow"
          placeholder={"Search for a game " + searchOption + "..."}
        />
      </div>
      <div className="ml-6 flex justify-items-stretch mt-3 mb-2">
        <label className="mr-2">
          <input
            type="radio"
            value="name"
            checked={searchOption === "name"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Name
        </label>
        <label className="mr-2">
          <input
            type="radio"
            value="type"
            checked={searchOption === "type"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Type
        </label>
        <label className="mr-2">
          <input
            type="radio"
            value="zone"
            checked={searchOption === "zone"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Zone
        </label>
      </div>
      <button
        type="submit"
        className="ml-4 p-2 rounded-lg text-gray-800 bg-white hover:bg-gray-300 focus:outline-none focus:shadow-outline"
      >
        Search
      </button>
    </form>
  );
}
