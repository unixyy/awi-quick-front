import { TableData } from "../Components/Table";

export interface ZoneDto extends TableData {
  id: string;
  name: string;
  number: number;
  src: string;
}