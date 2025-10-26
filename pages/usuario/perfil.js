import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Perfil.module.css';

export default function PerfilUsuario() {

  const router = useRouter();
  
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password_actual: '',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usuarioId = localStorage.getItem("usuario_id");
        if (!usuarioId) return;

        const res = await fetch(`/api/usuarios/${usuarioId}`);
        const data = await res.json();

        setForm((prev) => ({
          ...prev,
          nombre: data.nombre,
          email: data.email
        }));
      } catch (err) {
        console.error("Error cargando usuario:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioId = localStorage.getItem("usuario_id");

    try {
      const res = await fetch(`/api/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Perfil actualizado con éxito ✅");
        localStorage.clear();
      router.push("/");
      }else {
      alert(data.error || "Error al actualizar perfil");
      }
    } catch (err) {
    console.error(err);
    alert("Hubo un error en la conexión");
    }
  };

  return (
    <>
      <Head>
        <title>Mi perfil</title>
        <meta name="description" content="Administra tu perfil y configuración de cuenta en Rufflemaster" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Mi perfil</h1>
        <p className={styles.subtitulo}>
          Administre su información personal y la configuración de su cuenta.
        </p>

        <div className={styles.card}>
          <h2 className={styles.seccion}>Información personal</h2>
          <form className={styles.formulario} onSubmit={handleSubmit}>
            <label>Nombre completo</label>
            <input className={styles.input} type="text" name="nombre" value={form.nombre} onChange={handleChange} />

            <label>Email</label>
            <input className={styles.input} type="email" name="email" value={form.email} onChange={handleChange} />

            <label>Contraseña actual (para cambios)</label>
            <input className={styles.input} type="password" name="password_actual" value={form.password_actual} onChange={handleChange} />

            <label>Contraseña nueva</label>
            <input className={styles.input} type="password" name="password" value={form.password} onChange={handleChange} />

            <label>Confirmar nueva contraseña</label>
            <input className={styles.input} type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} />

            <button className={styles.boton} type="submit">Guardar cambios</button>
          </form>
        </div>
      </div>
    </>
  );
}


