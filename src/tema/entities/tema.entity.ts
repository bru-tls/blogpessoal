import { IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"


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