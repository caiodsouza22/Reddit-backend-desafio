Para iniciar essa aplicação , por favor siga os passos a seguir: Primeiro faça o clone desse repositório para o seu PC , em seguida , crie um banco de dados no mySQL no qual vai executar a aplicação .

Abra o projeto no seu editor de código entre nos arquivos : create-table e app.js e nos 2 preencha os campos referente ao banco de dados , preencha o host , o usuario , a senha e o banco que voce criou anteriormente.


Em seguida abra um Hyper Terminal (ou outro terminal de sua preferencia) na pasta do projeto e execute o seguinte comando:  npm i express body-parser ejs mysql snoowrap date-fns node-cron 

Alguns dos pacotes não são utilizados , mas foram adicionados para caso sejam necessários.

Em seguida execute o seguinte comando : node create-table.js , isso vai criar a tabela , com os campos pedidos pelo desafio(autor,titulo,data e etc) e vai preencher alguns dados iniciais.

Em seguida inicie o outro arquivo : nodemon app.js . Abra um navegador e escreva http://localhost:3000/ .

Na tela vão estar 3 botões , clica no botao FIRST UPDATE , ele vai fazer uma atualização no banco de dados com os dados atuais , a partir dai e so fazer a requisição que quiser , a primeira requisição irá retornar os posts criados entre as datas escolhidas e na ordem escolhida , é so ir no terminal e ver os posts. A segunda requisição retorna os autores dos posts e o parametro escolhido , ou seja , numero de comentários ou "ups" . 

A aplicação vai atualizar o banco de dados sozinho todos os dias as 11:30 AM (Contanto que ela esteja rodando). Foram utilizados alguns pacotes para melhor facilitar a execução do desafio , como por exemplo: node-cron (para atualizar o DB sozinho) , snoowrap ( para consumir a api do reddit) e date-fns (para converter o timestamp dado pela API) .
