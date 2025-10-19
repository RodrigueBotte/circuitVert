import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  logo: {
    width: 139,
    height: 133,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    marginBottom: 20,
  },
  section: {
    width: "85%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: colors.lightColor,
    backgroundColor: "#fff",
    borderWidth: 2,
    paddingVertical: 35,
    borderRadius: 15,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 15,
    fontFamily: fonts.happyMonkey,
  },
  infoRow: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 5
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: 'underline',
    textDecorationColor: colors.lightColor,
    textShadowOffset: { width: 0, height: 1},
    textShadowColor: colors.lightColor
  },
  infoValue: {
    fontSize: 17,
    color: "#333",
    fontWeight: "500",
  },
  actionsSection: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 15,
  },
  button: {
    backgroundColor: colors.lightColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: colors.lightColor,
    borderRadius: 15,
    paddingVertical: 16,
  },
  editButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#d32f2f",
    paddingVertical: 16,
  },
  logoutButtonText: {
    color: "#d32f2f",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
