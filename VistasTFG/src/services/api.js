//funciones del home.jsx
import axios from 'axios';

const imagenBase = "https://image.tmdb.org/t/p/original/";
const apiKey = "1d19984bf0db6b96adb50809875b0c3b";

const urlEstrenos = "https://api.themoviedb.org/3/movie/upcoming";
const urlBusqueda = "https://api.themoviedb.org/3/search/movie";

export const getPeliculas = async () => {
  try {
    const response = await axios.get(urlEstrenos, {
      params: {
        api_key: apiKey,
        page: 1
      }
    });

    if (response.data.results) {
      return response.data.results;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getBusqueda = async (query) => {
  try {
    const response = await axios.get(urlBusqueda, {
      params: {
        api_key: apiKey,
        query: query
      }
    });

    if (response.data.results) {
      return response.data.results;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const obtenerDetalles = (id) => {
  console.log(id);
};

export const obtenerImagenCompleta = (ruta) => {
  return `${imagenBase}${ruta}`;
};
