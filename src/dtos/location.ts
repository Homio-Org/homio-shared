export interface Room {
  /** Room identifier. */
  id: string;
  /** House identifier that owns this room. */
  houseId: string;
  /** Human readable room name. */
  name: string;
  /** Optional floor index or label. */
  floor?: string;
}

export interface House {
  /** House identifier. */
  id: string;
  /** Human readable house name. */
  name: string;
  /** Optional timezone, for example: Europe/Kyiv. */
  timezone?: string;
  /** Optional list of rooms defined for the house. */
  rooms?: Room[];
}
