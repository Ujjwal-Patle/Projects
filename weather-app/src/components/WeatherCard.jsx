import Card from 'react-bootstrap/Card';
import { motion } from 'framer-motion';
import {
  faTemperatureHalf,
  faDroplet,
  faWind,
  faCloudSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WeatherCard({ weather }) {
  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="mt-4 p-4 shadow-lg rounded-4 text-center border-0 bg-light mx-auto" style={{ maxWidth: '450px' }}>
        <Card.Body>
          <Card.Title className="fs-2 fw-bold text-primary mb-3">
            {weather.name}
          </Card.Title>

          <img src={iconUrl} alt="Weather Icon" style={{ width: '120px' }} className="mb-3" />

          <div className="text-secondary fs-5 mb-2">
            <FontAwesomeIcon icon={faTemperatureHalf} className="me-2 text-danger" />
            <strong>{weather.main.temp.toFixed(1)}°C</strong>
          </div>

          <div className="text-capitalize text-muted mb-2">
            <FontAwesomeIcon icon={faCloudSun} className="me-2 text-warning" />
            {weather.weather[0].description}
          </div>

          <div className="text-muted mb-1">
            <FontAwesomeIcon icon={faDroplet} className="me-2 text-info" />
            Humidity: <strong>{weather.main.humidity}%</strong>
          </div>

          <div className="text-muted">
            <FontAwesomeIcon icon={faWind} className="me-2 text-primary" />
            Wind: <strong>{weather.wind.speed} m/s</strong>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default WeatherCard;
