import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const rol = localStorage.getItem('rol');

    if (!nombreUsuario || !rol) {
      router.replace('/');
      return;
    }

    const isAdminRoute = router.pathname.startsWith('/admin');
    const isUserRoute = router.pathname.startsWith('/usuario');

    if (isAdminRoute && rol !== 'admin') {
      router.replace('/usuario/dashboard');
      return;
    }

    if (isUserRoute && rol !== 'participante') {
      router.replace('/admin/dashboard');
      return;
    }

  }, [router]);

  return children;
}
