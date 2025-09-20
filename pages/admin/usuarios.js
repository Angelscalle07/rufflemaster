import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import styles from "./Usuarios.module.css";

export default function UsuariosActivos() {
  const [usuarios, setUsuarios] = useState([]);

  const router = useRouter();
  
    const VolverDashboard = () => {
      router.push('/admin/dashboard');
    };

  useEffect(() => {
    fetch("/api/usuarios/activos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          setUsuarios([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🟢 Usuarios Registrados</h2>
      <ul className={styles.list}>
        {usuarios.map((u) => (
          <li key={u.id} className={styles.item}>
            <div>
              <p className={styles.userName}>{u.nombre}</p>
              <p className={styles.userEmail}>{u.email}</p>
            </div>
            <span className={styles.status}>Activo</span>
          </li>
        ))}
      </ul>
      <button className={styles.btnVolver} onClick={VolverDashboard}>🔙 Volver al Dashboard</button>
    </div>
  );
}


