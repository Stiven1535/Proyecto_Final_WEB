import React, { useState, useEffect } from 'react';
import { db } from '../Logica/firebaseConfig'; // Asegúrate de que la configuración de Firebase esté correctamente importada
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const RegistroMuestreoBotanico = () => {
  const [bitacoraData, setBitacoraData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    latitud: '',
    longitud: '',
    clima: '',
    habitat: '',
    fotografiaSitio: null,
    detallesEspecies: '',
    observaciones: '',
  });

  const [especieData, setEspecieData] = useState({
    nombreCientifico: '',
    nombreComun: '',
    familia: '',
    cantidadMuestras: '',
    estadoPlanta: '',
    fotografiaEspecie: null,
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Obtén el ID del documento de la bitácora (si existe)

  useEffect(() => {
    // Si el ID está presente, obtenemos los datos de la base de datos
    if (id) {
      const getData = async () => {
        try {
          const bitacoraRef = doc(db, 'bitacoras', id);
          const bitacoraDoc = await getDoc(bitacoraRef);
          if (bitacoraDoc.exists()) {
            setBitacoraData(bitacoraDoc.data());

            // Obtener la información de la especie asociada
            const especieRef = doc(db, 'especies', bitacoraDoc.data().especieId);
            const especieDoc = await getDoc(especieRef);
            if (especieDoc.exists()) {
              setEspecieData(especieDoc.data());
            }
          }
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      };
      getData();
    }
  }, [id]);

  // Función para manejar cambios en los inputs de la bitácora
  const handleBitacoraChange = (e) => {
    const { name, value } = e.target;
    setBitacoraData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar cambios en los inputs de la especie
  const handleEspecieChange = (e) => {
    const { name, value } = e.target;
    setEspecieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validación del formulario
  const validateForm = () => {
    if (
      !bitacoraData.titulo ||
      !bitacoraData.fecha ||
      !bitacoraData.hora ||
      !bitacoraData.latitud ||
      !bitacoraData.longitud ||
      !bitacoraData.clima ||
      !bitacoraData.habitat ||
      !bitacoraData.detallesEspecies ||
      !bitacoraData.observaciones ||
      !especieData.nombreCientifico ||
      !especieData.nombreComun ||
      !especieData.familia ||
      !especieData.cantidadMuestras
    ) {
      alert('Por favor, complete todos los campos requeridos');
      return false;
    }
    return true;
  };

  // Manejo del envío del formulario para agregar o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (id) {
        // Si estamos editando una bitácora existente, actualizar la bitácora y la especie
        const bitacoraRef = doc(db, 'bitacoras', id);
        await updateDoc(bitacoraRef, bitacoraData);
        const especieRef = doc(db, 'especies', bitacoraData.especieId);
        await updateDoc(especieRef, especieData);
        alert('Cambios guardados exitosamente');
      } else {
        // Si es una nueva bitácora, agregarla a la base de datos
        const especieRef = await addDoc(collection(db, 'especies'), especieData);
        const bitacoraDocData = {
          ...bitacoraData,
          especieId: especieRef.id, // Guardamos el ID de la especie
        };
        await addDoc(collection(db, 'bitacoras'), bitacoraDocData);
        alert('Bitácora registrada exitosamente');
      }
      navigate('/panelusuario');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  // Función para manejar el regreso a la página anterior
  const handleBack = () => navigate('/panelusuario');

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">{id ? 'Editar Bitácora' : 'Registro Detallado de Muestreo Botánico'}</h1>

      {/* Sección 1: Información General */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">Información General de la Bitácora</div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              name="titulo"
              value={bitacoraData.titulo}
              onChange={handleBitacoraChange}
              placeholder="Ingrese el título"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              id="fecha"
              name="fecha"
              value={bitacoraData.fecha}
              onChange={handleBitacoraChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ubicacion" className="form-label">Ubicación (Latitud, Longitud)</label>
            <input
              type="text"
              className="form-control"
              id="ubicacion"
              name="ubicacion"
              value={bitacoraData.ubicacion}
              onChange={handleBitacoraChange}
              placeholder="Ejemplo: Latitud 111.000000°, Longitud 111.000000°"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clima" className="form-label">Clima</label>
            <input
              type="text"
              className="form-control"
              id="clima"
              name="clima"
              value={bitacoraData.clima}
              onChange={handleBitacoraChange}
              placeholder="Ingrese el clima"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="habitat" className="form-label">Tipo de Hábitat</label>
            <input
              type="text"
              className="form-control"
              id="habitat"
              name="habitat"
              value={bitacoraData.habitat}
              onChange={handleBitacoraChange}
              placeholder="Ingrese el tipo de hábitat"
            />
          </div>
        </div>
      </div>

      {/* Sección 2: Observaciones */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">Observaciones</div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="observaciones" className="form-label">Observaciones</label>
            <textarea
              className="form-control"
              id="observaciones"
              name="observaciones"
              rows="4"
              value={bitacoraData.observaciones}
              onChange={handleBitacoraChange}
              placeholder="Ingrese las observaciones"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Sección 3: Detalles de la Especie */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">Detalles de la Especie</div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="nombreCientifico" className="form-label">Nombre Científico</label>
            <input
              type="text"
              className="form-control"
              id="nombreCientifico"
              name="nombreCientifico"
              value={especieData.nombreCientifico}
              onChange={handleEspecieChange}
              placeholder="Nombre científico"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nombreComun" className="form-label">Nombre Común</label>
            <input
              type="text"
              className="form-control"
              id="nombreComun"
              name="nombreComun"
              value={especieData.nombreComun}
              onChange={handleEspecieChange}
              placeholder="Nombre común"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="familia" className="form-label">Familia</label>
            <input
              type="text"
              className="form-control"
              id="familia"
              name="familia"
              value={especieData.familia}
              onChange={handleEspecieChange}
              placeholder="Familia"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cantidadMuestras" className="form-label">Cantidad de Muestras</label>
            <input
              type="number"
              className="form-control"
              id="cantidadMuestras"
              name="cantidadMuestras"
              value={especieData.cantidadMuestras}
              onChange={handleEspecieChange}
              placeholder="Cantidad de muestras"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={handleBack}>Volver</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default RegistroMuestreoBotanico;
