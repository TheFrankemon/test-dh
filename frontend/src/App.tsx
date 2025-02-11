import { useEffect, useState } from 'react'
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css'
import { Duckling } from './models/Duckling';

const socket = io("http://localhost:4000");
const apiEndpoint = 'http://localhost:4000/api/ducklings';

const defaultDuckling: Duckling = {
  color: 'Rojo',
  size: 'XLarge',
  price: 0,
  quantity: 0
};

function App() {
  const [ducklings, setDucklings] = useState<Duckling[]>([{
    color: 'Rojo',
    size: 'XLarge',
    price: 200,
    quantity: 10000
  }]);
  const [newDuckling, setNewDuckling] = useState<Duckling>(defaultDuckling);
  const [newDucklingForm, setNewDucklingForm] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
    const updateListener = () => fetchItems();
    socket.on("itemUpdated", updateListener);

    return () => {
      socket.off("itemUpdated", updateListener);
    };
  }, []);

  const fetchItems = async () => {
    const { data } = await axios.get(`${apiEndpoint}`);
    setDucklings(data);
  };

  const addDuckling = async () => {
    await axios.post(`${apiEndpoint}`, newDuckling);
    setNewDuckling(defaultDuckling);
  };

  const toggleNewDucklingForm = () => {
    setNewDucklingForm(!newDucklingForm);
  };

  const deleteDuckling = async (id: string) => {
    await axios.put(`${apiEndpoint}/delete${id}`);
  };

  return (
    <>
      <h1>Almacen de Patitos</h1>
      <button onClick={toggleNewDucklingForm}>Agregar patito</button>
      {
        newDucklingForm ? (
          <div>
            <input 
              type="text" 
              value={newDuckling?.color} 
              onChange={(e) => setNewDuckling(prev => ({ ...prev, color: e.target.value } as Duckling))} 
              placeholder="Color de patito" 
            />
            <input 
              type="text" 
              value={newDuckling?.size} 
              onChange={(e) => setNewDuckling(prev => ({ ...prev, size: e.target.value } as Duckling))} 
              placeholder="Tamaño de patito" 
            />
            <input 
              type="number" 
              value={newDuckling?.quantity} 
              onChange={(e) => setNewDuckling(prev => ({ ...prev, quantity: Number(e.target.value)} as Duckling))} 
              placeholder="Cantidad de patitos" 
            />
            <input 
              type="number" 
              value={newDuckling?.price} 
              onChange={(e) => setNewDuckling(prev => ({ ...prev, price: Number(e.target.value) }))} 
              placeholder="Precio" 
            />
            <button onClick={addDuckling}>Añadir</button>
          </div>
        ) : (
          <></>
        )
      }
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Color</th>
            <th>Tamaño</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ducklings.map((item, i) => (
            <tr key={i}>
              <td>{item._id}</td>
              <td>{item.color}</td>
              <td>{item.size}</td>
              <td>{item.price}USD</td>
              <td>{item.quantity}</td>
              <td className='row-actions'>
                <a>Editar</a>
                <a onClick={() => deleteDuckling(item._id || '')}>Borrar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
