import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: fonts.happyMonkey,
  },
  labelText: {
    fontSize: 14,
    textDecorationLine: "underline",
    textDecorationColor: colors.lightColor,
    textShadowOffset: { width: 0, height: 1 },
    textShadowColor: colors.lightColor,
  },
  input: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.boldColor,
    paddingHorizontal: 15,
    paddingVertical: 12,
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    width: 150,
    backgroundColor: colors.lightColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 16,
  },
  btnText: {
    color: "black",
    fontFamily: fonts.happyMonkey,
    fontWeight: "500",
  },
  buttonDisabled: {
    backgroundColor: colors.boldColor,
  },
  containerInput: {
    gap: 5,
  },
  linkText: {
    alignItems: "center",
  },
  logo: {
    width: 139,
    height: 133,
  },
  containerForm: {
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
});
