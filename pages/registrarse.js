import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Registro.module.css';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');

  const router = useRouter();
  const [rol, setRol] = useState('participante');

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (contraseña !== confirmar) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }

    try {
      const respuesta = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    body: JSON.stringify({
    nombre,
    email: correo,
    password: contraseña,
    rol,
  }),
});

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setMensaje('✅ Usuario registrado correctamente');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setMensaje(`❌ ${datos.message || 'Error al registrar'}`);
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al conectar con el servidor');
    }
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

        <select value={rol} onChange={(e) => setRol(e.target.value)} required>
        <option value="participante">Participante</option>
        <option value="admin">Administrador</option>
      </select>

        <button type="submit" className={styles.boton}>Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}