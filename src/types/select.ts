import { UUID } from ".";

export type Type = "FreeLetter" | "SlateSlot";
export type TargetType = "SlateSlot" | "FreeLetter" | "FreeSpace";

export interface Selection {
  type: Type;
  id: UUID.UUID;
}

export const selection = (type: Type, id: UUID.UUID) => ({ type, id });

export interface Target {
  type: TargetType;
  id: UUID.UUID;
}

export const target = (type: TargetType, id: UUID.UUID): Target => ({
  type,
  id
});
