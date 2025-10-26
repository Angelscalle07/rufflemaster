import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./Resultados.module.css";
import { useRouter } from 'next/router';

export default function Resultados() {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    fetch("/api/rifas/{id}/resultados")
      .then((res) => res.json())
      .then((data) => setResultados(data))
      .catch((err) => console.error(err));
  }, []);

  const router = useRouter();

  const VolverDashboard = () => {
    router.push('/admin/dashboard');
  };

  return (
    <>
    <Head>
      <title>Resultados de Rifas</title>
      <meta name="description" content="Consulta los resultados de rifas pasadas en Rufflemaster"/>
    </Head>
    <div className={styles.container}>
      <h1>🏆 Resultados de Rifas</h1>
      <p className={styles.subtitulo}>Consulta si has ganado en rifas pasadas</p>

      <div className={styles.grid}>
        {resultados.map((r) => (
          <div key={r.id} className={styles.card}>
            <h2>{r.titulo}</h2>
            <p><strong>Fecha:</strong> {r.fecha_fin}</p>
            <p><strong>Ganador:</strong> {r.ganador}</p>
            <p><strong>Premio:</strong> {r.premio}</p>
          </div>
        ))}
      </div>
      <button className={styles.btnVolver} onClick={VolverDashboard}>🔙 Volver al Dashboard</button>
    </div>
    </>
  );
}



