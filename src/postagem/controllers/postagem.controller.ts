import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller("/postagens")
@ApiBearerAuth()

export class PostagemController{
constructor (private readonly postagemService: PostagemService){}

@Get()
@HttpCode(HttpStatus.OK) // HTTP Status 200
findAll(): Promise<Postagem[]>{
    return this.postagemService.findAll();
}
@Get('/:id')
@HttpCode(HttpStatus.OK) // HTTP Status 200
findById(@Param('id', ParseIntPipe)id:number): Promise<Postagem>{
    return this.postagemService.findById(id);
}
@Get('/titulo/:titulo')
@HttpCode(HttpStatus.OK) // HTTP Status 200
findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
    return this.postagemService.findByTitulo(titulo);
}

@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemService.create(postagem);
}

@Put()
@HttpCode(HttpStatus.OK)
update(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemService.upDate(postagem);
}

@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT) // HTTP Status 204
delete(@Param('id', ParseIntPipe)id:number){
    return this.postagemService.delete(id);

}
@Get('/descricao/:texto')
@HttpCode(HttpStatus.OK) // HTTP Status 200
findByDescricao(@Param('texto') texto: string): Promise<Postagem[]>{
    return this.postagemService.findByDescricao(texto);
}


}