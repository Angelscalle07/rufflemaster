import React from 'react';
import styles from './listado.module.css';

const rifasDummy = [
  {
    id: 1,
    nombre: 'Rifa de Verano',
    fecha: '2025-08-15',
    estado: 'Activa',
  },
  {
    id: 2,
    nombre: 'Sorteo Aniversario',
    fecha: '2025-09-01',
    estado: 'Finalizada',
  },
];

export default function ListadoRifas() {
  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>🎟️ Listado de Rifas</h1>

      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rifasDummy.map((rifa) => (
            <tr key={rifa.id}>
              <td>{rifa.nombre}</td>
              <td>{rifa.fecha}</td>
              <td>{rifa.estado}</td>
              <td className={styles.acciones}>
                <button className={styles.btnEditar}>✏️ Editar</button>
                <button className={styles.btnEliminar}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
