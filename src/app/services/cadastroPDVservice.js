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

    listarById(id){
        return this.get('/'+id)
    }
}

export default CadastroPDVService;