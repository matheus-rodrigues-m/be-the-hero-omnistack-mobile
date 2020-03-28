import React, {useEffect, useState} from 'react'; //Importando os recursos do React
import { Feather } from '@expo/vector-icons';//Importação dos pac. de ícones
import { useNavigation } from '@react-navigation/native'; //Importa possibilidade de link com outras páginas
import { View, FlatList , Image, Text, TouchableOpacity } from 'react-native'; //Importação ds recursos do React
import logoImg from '../../assets/logo.png'; //Importa as imagens de logo (com este nome, tem ajuste autom.)

import styles from './styles'; //Importa a estilização do styles desta pasta.

import api from '../../services/api'; //Importando recursos do arquivo de api

export default function Incidents() {
    const [incidents, setIncidents] = useState([]); //Recebe os dados de incidents que virão do estado
    const [total, setTotal] = useState(0); //Receber total de casos
    const [page, setPage] = useState(1); //Controle de número da página
    const [loading, setLoading] = useState(false);//Estado de loading para carregar uma página por vez

    const navigation = useNavigation(); //Const. para fazer navegação

    function navigateToDetail(incident){ //Função para navegar para a página de Detail
        navigation.navigate('Detail', {incident}); //Vai para o Detail, definido no 'routes.js'
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {params: {page}});

        setIncidents([... incidents, ...response.data]); //Coloca todos os dados existentes dentro de uma mesma página 
        setTotal(response.headers['x-total-count']); //Recebe o total de registros contados pelo x-total-count
        setPage(page + 1); //Pular para a próxima página a cada execução do estado
        setLoading(false); //Retorna novamente o valor padrão do estado
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList data={incidents} style={styles.incidentList} //Flatlist faz o processo de rolagem
            //agora os dados em 'data', serão os incidents encontrados no servidor, pela função mais acima
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false} //Esconde a barra de rolagem
            onEndReached={loadIncidents} //Função disparada automaticamente quando o usuário chegar ao fim da lista, no caso, vai carregar as outras listas de casos existentes e colocar nesta mesma página (estilo instagram)
            onEndReachedThreshold={0.2} //Quando o usuário estiver a 20% de deistância do fim, vai carregar o onEndReached
            renderItem={({ item: incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', 
                    {style: 'currency', 
                    currency: 'BRL' }).format(incident.value)}</Text>

                    <TouchableOpacity 
                    style={styles.detailsButton} onPress={() => navigateToDetail(incident)}> 

                        <Text style={styles.detailsButtonText}>Ver Mais Detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>
            )} /> 
        </View>
    );
}