import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerElement: {
    padding: 20,
    gap: 5,
  },
  containerTitle: {
    flexDirection: "row",
  },
  number: {
    color: colors.boldColor,
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationColor: colors.lightColor,
    textShadowOffset: { width: 0, height: 1 },
    textShadowColor: colors.lightColor,
  },
  response:{
    fontSize: 14,
  },
  mentions:{
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: colors.lightColor,
    textShadowOffset: { width: 0, height: 1 },
    textShadowColor: colors.lightColor,
  }
});
