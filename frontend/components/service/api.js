// // api.js
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = "http://localhost:8000/api"; 

// async function getAuthHeaders() {
//     // quand l'utilisateur se connecte, on stocke le token dans AsyncStorage puis on le récupère ici pour l'ajouter aux headers
//   const token = await AsyncStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

// export async function apiFetch(endpoint, options = {}) {
//   const headers = {
//     "Content-Type": "application/json", // permet d'envoyer des données en JSON
//     ...(await getAuthHeaders()), // ajoute le token d'authentification si disponible
//     ...options.headers, //permet d'ajouter des headers spécifiques à l'appel
//   };

//   const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

//   const responseText = await response.text();
//   let data;

//   try {
//     data = responseText ? JSON.parse(responseText) : {};
//   } catch (_e) {
//     if (!response.ok) {
//       throw new Error(`Erreur API: ${response.status}`);
//     }
//     throw new Error('Réponse serveur invalide');
//   }

// //   retourne une erreur sinon affiche la réponse en JSON
//   if (!response.ok) {
//     throw new Error(data.message || data.error || `Erreur API: ${response.status}`);
//   }

//   return data;
// }

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Extraire automatiquement l'IP du PC depuis la configuration Expo
const getLocalIP = () => {
    const hostUri = Constants.expoConfig?.hostUri;
    
    if (hostUri) {
        const ip = hostUri.split(':')[0];
        console.log('✅ IP automatiquement détectée:', ip);
        return ip;
    }
    
    console.warn('⚠️ Impossible de détecter l\'IP automatiquement, utilisation de localhost');
    return 'localhost';
};

// Détection automatique de l'URL selon l'environnement
const getApiUrl = () => {
    if (__DEV__) {
        const localIP = getLocalIP();
        const isPhysicalDevice = !!Constants.expoConfig?.hostUri;
        
        console.log('🔍 Détection environnement:');
        console.log('  - IP détectée:', localIP);
        console.log('  - Expo hostUri:', Constants.expoConfig?.hostUri);
        console.log('  - isDevice:', Constants.isDevice);
        console.log('  - Platform.OS:', Platform.OS);
        console.log('  - Type détecté:', isPhysicalDevice ? 'Appareil physique/Expo Go' : 'Émulateur');
        
        if (Platform.OS === 'android') {
            if (isPhysicalDevice) {
                console.log('📱 Appareil physique / Expo Go détecté');
                return `http://${localIP}:8000/api`;
            } else {
                console.log('🖥️ Émulateur Android Studio détecté');
                return 'http://10.0.2.2:8000/api';
            }
        } else if (Platform.OS === 'ios') {
            return `http://${localIP}:8000/api`;
        } else {
            return 'http://localhost:8000/api';
        }
    } else {
        return 'https://votre-domaine.com/api';
    }
};

const API_URL = getApiUrl();

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🌐 Configuration API');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📍 URL:', API_URL);
console.log('📱 Plateforme:', Platform.OS);
console.log('🔧 Mode dev:', __DEV__ ? 'OUI' : 'NON');
console.log('🔌 Is device:', Constants.isDevice);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

async function getAuthHeaders() {
    const token = await AsyncStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch(endpoint, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(await getAuthHeaders()),
        ...options.headers,
    };

    const fullUrl = `${API_URL}${endpoint}`;
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔌 Fetch');
    console.log('📍 URL:', fullUrl);
    console.log('📦 Headers:', headers);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        const response = await fetch(fullUrl, { ...options, headers });
        
        console.log('📡 Statut:', response.status, response.statusText);

        if (!response.ok) {
            const result = await response.json();
            console.error('❌ Erreur:', result);
            throw new Error(result.message || result.error || `Erreur API: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Succès:', result);
        return result;
    } catch (error) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('💥 ERREUR:', error);
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        if (error instanceof TypeError && error.message.includes('Network request failed')) {
            const localIP = getLocalIP();
            const troubleshooting = `
🚫 Connexion impossible au serveur

📍 URL tentée: ${fullUrl}
🖥️ IP détectée automatiquement: ${localIP}
📱 Plateforme: ${Platform.OS}

✅ CHECKLIST DE DÉPANNAGE:

1️⃣ API Symfony démarrée ?
   Terminal API:
   cd API
   php -S 0.0.0.0:8000 -t public
   
   Vous devez voir: "PHP 8.x Development Server (http://0.0.0.0:8000) started"

2️⃣ Test navigateur téléphone
   Sur votre téléphone, ouvrez Chrome et allez sur:
   http://${localIP}:8000/api

   ✅ Si ça marche: vous voyez la page API Platform
   ❌ Si ça ne marche pas: problème réseau (voir étapes 3-5)

3️⃣ Même réseau WiFi ?
   PC et téléphone doivent être connectés au MÊME WiFi
   Vérifiez dans les paramètres réseau de chaque appareil

4️⃣ Vérifier l'IP détectée
   L'IP auto-détectée est: ${localIP}
   Vérifiez avec: ipconfig (Windows) ou ifconfig (Mac/Linux)
   Si incorrecte, il y a un problème avec Expo

5️⃣ Pare-feu Windows ?
   Autorisez le port 8000 (TCP entrant)
   Windows + R → wf.msc → Règles de trafic entrant
            `;

            throw new Error(troubleshooting);
        }

        throw error;
    }
}

export { API_URL };

