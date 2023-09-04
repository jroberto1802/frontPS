import ApiService from '../apiservice'

export default class CandidatoService extends ApiService{

    constructor(){
        super('/candidatos')
    }

    cadastrar(candidato){
        return this.post('', candidato);
    }

    listar(){
        return this.get('');
    }

    buscarId(id){
        return this.get(`/${id}`);
    }

    alterar(id, obj){
        return this.put(`/${id}`, obj)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    alterarDistancia(id, obj){
        return this.put(`/${id}/distancia`, obj)
    }

}