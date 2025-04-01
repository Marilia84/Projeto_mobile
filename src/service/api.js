// services/api.js
import axios from 'axios';

export const fetchAnime = async (query) => {
    try {
        const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar animes:', error);
        return [];
    }
};
