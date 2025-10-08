import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding: 20,
    gap: 15
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    borderColor: colors.boldColor,
    width: 195,
    height: 22,

  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button:{},
  buttonDisabled:{},
  buttonText:{},
  linkText: {},
  logo: {
    width: 139,
    height: 133,
  },
  containerForm: {
    width: 287,
    height: 345,
    flexDirection: 'column',
    justifyContent: "space-around",
    alignItems: 'center',
    borderColor: colors.lightColor,
    borderWidth: 2,
    padding: 15,
    borderRadius: 15
  }
});
