import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { Repository } from "typeorm";

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

    }