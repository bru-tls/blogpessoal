import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService{
    constructor(
        @InjectRepository(Postagem)

        //select * from tb_postagem;
        private PostagemRepository: Repository<Postagem>
        ){}

        async findAll(): Promise<Postagem[]>{
            return await this.PostagemRepository.find();

        }

// select * from tb_postagem where id = (?);
        async findById(id:number): Promise<Postagem> {
            let postagem = await this.PostagemRepository.findOne({
                where:{id}
            });

            if (!postagem)
                throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND);
                        return postagem;
        }
  
  // select * from tb_postagem where titulo like '%titulo%';
        async findByTitulo(titulo: string): Promise<Postagem[]>{
            return await this.PostagemRepository.find({
                where:{titulo: ILike(`%${titulo}%`)}
                        })
     }

     // insert into tb_postagem(titulo,texto, data) values (?,?,(?sozinho))
     async create(postagem: Postagem): Promise<Postagem>{
        return await this.PostagemRepository.save(postagem);
     }

    // update tb_postagem set titulo = ?, texto =?, data=server where id =?
     async upDate(postagem: Postagem): Promise<Postagem>{
let buscaPostagem: Postagem = await this.findById(postagem.id);
if(!buscaPostagem || !postagem.id)
    throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
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