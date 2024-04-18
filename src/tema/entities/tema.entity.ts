import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_temas"})
export class Tema {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string

// Criar a Relação 1-n oneToMany
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
postagem: Postagem[] // Listar todas as Postagens associadas a um tema
    
}