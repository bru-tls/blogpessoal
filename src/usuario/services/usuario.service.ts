import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find(
            {
                relations:{
                    postagem: true
                }
            }
        );

    }

    async findById(id: number): Promise<Usuario> {

        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async create(ObjetoUsuario: Usuario): Promise<Usuario> {
        
        let buscaUsuario = await this.findByUsuario(ObjetoUsuario.usuario);

        if (!buscaUsuario) {
            ObjetoUsuario.senha = await this.bcrypt.criptografarSenha(ObjetoUsuario.senha)
            return await this.usuarioRepository.save(ObjetoUsuario);
        }

        throw new HttpException("O Usuario ja existe!", HttpStatus.BAD_REQUEST);

    }

    async update(ObjetoUsuario: Usuario): Promise<Usuario> {

        let updateUsuario: Usuario = await this.findById(ObjetoUsuario.id);
        let buscaUsuario = await this.findByUsuario(ObjetoUsuario.usuario);

        if (!updateUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (buscaUsuario && buscaUsuario.id !== ObjetoUsuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        ObjetoUsuario.senha = await this.bcrypt.criptografarSenha(ObjetoUsuario.senha)
        return await this.usuarioRepository.save(ObjetoUsuario);

    }

}