import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";

@Injectable()
export class PostagemService{
    constructor(
        @InjectRepository(Postagem)
    
        //select * from tb_postagem;
        private PostagemRepository: Repository<Postagem>,
        private temaService:TemaService

        ){}

        async findAll(): Promise<Postagem[]>{
            return await this.PostagemRepository.find({
                relations: {tema: true, usuario:true}
            });

        }

// select * from tb_postagem where id = (?);
        async findById(id:number): Promise<Postagem> {
            let postagem = await this.PostagemRepository.findOne({
                where:{id},
                relations: {tema: true,usuario:true}
            });

            if (!postagem)
                throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND);
                        return postagem;
        }
  
  // select * from tb_postagem where titulo like '%titulo%';
        async findByTitulo(titulo: string): Promise<Postagem[]>{
            return await this.PostagemRepository.find({
                where:{titulo: ILike(`%${titulo}%`)},
                relations: {tema: true, usuario:true}
                        })
     }

     // insert into tb_postagem(titulo,texto, data) values (?,?,(?sozinho))
     async create(postagem: Postagem): Promise<Postagem>{
        if (postagem.tema){
            let tema = await this.temaService.findById(postagem.tema.id)
            if(!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            
            return await this.PostagemRepository.save(postagem);

        }
            return await this.PostagemRepository.save(postagem);
     }

    // update tb_postagem set titulo = ?, texto =?, data=server where id =?
     async upDate(postagem: Postagem): Promise<Postagem>{
let buscaPostagem: Postagem = await this.findById(postagem.id);
if(!buscaPostagem || !postagem.id)
    throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
        
if (postagem.tema){
    let tema =await this.temaService.findById(postagem.tema.id)
    
    if (!tema)
        throw new HttpException('Tema não foi encontrada!', HttpStatus.NOT_FOUND)
  
    return await this.PostagemRepository.save(postagem);
}

return await this.PostagemRepository.save(postagem);
     }
    
     // SET SQL_SAFE_UPDATES = 0; 
    // DROP DATABASE db_ 

async delete(id:number): Promise<DeleteResult>{
let buscaPostagem: Postagem = await this.findById(id);
if(!buscaPostagem)
    throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
return await this.PostagemRepository.delete(id);    

}
//getByDescricao() com a função de trazer 
//todas Postagem cujo a descrição possua a palavra pesquisada.

async findByDescricao(texto: string): Promise<Postagem[]>{
    return await this.PostagemRepository.find({
        where:{texto: ILike(`%${texto}%`)}
                })
}

}