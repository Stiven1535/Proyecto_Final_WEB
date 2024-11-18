import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBitacoraResumenLogic } from '../Logica/BitacoraResumen';

function BitacoraResumenUsuarios() {
  const { bitacora, especie } = useBitacoraResumenLogic();
  const navigate = useNavigate();

  const handleVolverClick = () => {
    navigate('/listausuarios');
  };

  const handleExportPDF = () => {
    console.log('Exportar PDF');
  };

  const formatCoordinates = (latitud, longitud) => {
    if (!latitud || !longitud) return 'No disponible';
    const lat = Number(latitud);
    const lng = Number(longitud);
    if (isNaN(lat) || isNaN(lng)) return 'Coordenadas inválidas';
    return `Latitud: ${lat.toFixed(6)}°, Longitud: ${lng.toFixed(6)}°`;
  };

  const formatFecha = (fecha) => {
    if (!fecha) return 'No disponible';
    try {
      const date = new Date(fecha);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#f4f6f9' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center mb-4 text-dark fw-bold">
            <i className="fas fa-seedling" style={{ color: '#198754' }}></i>
            Registro Detallado de Muestreo Botánico
          </h2>

          {/* Información General */}
          <div className="card border-0 shadow-lg mb-4">
            <div
              className="card-header text-center fw-bold"
              style={{ backgroundColor: '#198754', color: '#fff' }}
            >
              <i className="fas fa-info-circle me-2"></i>
              Información General de la Bitácora
            </div>
            <div
              className="card-body"
              style={{
                padding: '20px 15px',
                fontSize: '0.95rem',
                lineHeight: '1.5',
              }}
            >
              {bitacora ? (
                <>
                  <p><strong>Título:</strong> {bitacora.titulo || 'No especificado'}</p>
                  <p><strong>Fecha:</strong> {formatFecha(bitacora.fecha)}</p>
                  <p><strong>Ubicación:</strong> {formatCoordinates(bitacora.latitud, bitacora.longitud)}</p>
                  <p><strong>Clima:</strong> {bitacora.clima || 'No especificado'}</p>
                  <p><strong>Tipo de Hábitat:</strong> {bitacora.habitat || 'No especificado'}</p>
                </>
              ) : (
                <p className="text-center text-muted">Cargando información...</p>
              )}
            </div>
          </div>

          {/* Observaciones */}
          <div className="card border-0 shadow-lg mb-4">
            <div
              className="card-header text-center fw-bold"
              style={{ backgroundColor: '#198754', color: '#fff' }}
            >
              <i className="fas fa-sticky-note me-2"></i>
              Observaciones
            </div>
            <div
              className="card-body"
              style={{
                minHeight: '100px',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                backgroundColor: '#f8f9fa',
              }}
            >
              <textarea
                className="form-control"
                rows="3"
                readOnly
                value={bitacora?.observaciones || 'Sin observaciones'}
                style={{
                  resize: 'none',
                  height: '100px',
                  border: 'none',
                  backgroundColor: 'transparent',
                }}
              />
            </div>
          </div>

          {/* Detalles de la Especie */}
          <div className="card border-0 shadow-lg mb-4">
            <div
              className="card-header text-center fw-bold"
              style={{ backgroundColor: '#198754', color: '#fff' }}
            >
              <i className="fas fa-leaf me-2"></i>
              Detalles de la Especie
            </div>
            <div
              className="card-body"
              style={{
                minHeight: '100px',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                backgroundColor: '#f8f9fa',
              }}
            >
              <textarea
                className="form-control"
                rows="3"
                readOnly
                value={bitacora?.detallesEspecies || 'Sin detalles adicionales'}
                style={{
                  resize: 'none',
                  height: '100px',
                  border: 'none',
                  backgroundColor: 'transparent',
                }}
              />
            </div>
          </div>

          {/* Información de la Especie */}
          <div className="card border-0 shadow-lg mb-4">
            <div
              className="card-header text-center fw-bold"
              style={{ backgroundColor: '#198754', color: '#fff' }}
            >
              <i className="fas fa-paw me-2"></i>
              Información de la Especie Recolectada
            </div>
            <div
              className="card-body"
              style={{
                padding: '15px',
                fontSize: '0.95rem',
                lineHeight: '1.5',
              }}
            >
              {especie ? (
                <>
                  <p><strong>Nombre Científico:</strong> {especie.nombreCientifico || 'No especificado'}</p>
                  <p><strong>Nombre Común:</strong> {especie.nombreComun || 'No especificado'}</p>
                  <p><strong>Familia:</strong> {especie.familia || 'No especificado'}</p>
                  <p><strong>Cantidad de Muestras:</strong> {especie.cantidadMuestras || 0}</p>
                  <p><strong>Estado de la Planta:</strong> {especie.estadoPlanta || 'No especificado'}</p>
                </>
              ) : (
                <p className="text-center text-muted">Cargando información...</p>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="text-center">
            <button
              className="btn btn-secondary me-3"
              onClick={handleVolverClick}
              style={{
                borderRadius: '20px',
                padding: '10px 20px',
                fontWeight: 'bold',
                boxShadow: 'none',  // Elimina cualquier sombra al hacer hover
              }}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Volver al Panel de Usuario
            </button>
            <button
              className="btn btn-success"
              onClick={handleExportPDF}
              style={{
                borderRadius: '20px',
                padding: '10px 20px',
                fontWeight: 'bold',
              }}
            >
              <i className="fas fa-file-pdf me-2"></i>
              Exportar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BitacoraResumenUsuarios;
