import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { apiFetch } from "../service/api";
import { styles } from "../style/register.styles";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/constants/colors";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user"); // par défaut simple user

  const handleRegister = async () => {
    try {
      const data = await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({ email, password, type }),
      });
      Alert.alert("Succès", "Compte créé avec succès !");
      router.push("/login"); // on ira vers la page login après
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Erreur", "Une erreur inconnue s'est produite.");
      }
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
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Inscription</Text>
          <View style={styles.containerForm}>
            <View style={styles.containerInput}>
              <Text>Email :</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
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
              />
            </View>
            <View style={styles.typeContainer}>
              <TouchableOpacity onPress={() => setType("user")}>
                <Text
                  style={[
                    styles.typeButton,
                    type === "user" && styles.selected,
                  ]}
                >
                  Utilisateur
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setType("pro")}>
                <Text
                  style={[styles.typeButton, type === "pro" && styles.selected]}
                >
                  Professionnel
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>S&apos;inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
