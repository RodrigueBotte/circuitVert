import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  logo: {
    width: 139,
    height: 133,
  },
  containerForm: {
    width: 300,
    height: "auto",
    borderWidth: 2,
    borderColor: colors.lightColor,
    backgroundColor: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 15,
    borderRadius: 15,
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: fonts.happyMonkey,
  },
  containerInput: {
    gap: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: colors.boldColor,
    padding: 10,
    borderRadius: 15,
  },
  button: {
    backgroundColor: colors.lightColor,
    borderRadius: 15,
    width: 150,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: fonts.happyMonkey,
    fontSize: 18,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 15,
  },
  typeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightColor,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: colors.lightColor,
  },
});
