import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "@/components/service/api";
import { styles } from "@/components/style/profile.styles";

interface UserProfile {
  id: number;
  email: string;
  type: string;
  roles: string[];
  nom?: string;
  sirret?: string;
}

export default function ProfileScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/user/me", {
        method: "GET",
      });

      console.log("✅ Profil chargé:", data);
      setUser(data);
      router.push("/profile");
    } catch (error) {
      console.error("❌ Erreur chargement profil:", error);
      Alert.alert("Erreur", "Impossible de charger le profil");
      // Si le token est invalide, rediriger vers login
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          router.push("/login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Chargement du profil...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Impossible de charger le profil</Text>
        <TouchableOpacity style={styles.button} onPress={loadProfile}>
          <Text style={styles.buttonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.email.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.emailText}>{user.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {user.type === "pro" ? "🏢 Professionnel" : "👤 Utilisateur"}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Type de compte</Text>
          <Text style={styles.infoValue}>
            {user.type === "pro" ? "Professionnel" : "Utilisateur"}
          </Text>
        </View>

        {user.nom && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nom de l&apos;entreprise</Text>
            <Text style={styles.infoValue}>{user.nom}</Text>
          </View>
        )}

        {user.sirret && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SIRRET</Text>
            <Text style={styles.infoValue}>{user.sirret}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Rôles</Text>
          <Text style={styles.infoValue}>{user.roles.join(", ")}</Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.editButtonText}>Modifier le profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
