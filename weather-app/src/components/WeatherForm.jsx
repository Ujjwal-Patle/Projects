import { useState } from 'react';
import { Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import { getWeatherByCity, getWeatherByCoordinates } from '../services/weatherService';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

function WeatherForm({ setWeather, setLoading }) {
  const [city, setCity] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); // ✅ Prevent refresh
    if (!city.trim()) return;
    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch {
      alert('❌ City not found!');
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("❌ Geolocation not supported");
      return;
    }

    setLocalLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeather(data);
        } catch {
          alert("❌ Could not fetch weather for your location");
        } finally {
          setLocalLoading(false);
          setLoading(false);
        }
      },
      () => {
        alert("❌ Location access denied");
        setLocalLoading(false);
        setLoading(false);
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Form onSubmit={handleSearch} className="mt-3">
        <div className="d-flex flex-column flex-md-row align-items-center gap-2">
          <InputGroup className="flex-grow-1">
            <Form.Control
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-pill px-4"
              style={{ minHeight: '45px' }}
            />
          </InputGroup>

          <Button
            type="submit"
            variant="primary"
            className="rounded-pill px-3"
            style={{ minHeight: '45px' }}
          >
            <FontAwesomeIcon icon={faSearch} className="me-2" />
            Search
          </Button>

          <Button
            variant="secondary"
            onClick={handleGeolocation}
            className="rounded-pill px-3"
            style={{ minHeight: '45px' }}
            disabled={localLoading}
          >
            {localLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <FontAwesomeIcon icon={faLocationCrosshairs} className="me-2" />
                My Location
              </>
            )}
          </Button>
        </div>
      </Form>
    </motion.div>
  );
}

export default WeatherForm;
