import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('Testes dos Modulos Usuario e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite', 
          database: 'db_blogpessoal_teste.db',
          entities: [__dirname + '../../scr/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
            }),
                      AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
afterAll(async() => {
await app.close();
});

it('01- Deve cadastrar um novo usuário', async() => {
const resposta = await request(app.getHttpServer())
.post('/usuarios/cadastrar')
.send({
nome: 'Root',
usuario: 'root@root.com',
senha: 'rootroot',
foto: '-'})
expect(201)
usuarioId = resposta.body.id;

});

it('02 - Deve autenticar o usuario (login)', async () => {
const resposta = await request(app.getHttpServer())
.post('/usuarios/logar')
.send({  usuario: 'root@root.com',
        senha: 'rootroot'})
expect(200)

token = resposta.body.token;

});

it('03 - Não Deve Duplicar o Usuário', async () => {
  return request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({      nome: 'Root',
               usuario: 'root@root.com',
               senha: 'rootroot',
                foto: '-'    })
    expect(400)
});


it('04 - Deve listar todos', async () => {
 return request(app.getHttpServer())
  .get('/usuarios/all')
  .set('Authorization', `${token}`)
  .send({})
  expect(200)

});

it('05 - Deve atualizar um usuario', async () => {
  return request(app.getHttpServer())
  .put('/usuarios/atualizar')
.set('Authorization', `${token}`)
.send({
  id: usuarioId,
  nome: 'Geandro',
  usuario: 'root@root.com',
  senha: 'geandro123',
  foto: '-'
})
expect(200) 

});

it('06 - Deve listar por ID', async () => {
  const resposta = await request(app.getHttpServer())
   .get('/usuarios/id')
   .set('Authorization', `${token}`)
   .send({})
   expect(200)
   usuarioId = resposta.body.id;
  });
});