export interface TableDto {
  id: number;
  number: number;
}

export interface RoomDto {
  id: number;
  name: string;
  tables: TableDto[];
};

export interface ZoneDto {
  id: number;
  name: string;
  rooms: RoomDto[];
  src?: string;
  description?: string;
}