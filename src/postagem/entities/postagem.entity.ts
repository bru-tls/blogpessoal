import { IsNotEmpty, isNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"tb_postagem"})
export class Postagem{

@PrimaryGeneratedColumn()
    id: number;
 
  @IsNotEmpty()
    @Column({length:100, nullable: false})
    titulo: string;
    
    @Column({length:1000, nullable: false})
    texto: string ;

 @UpdateDateColumn()
   data: Date; 

   // Criar a Relação ManytoOne(N-1) na Classe Postagem
   @ManyToOne(() => Tema, (tema) => tema.postagem, {
onDelete: "CASCADE"
   })
   tema: Tema
}