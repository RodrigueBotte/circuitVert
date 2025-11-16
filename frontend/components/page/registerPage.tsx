import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, Platform,} from "react-native";
import { apiFetch } from "../service/api";
import { styles } from "../style/register.styles";
import { router } from "expo-router";
import colors from "@/constants/colors";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("user");
  const [nom, setNom] = useState("");
  const [sirret, setSirret] = useState("");

const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showAlert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const body: any = { email, password, type };

      // Ajoute nom et siret seulement si pro
      if (type === "pro") {
        body.nom = nom;
        body.sirret = sirret;
      }

      const data = await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify(body),
      });

      showAlert("Succès", "Compte créé avec succès !");
      router.push("/login"); // on ira vers la page login après

    } catch (error) {

      if (error instanceof Error) {
        showAlert("Erreur", error.message);
      } else {
        showAlert("Erreur", "Une erreur inconnue s'est produite.");
      }
    }
  };

  return (
      <ScrollView 
        style={{ flex: 1, backgroundColor: colors.backTheme }} 
        contentContainerStyle={{ paddingVertical: 30 }}
      >
        <View style={styles.container}>
          <Image
            source={require("@/assets/imageCV/logo.png")}
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
            <View style={styles.containerInput}>
              <Text>Confirmer le mot de passe :</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
            {type === "pro" && (
              <>
                <View style={styles.containerInput}>
                  <Text>Nom de l&apos;entreprise :</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom de l'entreprise"
                    value={nom}
                    onChangeText={setNom}
                  />
                </View>
                <View style={styles.containerInput}>
                  <Text>Numéro SIRET :</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Numéro SIRET"
                    value={sirret}
                    onChangeText={setSirret}
                  />
                </View>
              </>
            )}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>S&apos;inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
}
