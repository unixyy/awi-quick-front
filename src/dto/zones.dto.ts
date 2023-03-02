export interface TableDto {
  id: number;
}

export interface RoomDto {
  id: string;
  name: string;
  tables: TableDto[];
};

export interface ZoneDto extends TableDto {
  id: number;
  name: string;
  rooms: RoomDto[];
  src?: string;
  description?: string;
}