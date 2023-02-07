export interface GameDto {
  id: string;
  name: string;
  type: string;
}

export interface GameWithZoneDto extends GameDto {
  zoneId: number;
  zoneNumber: number;
}