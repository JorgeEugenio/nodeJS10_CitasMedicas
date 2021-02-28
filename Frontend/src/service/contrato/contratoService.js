import axios from 'axios'
const { URL } = require('../ConfigService')


export default class ContratoService {


    async getContratos(){
        try {
            const contratos = await axios.get(URL + 'contrato')
            return contratos
            
        } catch (e) {
            console.log(e);
        }
    }
}
