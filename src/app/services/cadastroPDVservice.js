import ApiService from '../apiservice'

export default class CadastroPDVService extends ApiService{

    constructor(){
        super('/pdvs')
    }

    cadastrar(usuario){
        return this.post('', usuario);
    }
}