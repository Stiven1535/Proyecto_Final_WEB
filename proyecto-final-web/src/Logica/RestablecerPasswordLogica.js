import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';  // No necesitamos sendEmailVerification ni fetchSignInMethodsForEmail
import { db } from '../Logica/firebaseConfig';  // Importa la instancia de Firestore

export const useRestablecerPasswordLogic = (setError, setMessage) => {
  const navigate = useNavigate();
  const auth = getAuth();  // Inicializa Firebase Auth

  // Función que maneja la redirección a la página de login
  const handleVolverClick = () => {
    navigate('/');  // Redirige a la página de login
  };

  // Función para validar si el correo existe en la base de datos y enviar el correo de restablecimiento
  const handleRestablecerPassword = async (email) => {
    try {
      // Verifica si el correo existe en la base de datos de usuarios
      const usersCollection = collection(db, 'usuarios');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => doc.data().email);

      if (usersList.includes(email)) {
        // Si el correo existe en la base de datos, enviar el correo de restablecimiento
        await sendPasswordResetEmail(auth, email);
        console.log(`Correo enviado a: ${email}`);        
        setError(null);  // Si todo es correcto, reseteamos el error
        setMessage("Se ha enviado un correo para restablecer la contraseña.");
      } else {
        setError('El correo electrónico no está registrado.');
      }
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      setError('Hubo un error al verificar el correo.');
    }
  };

  return { handleVolverClick, handleRestablecerPassword };
};
