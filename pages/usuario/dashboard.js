import Link from 'next/link'; 
import Head from 'next/head';
import React from 'react';  
import styles from './usuario.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DashboardUsuario() {
  const [primerNombre, setPrimerNombre] = useState('');

  const router = useRouter();

  useEffect(() => {
    const nombreCompleto = localStorage.getItem('nombreUsuario');
    if (nombreCompleto) {
      const partes = nombreCompleto.split(' ');
      setPrimerNombre(partes[0]);
    }
  }, []);

  const irARifasActivas = () => {
    router.push('/usuario/rifas');
  }

  const irAMisBoletos = () => {
    router.push('/usuario/boletos');  
  }

  const irAMisResultados = () => {
    router.push('/usuario/resultados'); 
  }

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
        </div>
      </main>
    </div>
    </>
    </ProtectedRoute>
  );
}

