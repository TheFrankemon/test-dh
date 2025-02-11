export const ducklingColors = ['Rojo', 'Verde', 'Amarillo', 'Negro'] as const;
type DucklingColor = typeof ducklingColors[number];

export const ducklingSizes = ['XLarge', 'Large', 'Medium', 'Small', 'XSmall'] as const;
type DucklingSize = typeof ducklingSizes[number];

export type Duckling = {
  _id?: string;
  color: DucklingColor;
  size: DucklingSize;
  price: number;
  quantity: number;
  isDeleted?: boolean;
};
