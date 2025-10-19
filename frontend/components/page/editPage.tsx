import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { apiFetch } from "@/components/service/api";
import { styles } from "@/components/style/edit-profile.styles";

interface UserProfile {
  id: number;
  email: string;
  type: string;
  roles: string[];
  nom?: string;
  sirret?: string;
}

export default function EditProfileScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [sirret, setSirret] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/user/me", { method: "GET" });
      setUser(data);
      setEmail(data.email);
      if (data.type === "pro") {
        setNom(data.nom || "");
        setSirret(data.sirret || "");
      }
    } catch (error) {
      console.error("❌ Erreur chargement profil:", error);
      if (Platform.OS === "web") {
        window.alert("Impossible de charger le profil");
      } else {
        Alert.alert("Erreur", "Impossible de charger le profil");
      }
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!email.trim()) {
      if (Platform.OS === "web") {
        window.alert("L'email est requis");
      } else {
        Alert.alert("Erreur", "L'email est requis");
      }
      return;
    }

    if (password && password !== confirmPassword) {
      if (Platform.OS === "web") {
        window.alert("Les mots de passe ne correspondent pas");
      } else {
        Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      }
      return;
    }

    if (password && password.length < 6) {
      if (Platform.OS === "web") {
        window.alert("Le mot de passe doit contenir au moins 6 caractères");
      } else {
        Alert.alert(
          "Erreur",
          "Le mot de passe doit contenir au moins 6 caractères"
        );
      }
      return;
    }

    try {
      setSaving(true);

      const updateData: any = { email: email.trim() };

      // Ajoute le mot de passe seulement s'il a été rempli
      if (password) {
        updateData.password = password;
      }

      if (user?.type === "pro") {
        updateData.nom = nom.trim();
        updateData.sirret = sirret.trim();
      }

      await apiFetch("/user/me", {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      console.log("✅ Profil mis à jour");

      if (Platform.OS === "web") {
        window.alert("Profil mis à jour avec succès !");
      } else {
        Alert.alert("Succès", "Profil mis à jour avec succès !");
      }

      router.back();
    } catch (error) {
      console.error("❌ Erreur mise à jour:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de la mise à jour";

      if (Platform.OS === "web") {
        window.alert(message);
      } else {
        Alert.alert("Erreur", message);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du compte</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!saving}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Nouveau mot de passe{" "}
              <Text style={styles.optional}>(optionnel)</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password-new"
              placeholder="Laisser vide pour ne pas changer"
              editable={!saving}
            />
          </View>

          {password.length > 0 && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmer le mot de passe</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="password-new"
                placeholder="Confirmez votre nouveau mot de passe"
                editable={!saving}
              />
            </View>
          )}

          {user?.type === "pro" && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom de l entreprise</Text>
                <TextInput
                  style={styles.input}
                  placeholder={nom}
                  onChangeText={setNom}
                  editable={!saving}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Numéro SIRET</Text>
                <TextInput
                  style={styles.input}
                  placeholder={sirret}
                  onChangeText={setSirret}
                  keyboardType="numeric"
                  editable={!saving}
                />
              </View>
            </>
          )}
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>
                Enregistrer les modifications
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cancelButton, saving && styles.buttonDisabled]}
            onPress={handleCancel}
            disabled={saving}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
