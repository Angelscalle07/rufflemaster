import React from 'react';
import styles from './Rifas.module.css';

export default function RifasActivas() {

    const IrARifasActivas = () => {
        router.push('/usuario/rifas');
    }

  const rifas = [
    {
      id: 1,
      titulo: 'Gran Rifa Navideña',
      descripcion: 'Participa por premios en efectivo y regalos sorpresas.',
      fecha: '25 de diciembre de 2025',
    },
    {
      id: 2,
      titulo: 'Sorteo de Gadgets',
      descripcion: 'Gana celulares, tablets y más.',
      fecha: '15 de noviembre de 2025',
    },
  ];

  return (
    <div className={styles.container}>
      <h1>🎫 Rifas Activas</h1>
      <p className={styles.subtitulo}>Explora y participa en sorteos disponibles</p>

      <div className={styles.grid}>
        {rifas.map((rifa) => (
          <div key={rifa.id} className={styles.card}>
            <h3>{rifa.titulo}</h3>
            <p>{rifa.descripcion}</p>
            <p><strong>Fecha:</strong> {rifa.fecha}</p>
            <button className={styles.btn}>Participar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
