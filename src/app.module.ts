import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModules } from './postagem/postagem.module';

@Module({
  imports: [TypeOrmModule.forRoot({
type: 'mysql', 
host: 'localhost',
port: 3306,
username: 'root',
password: 'root',
database: 'db_blogpessoal',
entities: [Postagem],
synchronize: true,
  }),
  PostagemModules
],
  controllers: [],
  providers: [],
})
export class AppModule {}
