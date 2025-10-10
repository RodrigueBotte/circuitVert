// api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const API_URL = Platform.select({
  android: "http://10.0.2.2:8000/api",        // Émulateur Android
  ios: "http://localhost:8000/api",            // Simulateur iOS
  web: "http://localhost:8000/api",            // Navigateur
  default: "http://localhost:8000/api",
});

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

  const responseText = await response.text();
  let data;
  
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (e) {
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    throw new Error('Réponse serveur invalide');
  }

//   retourne une erreur sinon affiche la réponse en JSON
  if (!response.ok) {
    throw new Error(data.message || data.error || `Erreur API: ${response.status}`);
  }
  
  return data;
}
