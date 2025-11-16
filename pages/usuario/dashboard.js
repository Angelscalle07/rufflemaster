import Link from 'next/link'; 
import Head from 'next/head';
import React, { useEffect, useState } from 'react';  
import styles from './usuario.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function DashboardUsuario() {
  const [primerNombre, setPrimerNombre] = useState('');
  const [secret, setSecret] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [mostrarModalMFA, setMostrarModalMFA] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const nombreCompleto = localStorage.getItem('nombreUsuario');
    if (nombreCompleto) {
      const partes = nombreCompleto.split(' ');
      setPrimerNombre(partes[0]);
    }
  }, []);

  const irARifasActivas = () => router.push('/usuario/rifas');
  const irAMisBoletos = () => router.push('/usuario/boletos');  
  const irAMisResultados = () => router.push('/usuario/resultados'); 

  // Función para activar MFA
  const activarMFA = async () => {
    const email = localStorage.getItem("email");
    if (!email) return alert("No hay email guardado");

    try {
      const res = await fetch("/api/mfa/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setSecret(data.secret);
        setMensaje(data.mensaje || "Clave generada. Agrégala en Google Authenticator.");
        setMostrarModalMFA(true); // Abrir modal
      } else {
        setMensaje(data.mensaje);
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error conectando con el servidor");
    }
  };

  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>Inicio</title>
          <meta name="description" content="Panel de usuario de Rufflemaster"/>
        </Head>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.logo}>
              <Image src="/Logo rufflemaster.png" alt="Rufflemaster Logo" width={300} height={200} />
            </div>
            <nav className={styles.nav}>
              <ul>
                <li><Link href="#">Inicio</Link></li>
                <li><Link href="/usuario/boletos">Mis boletos</Link></li>
                <li><Link href="/usuario/resultados">Resultados</Link></li>
                <li><Link href="/usuario/perfil">Mi perfil</Link></li>
                <li
                  className={styles.cerrarsesion}
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                  }}
                  style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Cerrar Sesión
                </li>
              </ul>
            </nav>
          </aside>

          <main className={styles.main}>
            <h2>Bienvenido, {primerNombre}!</h2>
            <p>Explora las rifas activas y consulta tus boletos.</p>
            <div className={styles.cardGrid}>
              <div className={styles.card}>
                <h3>🎫 Rifas Activas</h3>
                <p>Participa en rifas disponibles hoy.</p>
                <button onClick={irARifasActivas}>Ver Rifas</button>
              </div>

              <div className={styles.card}>
                <h3>📋 Mis Boletos</h3>
                <p>Consulta tus boletos comprados.</p>
                <button onClick={irAMisBoletos}>Ver Boletos</button>
              </div>

              <div className={styles.card}>
                <h3>🏆 Resultados</h3>
                <p>Consulta los resultados de rifas anteriores.</p>
                <button onClick={irAMisResultados}>Ver Resultados</button>
              </div>

              <div className={styles.card}>
                <h3>🔐 Seguridad</h3>
                <p>Activa la autenticación en dos pasos (MFA) para tu cuenta.</p>
                <button onClick={activarMFA}>Activar MFA</button>
                {mensaje && <p style={{ marginTop: "10px" }}>{mensaje}</p>}
              </div>
            </div>
          </main>
        </div>

        {mostrarModalMFA && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>🔐 Activar MFA</h3>
              <p>{mensaje}</p>
              <p style={{ fontFamily: "monospace", background: "#f3f4f6", padding: "10px", borderRadius: "5px" }}>
                {secret}
              </p>
              <p>Agrega esta clave manualmente en Google Authenticator → "Agregar código" → "Ingresar clave".</p>
              <button onClick={() => setMostrarModalMFA(false)} className={styles.panelBtn}>Cerrar</button>
            </div>
          </div>
        )}
      </>
    </ProtectedRoute>
  );
}
