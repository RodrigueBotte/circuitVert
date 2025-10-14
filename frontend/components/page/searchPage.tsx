// import React, { useState, useRef } from 'react';
// import { 
//   View, 
//   TextInput, 
//   TouchableOpacity, 
//   Text, 
//   StyleSheet,
//   ScrollView,
//   Platform 
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { Ionicons } from '@expo/vector-icons';

// interface Farm {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   type: string;
//   description: string;
// }

// export default function MapScreen() {
//   const mapRef = useRef<MapView>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedType, setSelectedType] = useState<string | null>(null);
//   const [showFilters, setShowFilters] = useState(false);

//   const [farms, setFarms] = useState<Farm[]>([
//     {
//       id: 1,
//       name: 'Ferme Bio du Nord',
//       latitude: 48.8566,
//       longitude: 2.3522,
//       type: 'bio',
//       description: 'Légumes bio de saison'
//     },
//     {
//       id: 2,
//       name: 'La Ferme des Prés',
//       latitude: 48.8606,
//       longitude: 2.3376,
//       type: 'laitier',
//       description: 'Produits laitiers fermiers'
//     },
//     {
//       id: 3,
//       name: 'Verger du Soleil',
//       latitude: 48.8506,
//       longitude: 2.3422,
//       type: 'fruits',
//       description: 'Fruits et jus de fruits'
//     },
//   ]);

//   const farmTypes = [
//     { id: 'bio', label: '🌱 Bio', color: '#4caf50' },
//     { id: 'laitier', label: '🥛 Laitier', color: '#2196f3' },
//     { id: 'fruits', label: '🍎 Fruits', color: '#ff9800' },
//     { id: 'legumes', label: '🥕 Légumes', color: '#8bc34a' },
//     { id: 'viande', label: '🥩 Viande', color: '#f44336' },
//   ];

//   const filteredFarms = farms.filter(farm => {
//     const matchesSearch = farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          farm.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType = !selectedType || farm.type === selectedType;
//     return matchesSearch && matchesType;
//   });

//   const handleSearch = (text: string) => {
//     setSearchQuery(text);
//   };

//   const handleFilterSelect = (typeId: string) => {
//     setSelectedType(selectedType === typeId ? null : typeId);
//   };

//   const handleMarkerPress = (farm: Farm) => {
//     mapRef.current?.animateToRegion({
//       latitude: farm.latitude,
//       longitude: farm.longitude,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Barre de recherche */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Rechercher une ferme..."
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Ionicons name="close-circle" size={20} color="#666" />
//             </TouchableOpacity>
//           )}
//         </View>

//         <TouchableOpacity
//           style={styles.filterButton}
//           onPress={() => setShowFilters(!showFilters)}
//         >
//           <Ionicons 
//             name="filter" 
//             size={24} 
//             color={selectedType ? '#6200ee' : '#333'} 
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Filtres */}
//       {showFilters && (
//         <View style={styles.filtersContainer}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {farmTypes.map((type) => (
//               <TouchableOpacity
//                 key={type.id}
//                 style={[
//                   styles.filterChip,
//                   selectedType === type.id && { 
//                     backgroundColor: type.color,
//                     borderColor: type.color 
//                   }
//                 ]}
//                 onPress={() => handleFilterSelect(type.id)}
//               >
//                 <Text
//                   style={[
//                     styles.filterChipText,
//                     selectedType === type.id && styles.filterChipTextActive
//                   ]}
//                 >
//                   {type.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       )}

//       {/* Carte avec OpenStreetMap (Gratuit !) */}
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={{
//           latitude: 48.8566,
//           longitude: 2.3522,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation
//         showsMyLocationButton
//       >
//         {filteredFarms.map((farm) => (
//           <Marker
//             key={farm.id}
//             coordinate={{
//               latitude: farm.latitude,
//               longitude: farm.longitude,
//             }}
//             title={farm.name}
//             description={farm.description}
//             onPress={() => handleMarkerPress(farm)}
//             pinColor={farmTypes.find(t => t.id === farm.type)?.color || '#6200ee'}
//           />
//         ))}
//       </MapView>

//       {/* Compteur de résultats */}
//       <View style={styles.resultsBadge}>
//         <Text style={styles.resultsBadgeText}>
//           {filteredFarms.length} ferme{filteredFarms.length > 1 ? 's' : ''} trouvée{filteredFarms.length > 1 ? 's' : ''}
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   searchContainer: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 60 : 20,
//     left: 10,
//     right: 10,
//     zIndex: 10,
//     flexDirection: 'row',
//     gap: 10,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   filterButton: {
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   filtersContainer: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 120 : 80,
//     left: 10,
//     right: 10,
//     zIndex: 10,
//   },
//   filterChip: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 10,
//     borderWidth: 2,
//     borderColor: '#e0e0e0',
//   },
//   filterChipText: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '500',
//   },
//   filterChipTextActive: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   map: {
//     flex: 1,
//   },
//   resultsBadge: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   resultsBadgeText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
// });