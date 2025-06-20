import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';
import { getWeatherByCoordinates } from './services/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeather(data);
        } catch {
          alert("❌ Unable to fetch your location's weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("❌ Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center fw-bold text-primary mb-4">🌦️ Weather App</h1>
      <WeatherForm setWeather={setWeather} setLoading={setLoading} />
      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {weather && !loading && <WeatherCard weather={weather} />}
    </Container>
  );
}

export default App;
