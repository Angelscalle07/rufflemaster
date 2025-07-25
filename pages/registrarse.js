import { useState } from 'react';
import styles from '../styles/Registro.module.css';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>📝 Registro de Participantes</h1>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Correo electrónico</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

        <label>Contraseña</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />

        <label>Confirmar contraseña</label>
        <input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />

        <button type="submit" className={styles.boton}>Registrarse</button>
      </form>
    </div>
  );
}
