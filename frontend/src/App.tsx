import { useEffect, useState } from 'react'
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css'
import { Duckling } from './models/Duckling';
import NewDucklingForm from './components/newDucklingForm';
import { apiEndpoint } from './constants/constants';

const socket = io("http://localhost:4000");

function App() {
  const [ducklings, setDucklings] = useState<Duckling[]>([{
    color: 'Rojo',
    size: 'XLarge',
    price: 200,
    quantity: 10000
  }]);
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

  const toggleNewDucklingForm = () => {
    setNewDucklingForm(!newDucklingForm);
  };

  const deleteDuckling = async (id: string) => {
    if (confirm('¿Estás seguro de borrar este registro?')) {
      await axios.put(`${apiEndpoint}/delete/${id}`);
    }
  };

  return (
    <>
      <h1>Almacen de Patitos</h1>
      <button className='add-duck-button' onClick={toggleNewDucklingForm}>Agregar patito</button>
      {
        newDucklingForm ? (
          <NewDucklingForm/>
        ) : (
          <></>
        )
      }
      <table>
        <thead>
          <tr className='table-header'>
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
