const ducklingColors = ['Rojo', 'Verde', 'Amarillo', 'Negro'] as const;
type DucklingColor = typeof ducklingColors[number];

const ducklingSizes = ['XLarge', 'Large', 'Medium', 'Small', 'XSmall'] as const;
type DucklingSize = typeof ducklingSizes[number];

export type Duckling = {
  id: string;
  color: DucklingColor;
  size: DucklingSize;
  price: number;
  quantity: number;
  isDeleted?: boolean;
};
