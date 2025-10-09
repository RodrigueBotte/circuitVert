import colors from "@/constants/colors";
import fonts from "@/constants/fonts";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
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
    fontFamily: fonts.happyMonkey
  },
  containerText: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 15,
    gap: 20,
    height: 200,
  },
  textContain: {
    fontSize: 15,
    
  },
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
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  textBtn: {
    fontFamily: fonts.happyMonkey,
    fontSize: 20,
  },
  reseaux: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
