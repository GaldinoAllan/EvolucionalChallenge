import React from 'react';
import Main from '../../components/Main';

export default props =>
    <Main icon="home" title="Home" subtitle="Evolucional Challenge">
        <div className="display-4">Bem Vindo!</div>
        <hr />
        <p className="mb-0">Este é um sistema para exemplificar a construção
        de um cadastro de alunos e professores desenvolvido em React
        para um desafio na empresa Evolucional</p>
        <br />
        <div>
            <strong>Instruções:</strong>
        </div>
        <br />
        <strong>Sobre a tela 1</strong>
        <br />
        <strong>Parte 1:</strong>
        <p> Nós precisamos saber quais são nossos alunos e as quais
        degrees (séries) e classes (classe) o mesmo pertence.<br />
        E tem aquela coisa, erro de cadastro acontece... Então queremos uma opção
        de editar os dados dos alunos após vermos os mesmo populados. No nosso
        caso aqui temos poucos alunos mas vamos supor que essa solução entre em
        nossa operação, ai teremos muitos alunos, por isso precisamos de filtros.
        <br />
            <br />
            <strong>Parte 2:</strong>
            <br />
        Como nós temos poucos dados, queremos simular um cenário mais amplo.
        Por isso necessitamos de uma ferramenta que gere registros de alunos,
        mas os registros não podem estar relacionados a só uma turma, eles tem
        que ser distribuidos. Não que eu não confie em você mas, seria bacana
        um gráfico para ver se foram distribuídos aleatoriamente, beleza?</p>
        <br /><br />
        <strong>Requisitos para a tela 1</strong>
        <br />
        <strong>Parte 1</strong>
        <br />
        <ul>
            <li>Criar combo de filtro a base dos JSONs 'degrees','classes'</li>
            <li>Popular a tela com as informações de students e suas relações
                    (trazendo nome do degree, nome do class)</li>
            <li>Dar opção para editar o nome dos students e a class atribuida
                    ao mesmo</li>
            <li>Filtrar conforme combo sempre levando em consideração os
                    dados pós-alteração</li>
        </ul>
        <br />
        <strong>Parte 2</strong>
        <br />
        <ul>
            <li>Criar botão que gera mais 300 students e os distribua entre
                    os degrees e classes</li>
            <li>Gerar gráfico com a quantidade de students por degree</li>
        </ul>
        <strong>Nota: A cada clique no botão serão gerados + 300 students e
                o gráfico deverá ser atualizado</strong>
        <br /><br />
        <br /><br />
        Aeee! Você terminou a <strong>parte 1</strong>🎊?
            <br /><br />
        Ah é, tem a possibilidade de ter começado
        por aqui, então sem comemorações por enquanto, vamos ao trabalho.
        <br /><br />
        <br /><br />
        <strong>Sobre a tela 2</strong>
        <br />
        <strong>Parte 1:</strong>
        <p> Na tela 1 queriamos saber a respeito dos nossos alunos,
        agora queremos saber a respeito dos nossos professores. É bem parecido.
        Precisamos saber quem são, em que degrees (série) dão aula, em que
        classes (classe) dão aula e além disso, ter uma opçãozinha que ao
        clicarmos, magicamente trás os alunos relacionados aquela série.
        Como sempre, precisamos dos filtrinhos.
        <br />
            <br />
            <strong>Parte 2:</strong>
            <br />
            Agora vem o pulo do gato. Estamos vendo a telinha e
        tal, beleza, bacana, todos os professores ali! Não! Não? Não estão,
        falta um registro! Por isso precisamos de um formulário que gere um novo
        registro para a relationships e exiba no contexto da parte 1.</p>
        <br /><br />
        <strong>Requisitos para a tela 2</strong>
        <br />
        <strong>Parte 1</strong>
        <br />
        <ul>
            <li>Criar combo filtro a base dos JSONs 'degrees','classes'</li>
            <li>Popular a tela utilizando o JSON relationships. Nessa tela será
            necessária a visualização os seguintes itens:
                <ul>
                    <li>nome do professor</li>
                    <li>nome da materia</li>
                    <li>todos os nomes dos degrees relacionados</li>
                    <li>todos os nomes de classe de cada class relacionada ao degree</li>
                </ul>
            </li>
            <li>Criar botão que ao clicar, trás os students relacionados ao degree em questão</li>
        </ul>
        <br />
        <strong>Parte 2</strong>
        <br />
        <ul>
            <li>Criar formulário para gerar um novo registro do relationships.
            O registro deverá ser passivel as operações da parte 1 da tela 2
                </li>
        </ul>
        <br /><br />
        <br /><br />
    </Main>