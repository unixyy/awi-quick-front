import { TableData } from "../Components/ContentView";

export interface GameDto extends TableData {
  id: number;
  name: string;
  type: string;
  zones?: string[];
  image?: string;
  description?: string;
}
