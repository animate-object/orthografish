export interface Dimensions {
  width: number;
  height: number;
}

export const create = (width: number, height: number): Dimensions => ({
  width,
  height
});

export const square = (size: number): Dimensions => create(size, size);
