// Selecionando e acessando o total da receita do contribuinte no período de apuração.

{/* <table class="table table-condensed table-contribuinte"> (tabela 1)
    ...
    <table class="table table-condensed table-contribuinte"> (tabela 2)
        <tbody>
            <tr>
                ...
            </tr>
            <tr>
                <td style="padding: 2px;">Mercado Interno</td>
                ...
            </tr>
            <tr>
                <td style="padding: 2px;">Mercado Externo</td>
                ...
            </tr>
            <tr> 
                <td style="padding: 2px;">Total</td>
                <td style="padding: 2px;">0,00</td>
                <td style="padding: 2px;">0,01</td>
                <td style="padding: 2px;">0,00</td>
                <td style="padding: 2px;">0,01</td> ITEM A SER ACESSADO!
            </tr>
        </tbody>
    </table> */}

let segundaTabela = document.querySelectorAll('.col-md-12 .table-condensed.table-contribuinte')[1];
let linha = segundaTabela.querySelector('tr:nth-child(4) td:nth-child(5)');
let quartoFilho = linha.textContent;

// Capturando e inserindo valor do período de apuração no campo receita 

let valorReceitaPA = document.querySelector('.receita-valor');
valorReceitaPA.value = quartoFilho;

// Monitorando a guia ICMS para quando alterar para opção 4 '<option value="4">Isenção/Redução</option>)' o código seguir adiante

let formICMS = document.querySelector('[data-cod-tributo="1007"]');

formICMS.addEventListener('change', function () {
    if (this.value === '4') {
        // Criando div dentro do form para conter o input e botão 
        const local = document.querySelector('.table-isencao-reducao tr:nth-child(2)');
        const container = document.createElement('div');

        local.appendChild(container);
        container.classList.add("divCalculaIsenção");

        // Criando input filho do container
        const input = document.createElement('input');
        container.appendChild(input);
        input.classList.add("inputCalculaIsenção");

        // Setando input para tipo Number
        input.setAttribute('type', 'number');

        // Criando Botão filho do container 

        const botao = document.createElement('button');
        
        botao.innerHTML = 'Calc. Isenção';
        container.appendChild(botao);
        botao.setAttribute('placeholder', 'R$');
        botao.classList.add("btnCalculaIsenção");

        // Ação do botão

        botao.addEventListener('click', (event) => {
            event.preventDefault();

            // Calculando a isenção
            const valueInputCalculaIsenção = document.querySelector('.inputCalculaIsenção').value;

            // Convertendo o valor do PA e Input para number

            if (typeof quartoFilho === "string") {
                quartoFilhoNumber = quartoFilho = Number(quartoFilho.replace(".", "").replace(",", "."));
            }

            if (typeof valueInputCalculaIsenção === "string") {
                valueInputCalculaIsençãoNumber = parseFloat(valueInputCalculaIsenção);
            }

            const resultado = (quartoFilhoNumber * valueInputCalculaIsençãoNumber) / 100;

            // Acessando o input da isenção 
            // <input type="text" class="form-control input-sm money-allowEmpty isencao-valor" placeholder="R$"></input>

            let exemptionInput = document.querySelector('.isencao-valor');

            // Convertendo e inserindo o valor calculado no input de isenção
            exemptionInput.value = resultado.toLocaleString('pt-BR', { maxFractionDigits: 2 });
        });
    }
});
