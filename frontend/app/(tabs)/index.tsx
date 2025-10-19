import { styles } from "@/components/style/general.styles";
import BtnLink from "@/components/ui/btnLink";
import TextContain from "@/components/ui/textContain";
import colors from "@/constants/colors";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.backTheme }}
      edges={["top", "left", "right"]}
    >
      <ScrollView style={{ flex: 1, backgroundColor: colors.backTheme }}>
        <View style={styles.containerLogo}>
          <Image
            source={require("@/assets/imageCV/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.textLogo}>
            Circuit <Text style={{color: colors.boldColor}}>Vert</Text>
          </Text>
        </View>
        <View style={styles.containerText}>
          <TextContain
            textStyle={styles.textContain}
            text="Découvrez les fermes près de chez vous qui vendent en direct !"
          />
          <TextContain
            textStyle={styles.textContain}
            text="Envie de consommer local, de saison et en toute transparence ?"
          />
          <TextContain
            textStyle={styles.textContain}
            text="Notre application vous permet de trouver facilement des producteurs qui proposent leurs produits en vente directe : à la ferme, en box, sur les marchés ou via des points de retrait."
          />
          <TextContain
            textStyle={styles.textContain}
            text="Soutenez les producteurs, réduisez les intermédiaires, et mangez mieux ! En quelques clics, rapprochez-vous du bon, du vrai, du local."
          />
          <View style={styles.btnContainer}>
            <BtnLink
              lien={"/login"}
              btnStyle={styles.btnStyle}
              textStyle={styles.textBtn}
              text="Comment ça marche?"
            />
            <BtnLink
              lien={"/register"}
              btnStyle={styles.btnStyle}
              textStyle={styles.textBtn}
              text="Qui suis-je?"
            />
            <BtnLink
              lien={"/question"}
              btnStyle={styles.btnStyle}
              textStyle={styles.textBtn}
              text="Toutes vos questions"
            />
            <BtnLink
              lien={"/how"}
              btnStyle={styles.btnStyle}
              textStyle={styles.textBtn}
              text="Contact"
            />
          </View>
          <View style={styles.reseaux}>
            <Link href={"https://www.facebook.com/?locale=fr_FR"}>
              <FontAwesome5
                name="facebook"
                size={60}
                color={colors.boldColor}
              />
            </Link>
            <Link href={"https://www.linkedin.com/feed/"}>
              <Entypo
                name="linkedin-with-circle"
                size={60}
                color={colors.boldColor}
              />
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
