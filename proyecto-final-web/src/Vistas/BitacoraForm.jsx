import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBitacoraFormLogic } from '../Logica/BitacoraFormLogica2'; // Importa la lógica del formulario

function BitacoraForm() {
  const {
    bitacoraData2,
    especieData,
    handleBitacoraChange,
    handleEspecieChange,
    handleSubmit,
    handleBack,
  } = useBitacoraFormLogic(); // Usa la lógica desde el archivo de lógica

  const navigate = useNavigate();

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4">Registro de Bitácora</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Título */}
        <div className="mb-4">
          <label className="form-label">Título de la Bitácora</label>
          <input
            type="text"
            className="form-control"
            name="titulo"
            value={bitacoraData2.titulo}
            onChange={handleBitacoraChange}
            placeholder="Ingrese el título"
          />
        </div>

        {/* Fecha y Hora */}
        <div className="row mb-4">
          <div className="col">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              name="fecha"
              value={bitacoraData2.fecha}
              onChange={handleBitacoraChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Hora</label>
            <input
              type="time"
              className="form-control"
              name="hora"
              value={bitacoraData2.hora}
              onChange={handleBitacoraChange}
            />
          </div>
        </div>

        {/* Ubicación */}
        <div className="row mb-4">
          <div className="col">
            <label className="form-label">Latitud</label>
            <input
              type="text"
              className="form-control"
              name="latitud"
              value={bitacoraData2.latitud}
              onChange={handleBitacoraChange}
              placeholder="Ej. -90.0000 a 90.0000"
              pattern="^(-?([0-8]?[0-9](\.\d+)?|90(\.0+)?))$"
              title="Ingrese una latitud válida entre -90 y 90 grados"
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Longitud</label>
            <input
              type="text"
              className="form-control"
              name="longitud"
              value={bitacoraData2.longitud}
              onChange={handleBitacoraChange}
              placeholder="Ej. -180.0000 a 180.0000"
              pattern="^(-?([0-9]?[0-9](\.\d+)?|1[0-7][0-9](\.\d+)?|180(\.0+)?))$"
              title="Ingrese una longitud válida entre -180 y 180 grados"
              required
            />
          </div>
        </div>

        {/* Clima y Hábitat */}
        <div className="mb-4">
          <label className="form-label">Condiciones Climáticas</label>
          <input
            type="text"
            className="form-control"
            name="clima"
            value={bitacoraData2.clima}
            onChange={handleBitacoraChange}
            placeholder="Ingrese las condiciones climáticas"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Descripción del Hábitat</label>
          <input
            type="text"
            className="form-control"
            name="habitat"
            value={bitacoraData2.habitat}
            onChange={handleBitacoraChange}
            placeholder="Ej. Bosque tropical"
          />
        </div>

        {/* Fotografía del sitio */}
        <div className="mb-4">
          <label className="form-label">Fotografía del Sitio</label>
          <input
            type="file"
            className="form-control"
            name="fotografiaSitio"
            onChange={handleBitacoraChange}
          />
        </div>

        {/* Detalles de la especie */}
        <div className="mb-4">
          <label className="form-label">Detalles de las Especies Recolectadas</label>
          <textarea
            className="form-control"
            name="detallesEspecies"
            value={bitacoraData2.detallesEspecies}
            onChange={handleBitacoraChange}
            placeholder="Ingrese detalles"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label">Observaciones Adicionales</label>
          <textarea
            className="form-control"
            name="observaciones"
            value={bitacoraData2.observaciones}
            onChange={handleBitacoraChange}
            placeholder="Ingrese observaciones"
            rows="3"
          ></textarea>
        </div>

        {/* Especie recolectada */}
        <h3 className="mt-5">Datos de la Especie Recolectada</h3>

        <div className="row mb-4">
          <div className="col">
            <label className="form-label">Nombre Científico</label>
            <input
              type="text"
              className="form-control"
              name="nombreCientifico"
              value={especieData.nombreCientifico}
              onChange={handleEspecieChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Nombre Común</label>
            <input
              type="text"
              className="form-control"
              name="nombreComun"
              value={especieData.nombreComun}
              onChange={handleEspecieChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <label className="form-label">Familia</label>
            <input
              type="text"
              className="form-control"
              name="familia"
              value={especieData.familia}
              onChange={handleEspecieChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Cantidad de Muestras</label>
            <input
              type="number"
              className="form-control"
              name="cantidadMuestras"
              value={especieData.cantidadMuestras}
              onChange={handleEspecieChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Estado de la Planta</label>
          <select
            className="form-control"
            name="estadoPlanta"
            value={especieData.estadoPlanta}
            onChange={handleEspecieChange}
          >
            <option value="">Seleccionar</option>
            <option value="viva">Viva</option>
            <option value="muerta">Muerta</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Fotografía de la Especie</label>
          <input
            type="file"
            className="form-control"
            name="fotografiaEspecie"
            onChange={handleEspecieChange}
          />
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleBack}
          >
            Volver
          </button>
          <button type="submit" className="btn btn-success">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default BitacoraForm;
