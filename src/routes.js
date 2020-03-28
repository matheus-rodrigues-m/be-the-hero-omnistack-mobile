import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//Importanto do react o que deve sempre ficar em volta de cada uma das rotas
import { createStackNavigator } from '@react-navigation/stack'; //Importando a função de criação de navegação

const AppStack = createStackNavigator(); //Primeira navegação criada

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() //Exporta as rotas para outros arquivos
{
    return( //Retorna as rotas da aplicação
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail"component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>

    );
}