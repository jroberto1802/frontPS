import ApiService from '../apiservice'

class CadastroPDVService extends ApiService{

    constructor(){
        super('/pdvs')
    }

    cadastrar(usuario){
        return this.post('', usuario);
    }

    listar(){
        return this.get('');
    }
}

export default CadastroPDVService;