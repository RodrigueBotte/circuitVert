import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, ScrollView, Image, Platform,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { styles } from "../style/login.styles";
import colors from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { apiFetch } from "@/components/service/api"; 

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!email || !password) {
      showAlert("Erreur", "Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      const requestBody = {
        email: email.trim(),
        password: password,
      };

      // ✅ CORRECT - Utiliser apiFetch
      const data = await apiFetch("/login_check", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (!data.token) {
        console.error("Pas de token dans la réponse");
        throw new Error("Aucun token reçu");
      }

      // Sauvegarder le token
      await AsyncStorage.setItem("token", data.token);

      showAlert("Succès", "Connexion réussie !");
      router.push("/profile");
    } catch (error) {
      console.error("Erreur:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur inconnue s'est produite.";
      showAlert("Erreur", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.backTheme }} contentContainerStyle={{ paddingVertical: 30 }}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/imageCV/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Connexion</Text>
          <View style={styles.containerForm}>
            <View style={styles.containerInput}>
              <Text style={styles.labelText}>Email :</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!loading}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.labelText}>Mot de passe :</Text>
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                editable={!loading}
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Se connecter</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/register")}
              disabled={loading}
            >
              <Text style={styles.linkText}>
                Pas encore de compte ? S&apos;inscrire{" "}
                <AntDesign name="arrow-right" size={15} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
}
