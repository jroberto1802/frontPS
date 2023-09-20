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

    deletar(id){
        return this.delete(`/${id}`)
    }

    alterar(id, obj){
        return this.put(`/${id}`, obj)
    }
}

export default CadastroPDVService;