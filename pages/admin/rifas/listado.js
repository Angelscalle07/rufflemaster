import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './listado.module.css';

export default function ListadoRifas() {
  const [rifas, setRifas] = useState([]);
  const router = useRouter();

  const VolverDashboard = () => {
    router.push('/admin/dashboard');
  };

  useEffect(() => {
    fetch('/api/rifas')
      .then((res) => res.json())
      .then((data) => setRifas(data))
      .catch((err) => console.error(err));
  }, []);

  const eliminarRifa = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar esta rifa?')) return;

    const res = await fetch(`/api/rifas/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      alert('🗑️ Rifa eliminada con éxito');
    } else {
      alert('❌ Error al eliminar la rifa');
    }
  };

  const editarRifa = (id) => {
    router.push(`/admin/rifas/editar?id=${id}`);
  };

  function isPlayable(fecha_fin) {
    const fin = new Date(fecha_fin).getTime();
    return !isNaN(fin) && Date.now() >= fin;
  }

  const jugarRifa = async (id) => {
  try {
    const response = await fetch(`/api/rifas/${id}/jugar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("❌ " + (errorData.error || "Error al jugar la rifa"));
      return;
    }

    const data = await response.json();
    alert("🎉 Rifa jugada con éxito. Ganador: Usuario " + data.usuario_ganador);
  } catch (error) {
    console.error(error);
    alert("⚠️ Error en la conexión con el servidor");
  }
};
  const [playingId, setPlayingId] = useState(null);
  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>🎟️ Listado de Rifas</h1>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha Inicio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rifas.map((rifa) => (
            <tr key={rifa.id}>
              <td>{rifa.titulo}</td>
              <td>{new Date(rifa.fecha_inicio).toLocaleDateString()}</td>
              <td>{rifa.estado}</td>
              <td className={styles.acciones}>
                <button className={styles.btnEditar} onClick={() => editarRifa(rifa.id)}>✏️ Editar</button>
                <button className={styles.btnEliminar} onClick={() => eliminarRifa(rifa.id)}>🗑️ Eliminar</button>
                <button onClick={() => jugarRifa(rifa.id)} disabled={new Date(rifa.fecha_fin) > new Date() || rifa.estado === 'finalizada'}className={styles.btnJugar}>🎲 Jugar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.btnVolver} onClick={VolverDashboard}>🔙 Volver al Dashboard</button>
    </div>
  );
}

