import React from 'react'; //Importando os recursos do React
import { useNavigation, useRoute } from '@react-navigation/native'; //Importa possibilidade de link com outras páginas
import { Feather } from '@expo/vector-icons';//Importação dos pac. de ícones
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native'; //Importação ds recursos do React
import * as MailComposer from 'expo-mail-composer'; //Importando todas as config. do Mail Composer

import logoImg from '../../assets/logo.png'; //Importa as imagens de logo (com este nome, tem ajuste autom.)

import styles from './styles'; //Importa a estilização do styles desta pasta.

export default function Detail() {
    const navigation = useNavigation(); //Const. para fazer navegação
    const rout = useRoute(); //Usar rota pra linkar a informação obtida no Incident para este index

    const incident = rout.params.incident; //Pega o incident do 'navigateToDetail(incident)' do Incidents
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`;


    function navigateBack() { //Função para navegar para a página anterior
        navigation.goBack(); //Vai para a página anterior
    }

    function sendMail() { //Função de envio de e-mail no botão
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`, //Objeto do Email
            recipients: [incident.email], //Email de endereço
            body: message, //Corpo da mensagem
        })

    }

    function sendWhatsapp() { //Função de envio de msg no whatsapp
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`); //Envio da mensagem para determinado numero

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.value)}
                </Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

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