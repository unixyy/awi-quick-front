import { TimeslotDto } from "./timeslot.dto";

export interface AssignmentDto {
  volunteer_id: string;
  timeslot_id: number;
  table_id: number;
}

export interface AssignmentByZoneDto {
  id: number;
  name: string;
  volunteer_assignments: TimeslotDto[]
  zone: {id: number, name: string}
}