import ApiService from '../apiservice'

export default class CadastroProcessoService extends ApiService{

    constructor(){
        super('/ps')
    }

    cadastrar(processo){
        return this.post('', processo);
    }

    listar(){
        return this.get('');
    }
}