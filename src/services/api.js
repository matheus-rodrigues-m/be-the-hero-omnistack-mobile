import axios from 'axios'; //Importando recursos do axios
import 'intl'; //Importando recursos de formatação numérica do intl
import 'intl/locale-data/jsonp/pt-BR'; //Recursos de pt-BR

const api = axios.create({
    baseURL: 'http://192.168.0.106:3333' //Estabelecimento da conexão com IP da máquina host (meu pc)/porta do back
});

export default api;