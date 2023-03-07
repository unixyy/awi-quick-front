import { TableData } from "../Components/ContentView";

export interface GameDto extends TableData {
  id: string;
  name: string;
  type: string;
  zones?: string[];
  image?: string;
  description?: string;
}

export interface GameTypeDto {
  value: string;
  name: string;
}

export type GamePlayroomDto = {
  [weekday: string]: {
    [room: string]: {
      start: Date;
      end: Date;
    }[];
  };
}
