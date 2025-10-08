import colors from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {},
  textBase: {},
  logo: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  containerLogo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingTop: 5,
  },
  textLogo: {
    fontSize: 35,
  },
  containerText: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 15,
    gap: 20,
    height:200
  },
  textContain: {},
  btnContainer: {
    height: 300,
    justifyContent: "space-around",
    alignItems: "center",

  },
  btnStyle: {
    borderColor: colors.lightColor,
    borderWidth: 1,
    backgroundColor: "#fff",
    width: 326,
    height: 47,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  textBtn: {
    fontFamily: require('@/assets/font/HappyMonkey-Regular.ttf'),
    fontSize: 20
  },
  reseaux: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
