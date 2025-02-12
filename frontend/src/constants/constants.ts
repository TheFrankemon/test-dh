import { Duckling } from '../models/Duckling';

export const apiEndpoint = 'http://localhost:4000/api/ducklings';

export const defaultDuckling: Duckling = {
  color: 'Rojo',
  size: 'XLarge',
  price: 0,
  quantity: 0
};
