import { useEffect, useState } from "react";
import styles from "./fraude.module.css";
import Head from "next/head";

export default function Fraudes() {
  const [logs, setLogs] = useState([]);

  const VolverDashboard = () => {
    window.location.href = '/admin/dashboard';
  }

  useEffect(() => {
    fetch("/api/logs/fraude")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Error al obtener logs:", err));
  }, []);

  const getColor = (log) => { 
    if (log.includes("⚠️")) return "#eab308";
    if (log.includes("✅")) return "#22c55e";
    if (log.includes("❌")) return "#ef4444"; 
    return "#d1d5db"; 
  };

  return (
    <>
    <Head>
      <title>Registros del Modelo Antifraude</title>
      <meta name="description" content="Consulta los registros generados por el modelo antifraude en Rufflemaster"/>
    </Head>
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "20px" }}>📊 Registros del modelo antifraude</h1>

      {logs.length === 0 ? (
        <p>No hay registros del modelo antifraude todavía.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {logs.map((log, i) => (
            <div
              key={i}
              style={{
                background: "#1f2937",
                color: getColor(log),
                padding: "10px 15px",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                borderLeft: `4px solid ${getColor(log)}`,
              }}
            >
              {log}
            </div>
          ))}
        </div>
      )}
      <button className={styles.btnVolver} onClick={VolverDashboard}>🔙 Volver al Dashboard</button>
    </div>
    </>
  );
}
