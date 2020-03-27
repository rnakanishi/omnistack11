import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import logoImage from "../../assets/logo.png";
import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Ola, ${incident.name}, mensagem default do caso ${
    incident.title
  } com o valor de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)} reais`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`
    );
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImage} />
        <TouchableOpacity style={styles.detailsButton} onPress={navigateBack}>
          <Feather name="arrow-left" size={32} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG: </Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>Caso: </Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>Valor: </Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Sjea o heroi desse caso!</Text>
        <Text style={styles.heroDescription}>Entre em contato: </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
