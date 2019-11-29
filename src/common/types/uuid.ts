import uuid from "uuid";

export type UUID = string;

export const create = (): UUID => uuid.v4();
