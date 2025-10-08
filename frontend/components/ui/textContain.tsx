import { StyleProp, Text, TextStyle } from "react-native"

interface TextContainProps{
    textStyle: StyleProp<TextStyle>
    text: string
}

export default function TextContain({textStyle, text}: TextContainProps) {
    return (
        <Text style={textStyle}>
            {text}
        </Text>
    )
}