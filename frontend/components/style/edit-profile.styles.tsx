import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  content: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  section: {
    width: "85%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: colors.lightColor,
    backgroundColor: "#fff",
    borderWidth: 2,
    paddingVertical: 30
    ,
    borderRadius: 15,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: fonts.happyMonkey
  },
  inputGroup: {
    width: '80%'
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  optional: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#999",
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
  },
  infoBox: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#1976d2",
    lineHeight: 20,
  },
  actionsSection: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 10,
  },
  saveButton: {
    backgroundColor: colors.lightColor,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  saveButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.lightColor,
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
