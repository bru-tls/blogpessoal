import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { TemaModule } from "../tema/entities/tema.module";
import { PostagemService } from "./services/postagem.service";
import { TemaService } from "../tema/services/tema.service";
import { PostagemController } from "./controllers/postagem.controller";

@Module({
imports: [TypeOrmModule.forFeature([Postagem]),TemaModule],
providers: [PostagemService, TemaService],
controllers: [PostagemController],
exports: [TypeOrmModule]

})

export class  PostagemModule{ }