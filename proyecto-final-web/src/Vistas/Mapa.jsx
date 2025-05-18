import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMapViewLogic } from '../Logica/MapaLogica';
import { useNavigate } from 'react-router-dom';

// Componente para ajustar el mapa
const CenterMap = ({ coordinates, zoom }) => {
  const map = useMap();
  map.setView(coordinates, zoom);
  return null;
};

// Componente principal del mapa
const MapView = () => {
  const {
    latitude,
    longitude,
    coordinates,
    zoom,
    bitacoras,
    selectedTitle,
    setSelectedTitle,
    handleSearch
  } = useMapViewLogic();

  const navigate = useNavigate(); // Hook para navegación

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-center mb-3">Mapa con Filtro por Latitud y Longitud</h2>
      <Row className="w-100 h-100">
        {/* Filtro */}
        <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
          <Form className="p-3 border rounded bg-light shadow w-100">
            <Form.Group controlId="formComboBox" className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Select
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              >
                <option value="">-- Selecciona un título --</option>
                {bitacoras.map((bitacora) => (
                  <option key={bitacora.id} value={bitacora.titulo}>
                    {bitacora.titulo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="success" onClick={handleSearch} className="w-100 mb-3">
              Buscar
            </Button>
            
            {/* Latitud y Longitud */}
            <Form.Group controlId="latitud" className="mt-3">
              <Form.Label>Latitud</Form.Label>
              <Form.Control type="text" value={latitude} readOnly />
            </Form.Group>
            <Form.Group controlId="longitud" className="mt-3">
              <Form.Label>Longitud</Form.Label>
              <Form.Control type="text" value={longitude} readOnly />
            </Form.Group>

            {/* Botón Volver */}
            <Button
              variant="secondary"
              onClick={() => navigate(-1)} // Regresa a la página anterior
              className="w-100 mt-3"
            >
              Volver
            </Button>
          </Form>
        </Col>

        {/* Mapa */}
        <Col xs={12} md={8} className="d-flex justify-content-center align-items-center">
          <MapContainer
            center={coordinates}
            zoom={zoom}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CenterMap coordinates={coordinates} zoom={zoom} />
            <Marker position={coordinates}>
              <Popup>
                <strong>Latitud:</strong> {coordinates[0]} <br />
                <strong>Longitud:</strong> {coordinates[1]}
              </Popup>
            </Marker>
          </MapContainer>
        </Col>
      </Row>
    </div>
  );
};

export default MapView;
