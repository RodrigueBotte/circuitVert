// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://localhost:8000/api"; // à adapter

async function getAuthHeaders() {
    // quand l'utilisateur se connecte, on stocke le token dans AsyncStorage puis on le récupère ici pour l'ajouter aux headers
  const token = await AsyncStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json", // permet d'envoyer des données en JSON
    ...(await getAuthHeaders()), // ajoute le token d'authentification si disponible
    ...options.headers, //permet d'ajouter des headers spécifiques à l'appel
  };

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
//   retourne une erreur sinon affiche la réponse en JSON
  if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
  return response.json();
}
