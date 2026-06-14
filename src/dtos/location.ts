export interface Room {
  id: string;
  houseId: string;
  name: string;
  floor?: string;
}

export interface House {
  id: string;
  name: string;
  timezone?: string;
  rooms?: Room[];
}
