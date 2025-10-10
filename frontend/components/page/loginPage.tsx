import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { styles } from "../style/login.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    // on gere l'attente du chargement en retirant le bouton pour éviter le double clique
    setLoading(true);

    if (!email || !password) {
      // vérification de la complétion des champs
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      // on remet le bouton
      setLoading(false);
      return;
    }

    try {
      const requestBody = {
        // trim pour éviter les espaces inutiles
        email: email.trim(),
        password: password,
      };

      const response = await fetch("http://localhost:8000/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Erreur parsing JSON:", e);
        throw new Error("Réponse serveur invalide");
      }

      if (!response.ok) {
        console.error("Réponse not OK");
        throw new Error(
          data.message || data.error || `Erreur ${response.status}`
        );
      }

      if (!data.token) {
        console.error("Pas de token dans la réponse");
        throw new Error("Aucun token reçu");
      }

      await AsyncStorage.setItem("token", data.token);

      Alert.alert("Succès", "Connexion réussie !");
      router.push("/login");
    } catch (error) {
      console.error("Erreur:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur inconnue s'est produite.";
      Alert.alert("Erreur", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.backTheme }}
      edges={["top", "left", "right"]}
    >
      <ScrollView style={{ flex: 1, backgroundColor: colors.backTheme }}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/imageCV/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Connexion</Text>
          <View style={styles.containerForm}>
            <View style={styles.containerInput}>
              <Text>Email :</Text>
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
              <Text>Mot de passe :</Text>
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
                <Text style={styles.btnTtext}>Se connecter</Text>
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
    </SafeAreaView>
  );
}
