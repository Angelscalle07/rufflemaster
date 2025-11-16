import styles from './admin.module.css';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const [primerNombre, setPrimerNombre] = useState('');
  const [secret, setSecret] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [mostrarModalMFA, setMostrarModalMFA] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const nombreCompleto = localStorage.getItem('nombreUsuario');
    if (nombreCompleto) {
      const partes = nombreCompleto.split(' ');
      setPrimerNombre(partes[0]);
    }
  }, []);

  const irARifas = () => router.push('/admin/rifas/listado');
  const irANuevaRifa = () => router.push('/admin/rifas/nuevas');
  const irAGestionUsuarios = () => router.push('/admin/usuarios');
  const IrAFraudes = () => router.push('/admin/fraudes');
  const irAResultados = () => router.push('/admin/resultados');

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
    setMensaje("Clave generada. Agrégala en Google Authenticator.");
    setMostrarModalMFA(true);
    } else {
    setMensaje(data.mensaje);
    setMostrarModalMFA(false);
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
          <meta name="description" content="Panel de administración de Rufflemaster" />
        </Head>

        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.logo}>
              <Image src="/Logo rufflemaster.png" alt="Rufflemaster Logo" width={300} height={200} />
            </div>

            <nav className={styles.nav}>
              <ul>
                <li><Link href="/admin/fraudes">Alertas de fraude</Link></li>
                <li><Link href="/admin/perfil">Mi perfil</Link></li>

                <li
                  className={styles.cerrarsesion}
                  onClick={() => {
                    localStorage.clear();
                    document.cookie = 'usuario_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    document.cookie = 'rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
            <p>Aquí puedes administrar rifas, usuarios y monitorear el sistema.</p>

            <h1 className={styles.heading}>Panel de Administración</h1>

            <div className={styles.panelGrid}>

              <div className={styles.panel}>
                <h3>🎯 Administrar Rifas</h3>
                <p>Crea, edita y monitorea rifas activas.</p>
                <button onClick={irANuevaRifa} className={styles.panelBtn}>Crear rifa</button>
                <br />
                <button onClick={irARifas} className={styles.panelBtn}>Ver rifas</button>
              </div>

              <div className={`${styles.panel} ${styles.alertPanel}`}>
                <h3>⚠️ Alertas Antifraude</h3>
                <p>Monitorea irregularidades detectadas por IA.</p>
                <button onClick={IrAFraudes} className={styles.alertBtn}>Ver alertas</button>
              </div>

              <div className={styles.panel}>
                <h3>🏆 Resultados</h3>
                <p>Consulta los resultados de rifas anteriores.</p>
                <button onClick={irAResultados} className={styles.panelBtn}>Ver Resultados</button>
              </div>

              <div className={styles.panel}>
                <h3>🔐 Seguridad</h3>
                <p>Activa la autenticación en dos pasos (MFA) para tu cuenta.</p>

                <button onClick={activarMFA} className={styles.panelBtn}>
                  Activar MFA
                </button>

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
          </div>

            </div>
          </main>
        </div>
      </>
    </ProtectedRoute>
  );
}
