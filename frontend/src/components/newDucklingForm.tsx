import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiEndpoint, defaultDuckling } from '../constants/constants';
import { Duckling, ducklingColors, ducklingSizes } from '../models/Duckling';

interface NewDucklingFormProps {
  editDuckling?: Duckling;
}

function NewDucklingForm({editDuckling}: NewDucklingFormProps) {
  const [newDuckling, setNewDuckling] = useState<Duckling>(defaultDuckling);
  const [isEdit, setIsEdit] = useState(!!editDuckling);

  const addDuckling = async () => {
    if (editDuckling) {
      await axios.put(`${apiEndpoint}/${editDuckling._id}`, newDuckling);
    } else {
      await axios.post(`${apiEndpoint}`, newDuckling);
    }
    setNewDuckling(defaultDuckling);
    setIsEdit(false);
  };

  useEffect(() => {
    if (editDuckling) {
      setNewDuckling(editDuckling);
      setIsEdit(true);
    }
  }, [editDuckling]);

  return (
    <div className="new-duckling-form">
      <div className="label-wrapper">
        <label>Color</label>
        <select
          value={newDuckling?.color}
          disabled={isEdit}
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
          disabled={isEdit}
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
      <button onClick={addDuckling}>{isEdit ? 'Actualizar' : 'Añadir'}</button>
    </div>
  );
}

export default NewDucklingForm;