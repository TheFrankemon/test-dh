import { useState } from 'react'
import './App.css'
import { Duckling } from './models/Duckling';

function App() {
  const [ducklings, setDucklings] = useState<Duckling[]>([{
    id: '1',
    color: 'Rojo',
    size: 'XLarge',
    price: 200,
    quantity: 10000
  }]);

  return (
    <>
      <h1>Almacen de Patitos</h1>
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
          {ducklings.map(item => (
            <tr>
              <td>{item.id}</td>
              <td>{item.color}</td>
              <td>{item.size}</td>
              <td>{item.price}USD</td>
              <td>{item.quantity}</td>
              <td className='row-actions'>
                <a>Editar</a>
                <a>Borrar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
