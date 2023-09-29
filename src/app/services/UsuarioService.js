import ApiService from '../apiservice'

class UsuarioService extends ApiService{

    constructor(){
        super('/user')
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

export default UsuarioService;