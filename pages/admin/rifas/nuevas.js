import React, { useState } from 'react';
import Head from 'next/head';
import styles from './nueva.module.css';
import { useRouter } from 'next/router';

export default function NuevaRifa() {
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [premio, setPremio] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/rifas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descripcion,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          premio,
          creada_por: 1
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.mensaje);
        setTimeout(() => router.push('/admin/rifas/listado'), 1500);
      } else {
        setMensaje(`❌ Error: ${data.message || 'No se pudo crear la rifa'}`);
      }
    } catch (error) {
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <>
    <Head>
      <title>Nueva Rifa</title>
      <meta name="description" content="Crea una nueva rifa en Rufflemaster para que los usuarios puedan participar." />
    </Head>
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>➕ Crear Nueva Rifa</h1>

      <form onSubmit={handleSubmit} className={styles.formulario}>
        <label>Nombre de la rifa</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

        <label>Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>

        <label>Fecha de inicio</label>
        <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />

        <label>Fecha de fin</label>
        <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />

        <label>Premio principal</label>
        <input type="text" value={premio} onChange={(e) => setPremio(e.target.value)} required />

        <button type="submit" className={styles.botonCrear}>Crear Rifa</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
    </>
  );
}


