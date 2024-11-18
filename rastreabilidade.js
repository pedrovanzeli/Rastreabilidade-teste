// URL do CSV hospedado no GitHub
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3GUBuIcZh7B5qmug0DRn0g7wwSDF1gHaR0CIvQC7qEnj7l7OTwPemZs7W55sET1hJbMBeLY1bqTHu/pub?gid=1516013078&single=true&output=csv';

function carregarDados() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            const resultados = [];

            for (let i = 1; i < linhas.length; i++) {
                const colunas = linhas[i].split(',');

                if (colunas.length === 6) {
                    resultados.push({
                        produto: colunas[0],
                        loteProdutoAcabado: colunas[1],
                        dataFabricacao: colunas[2],
                        loteMateriaPrima: colunas[3],
                        descricaoProduto: colunas[4],
                        fornecedor: colunas[5],
                    });
                }
            }

            // Exibe os dados carregados
            exibirResultados(resultados);
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo CSV", error);
        });
}

function exibirResultados(resultados) {
    const tbody = document.querySelector('#tabela-resultados tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

    resultados.forEach(item => {
        const tr = document.createElement('tr');

        Object.values(item).forEach(valor => {
            const td = document.createElement('td');
            td.textContent = valor;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

function buscar() {
    const produto = document.getElementById('produto').value.toLowerCase();
    const lote = document.getElementById('lote').value.toLowerCase();

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            const resultados = [];

            for (let i = 1; i < linhas.length; i++) {
                const colunas = linhas[i].split(',');

                if (colunas.length === 6) {
                    const produtoValor = colunas[0].toLowerCase();
                    const loteValor = colunas[1].toLowerCase();

                    // Verifica se o produto ou lote são correspondentes
                    if ((produto === '' || produtoValor.includes(produto)) && (lote === '' || loteValor.includes(lote))) {
                        resultados.push({
                            produto: colunas[0],
                            loteProdutoAcabado: colunas[1],
                            dataFabricacao: colunas[2],
                            loteMateriaPrima: colunas[3],
                            descricaoProduto: colunas[4],
                            fornecedor: colunas[5],
                        });
                    }
                }
            }

            // Exibe os dados filtrados
            exibirResultados(resultados);
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo CSV", error);
        });
}

// Carrega os dados ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarDados);
