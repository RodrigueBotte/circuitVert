import colors from "@/constants/colors";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../style/question.styles";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function QuestionPage() {
  const data = [
    {
      id: 1,
      question: "A quoi sert cette application?",
      reponse:
        "Cette application permet de trouver facilement des producteurs locaux qui vendent en direct : à la ferme, en box, sur les marchés, etc. L’objectif est de consommer local, de saison, et de soutenir les agriculteurs.",
    },
    {
      id: 2,
      question: "Comment trouver un producteur près de chez moi?",
      reponse:
        "Vous pouvez utiliser la recherche par géolocalisation pour afficher les producteurs autour de vous, ou utiliser la barre de recherche pour cibler une ville ou une région spécifique.",
    },
    {
      id: 3,
      question: "Puis-je filtrer les produits?",
      reponse:
        "Oui ! Vous pouvez filtrer votre recherche selon les catégories qui vous intéressent : fruits, légumes, viande, produits laitiers, œufs, etc.",
    },
    {
      id: 4,
      question: "Comment garder en mémoire mes producteurs préférés?",
      reponse:
        "Un système de favoris est disponible. Cliquez simplement sur l’icône associée à un producteur pour l’ajouter à votre liste personnelle. Vous pourrez ainsi les retrouver facilement à chaque visite.",
    },
    {
      id: 5,
      question: "Les informations sont-elles mises à jour régulièrement?",
      reponse:
        "Nous faisons en sorte de garder les informations à jour, mais n’hésitez pas à nous signaler une erreur ou un changement via le formulaire de contact.",
    },
    {
      id: 6,
      question: "Est-ce que je peux contacter les producteurs directement?",
      reponse:
        "Oui, chaque fiche producteur contient ses coordonnées (adresse, téléphone, email ou site internet) si elles ont été fournies.",
    },
    {
      id: 7,
      question: "L'application est-elle gratuite?",
      reponse:
        "Oui, cette application est entièrement gratuite pour les utilisateurs comme pour les producteurs.",
    },
    {
      id: 8,
      question: "Tous les producteurs peuvent-ils s’inscrire librement?",
      reponse:
        "Lorsqu’un agriculteur ou producteur s’inscrit, une vérification manuelle est effectuée pour garantir que seuls de véritables professionnels bénéficient de la visibilité offerte par l’application. Cela permet de maintenir la qualité et la fiabilité des informations proposées.",
    },
  ];
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.backTheme }}
      edges={["top", "left", "right"]}
    >
      <ScrollView style={{ flex: 1, backgroundColor: colors.backTheme }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.containerElement}>
              <View style={styles.containerTitle}>
                <Text style={styles.number}>{item.id}. </Text>
                <Text style={styles.title}>{item.question}</Text>
              </View>
              <Text style={styles.response}>{item.reponse}</Text>
            </View>
          )}
        />
        <Link href={'/'} style={styles.mentions}>Mentions légales <AntDesign name="arrow-right" size={20} color="black" /></Link>
      </ScrollView>
    </SafeAreaView>
  );
}
