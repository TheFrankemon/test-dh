import axios from 'axios';
import { useState } from 'react';
import { apiEndpoint, defaultDuckling } from '../constants/constants';
import { Duckling, ducklingColors, ducklingSizes } from '../models/Duckling';

function NewDucklingForm() {
  const [newDuckling, setNewDuckling] = useState<Duckling>(defaultDuckling);

  const addDuckling = async () => {
    await axios.post(`${apiEndpoint}`, newDuckling);
    setNewDuckling(defaultDuckling);
    // setNewDucklingForm(false);
  };

  return (
    <div className="new-duckling-form">
      <div className="label-wrapper">
        <label>Color</label>
        <select
          value={newDuckling?.color}
          onChange={(e) => setNewDuckling(prev => ({ ...prev, color: e.target.value } as Duckling))}
        >
          <option value="">Selecciona un color</option>
          {ducklingColors.map((el, i) => (
            <option key={i} value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className="label-wrapper">
        <label>Tamaño</label>
        <select
          value={newDuckling?.size}
          onChange={(e) => setNewDuckling(prev => ({ ...prev, size: e.target.value } as Duckling))}
        >
          <option value="">Selecciona un tamaño</option>
          {ducklingSizes.map((el, i) => (
            <option key={i} value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className="label-wrapper">
        <label>Cantidad</label>
        <input
          type="number" 
          value={newDuckling?.quantity} 
          onChange={(e) => setNewDuckling(prev => ({ ...prev, quantity: Number(e.target.value)} as Duckling))} 
          placeholder="Cantidad de patitos" 
        />
      </div>
      <div className="label-wrapper">
        <label>Precio</label>
        <input
          type="number" 
          value={newDuckling?.price} 
          onChange={(e) => setNewDuckling(prev => ({ ...prev, price: Number(e.target.value) }))} 
          placeholder="Precio" 
        />
      </div>
      <button onClick={addDuckling}>Añadir</button>
    </div>
  );
}

export default NewDucklingForm;