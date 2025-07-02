// pages/admin/rifas/nueva.js
import React, { useState } from 'react';
import styles from './nueva.module.css';
import { useRouter } from 'next/router';

export default function NuevaRifa() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [premio, setPremio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, descripcion, fecha, premio });
    alert('🎉 Rifa creada (simulado)');
    router.push('/admin/rifas/listado');
  };

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>➕ Crear Nueva Rifa</h1>

      <form onSubmit={handleSubmit} className={styles.formulario}>
        <label>Nombre de la rifa</label>
        <input
          type="text"
          placeholder="Ej: Rifa Día del Padre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Descripción</label>
        <textarea className={styles.textareaDescripcion}
          placeholder="Describe brevemente la rifa..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>

        <label>Fecha del sorteo</label>
        <input className='styles.inputFecha'
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <label>Premio principal</label>
        <input className='styles.inputPremio'
          type="text"
          placeholder="Ej: Televisor de 50 pulgadas"
          value={premio}
          onChange={(e) => setPremio(e.target.value)}
          required
        />

        <button type="submit" className={styles.botonCrear}>Crear Rifa</button>
      </form>
    </div>
  );
}
