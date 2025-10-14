import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 600,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
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
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 14,
    color: "#2e7d32",
    fontWeight: "500",
  },
  section: {
    width: 287,
    height: 345,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: colors.lightColor,
    backgroundColor: "#fff",
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 15,
    fontFamily: fonts.happyMonkey
  },
  infoRow: {
    width: '80%',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  actionsSection: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 15
  },
  button: {
    backgroundColor: "#6200ee",
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
    paddingVertical: 10
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#d32f2f",
    paddingVertical: 10
  },
  logoutButtonText: {
    color: "#d32f2f",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
