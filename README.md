# DesafioFazgameEletrobras

## Rodar em produção

Depois de clonar o repositório na máquina que irá hostear a aplicação, é preciso criar o .env com as credenciais necessárias:

```sh
mv .env.example .env
```

A princípio só existe a variável `DATABASE_URL`. Ela não é necessária para subir a aplicação, mas é para aceitar requisições do form.

Depois basta rodar: `docker-compose up -d` para levantar a aplicação na porta `80`.
