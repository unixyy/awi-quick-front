export interface TableDto {
  id: number;
  number: number;
}

export interface RoomDto {
  id: number;
  name: string;
  tables: TableDto[];
}

export interface RoomAssignmentDto {
  id: number;
  name: string;
  zone_id: number;
  tables: TableDto[];
  zone: {
    name: string;
  };
}

export interface ZoneDto {
  id: number;
  name: string;
  rooms: RoomDto[];
  src?: string;
  description?: string;
}
