import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Href, Link, router } from "expo-router";
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface btnLinksProps{
    lien: any
    btnStyle: StyleProp<ViewStyle>
    textStyle: StyleProp<TextStyle>
    text: string
}

export default function BtnLink({ lien, btnStyle, textStyle, text }: btnLinksProps) {
  const [fontsLoaded] = useFonts({
    'monkey': require('@/assets/font/HappyMonkey-Regular.ttf')
  })
  return (

      <TouchableOpacity style={btnStyle} onPress={()=> router.navigate(lien)}>
        <Text style={textStyle}>{text}</Text>
        <Feather name="arrow-right" size={24} color="black" />
      </TouchableOpacity>
  )
}