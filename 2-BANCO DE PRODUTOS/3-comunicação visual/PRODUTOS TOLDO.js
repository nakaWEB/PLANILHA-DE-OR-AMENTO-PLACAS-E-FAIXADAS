/* ---------- GARANTE PASTA PADRÃO ---------- */
async function garantirPastaPadrao() {
    if (!window.showDirectoryPicker) return;          // navegador sem API
    try {
        // solicita acesso 1× à pasta Downloads
        const dirHandle = await window.showDirectoryPicker({
            startIn: 'downloads',
            id: 'pasta-orcamentos-fixa'
        });
        // cria / abre sub-pasta
        const pasta = await dirHandle.getDirectoryHandle('yvgyv', { create: true });
        window.pastaOrcamentosHandle = pasta;           // global para reutilizar
    } catch (e) {
        console.warn('Sem acesso à pasta:', e);
    }
}
garantirPastaPadrao();

// ======= VARIÁVEIS GLOBAIS =======
const nomesPaginas = [
    "CLIENTE", "TOLDO POLICARBONATO",
    "TOLDO CORTINA", "TOLDO CAPOTA", "ORÇAMENTO", "TOTAL GERAL"
];

let bibliotecaOrcamentos = JSON.parse(localStorage.getItem('bibliotecaOrcamentos')) || [];
let currentProductId = 1000;
let isDarkTheme = localStorage.getItem('darkTheme') === 'true';

//catalogoProdutos vista
// USE { codigo: "", idX3D: "", nome: "", preco: , formula: "", unidade: "" },
//PARA ADICIONAR PRODUTOS. OBS. TODOS DEVEM TER UMA VIRGULA NO FINAL MENOS O ULTIMO DE CADA SEÇÃO
let catalogoProdutos = {
    "TOLDO POLICARBONATO": {

        "POLICARBONATO": [
            { codigo: "3671398715", idX3D: "", nome: "POLI 4MM 2,10X6M", preco: 90, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "124953689", idX3D: "", nome: "POLI 6MM 2,1X6M", preco: 140, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "2792889514", idX3D: "", nome: "POLI 4MM 1,05X6M", preco: 90, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "3216582549", idX3D: "", nome: "POLI 6MM 1,05X6M", preco: 140, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "1932206929", idX3D: "", nome: "PERFIL H 6MM", preco: 25, formula: "C * $", unidade: "M" },
            { codigo: "295424935", idX3D: "", nome: "ACABAMENTO", preco: 12, formula: "C * Q * $", unidade: "M" },
        ],

        "PINTURA": [
            { codigo: "585483411", idX3D: "", nome: "LIXA", preco: 3, formula: "Q * $", unidade: "UNID" },
            { codigo: "131471594", idX3D: "", nome: "TINTA", preco: 70, formula: "Q * $", unidade: "LT" },
            { codigo: "1167502708", idX3D: "", nome: "PRIMER", preco: 20, formula: "Q * $", unidade: "LT" },
            { codigo: "334518104", idX3D: "", nome: "THINER", preco: 22, formula: "Q * $", unidade: "LT" },
            { codigo: "3718510400", idX3D: "", nome: "GASOLINA PRA LIMPESA", preco: 16, formula: "Q * $", unidade: "LT" },
            { codigo: "1702538328", idX3D: "", nome: "TEMPO DE PINTURA", preco: 225, formula: "Q * $", unidade: "H" },
        ],

        "ESTRUTURA METALICA": [
            { codigo: "585221486", idX3D: "", nome: "METALON GALV. 20X20", preco: 15, formula: "C * Q  * $", unidade: "M" },
            { codigo: "261818843", idX3D: "", nome: "METALON GALV. 20X20	CURVA", preco: 15, formula: "C * Q * $", unidade: "M" },
            { codigo: "602815009", idX3D: "", nome: "METALON GALV. 15X15", preco: 15, formula: "((A + C)* 2) * $ * Q", unidade: "PER" },
            { codigo: "1702661412", idX3D: "", nome: "METALON GALV. 20X40", preco: 15, formula: "((A + C)* 2) * $ * Q", unidade: "PER" },
            { codigo: "2644877707", idX3D: "", nome: "METALON GALV. 20X40 EM CURVA", preco: 20, formula: "((A + C)* 2) * $ * Q", unidade: "PER" },
            { codigo: "3672378725", idX3D: "", nome: "METALON GALV. 30X50	CAIBRO", preco: 40, formula: "Q * $", unidade: "M" },
            { codigo: "750653101", idX3D: "", nome: "PERFIL U 75MM	VIGA", preco: 60, formula: "C * Q * $", unidade: "M" },
            { codigo: "3496998383", idX3D: "", nome: "PERFIL U 75MM	TOCO", preco: 60, formula: "C * Q * $", unidade: "M" },
            { codigo: "2353625038", idX3D: "", nome: "SUPORTE", preco: 5, formula: "Q * $", unidade: "UNID" },
            { codigo: "3255803432", idX3D: "", nome: "PARAFUSO AUTO BROCANTE 4,2X16", preco: 0.30, formula: "Q * $", unidade: "UNID" },
            { codigo: "2950276503", idX3D: "", nome: "PARAFUSO 1/4", preco: 1, formula: "Q * $", unidade: "UNID" },
            { codigo: "2236575751", idX3D: "", nome: "BUCHA 10", preco: 0.50, formula: "Q * $", unidade: "UNID" },
            { codigo: "3393921233", idX3D: "", nome: "REBITE 4X10", preco: 0.30, formula: "Q * $", unidade: "UNID" },
            { codigo: "2959991575", idX3D: "", nome: "ELETRODO 2,5 5KG 266 UNID", preco: 0.50, formula: "Q * $", unidade: "UNID" },
            { codigo: "4001017812", idX3D: "", nome: "DISCO CORTE 14'", preco: 20, formula: "Q * $", unidade: "UNID" },
            { codigo: "3415115656", idX3D: "", nome: "DISCO CORTE LIXADEIRA", preco: 6, formula: "Q * $", unidade: "UNID" },
            { codigo: "395206379", idX3D: "", nome: "DISCO DESBASTE LIXADEIRA", preco: 10.60, formula: "Q * $", unidade: "UNID" },
            { codigo: "1104215202", idX3D: "", nome: "SILICONE", preco: 25, formula: "Q * $", unidade: "UNID" },
        ],

        "MÃO DE OBRA": [
            { codigo: "3269248691", idX3D: "", nome: "TEMPO ATENDIMENTO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "1124491960", idX3D: "", nome: "TEMPO PRODUÇAO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "3184031100", idX3D: "", nome: "TEMPO DE INSTALAÇÃO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "3967958742", idX3D: "", nome: "ALMOÇO/LANCHE", preco: 40, formula: "Q * $", unidade: "UND" },
            { codigo: "2957524448", idX3D: "", nome: "FRETE", preco: 1.50, formula: "Q * $ * 2", unidade: "KM" },
        ]
    },

    "TOLDO CORTINA": {
        "LONA": [
            { codigo: "3128493293", idX3D: "", nome: "LONA", preco: 80, formula: "Q * C * A * $", unidade: "M²" },
        ],

        "MAQUINA": [
            { codigo: "2908088290", idX3D: "", nome: "MAQUINA REDUTOR", preco: 130, formula: "Q * $", unidade: "UNID" },
            { codigo: "1873937689", idX3D: "", nome: "MOLA PRA TOLDO 10", preco: 256, formula: "Q * $", unidade: "UNID" },
        ],

        "ESTRUTURA METALICA": [
            { codigo: "1938984764", idX3D: "", nome: "HASTE / METRO", preco: 15, formula: "Q * C * $ ", unidade: "M" },
            { codigo: "2554919269", idX3D: "", nome: "MANIVELA /METRO", preco: 15, formula: "Q * C * $ ", unidade: "M" },
            { codigo: "1550775825", idX3D: "", nome: "TUBO GALV 2'", preco: 52, formula: "Q * C * $ ", unidade: "M" },
            { codigo: "1052195969", idX3D: "", nome: "METALON GALV BASE", preco: 15, formula: "Q * C * $ ", unidade: "M" },
            { codigo: "3972616528", idX3D: "", nome: "REBITE", preco: 0.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "2470420774", idX3D: "", nome: "DISCO CORTE 14'", preco: 45, formula: "Q * $", unidade: "UNID" },
            { codigo: "631759915", idX3D: "", nome: "DISCO CORTE LIXADEIRA", preco: 6, formula: "Q * $", unidade: "UNID" },
            { codigo: "1079737010", idX3D: "", nome: "DISCO DESBASTE LIXADEIRA", preco: 10.6, formula: "Q * $", unidade: "UNID" },
        ],

        "FIXAÇÃO": [
            { codigo: "2493725171", idX3D: "", nome: "PRESILHA PAREDE", preco: 5, formula: "Q * $", unidade: "UNID" },
            { codigo: "1362673807", idX3D: "", nome: "PRESILHA BASE TOLDO", preco: 8, formula: "Q * $", unidade: "UNID" },
            { codigo: "936133129", idX3D: "", nome: "SUPORTE TUBO TOLDO", preco: 8, formula: "Q * $", unidade: "UNID" },
            { codigo: "2010861112", idX3D: "", nome: "PARAFUSO 1/4", preco: 0.8, formula: "Q * $", unidade: "UNID" },
            { codigo: "3717499921", idX3D: "", nome: "BUCLHA 10", preco: 0.25, formula: "Q * $", unidade: "UNID" },
        ],

        "PINTURA E ADESIVO": [
            { codigo: "2400180018", idX3D: "", nome: "TINTA SPLAY", preco: 18, formula: "Q * $", unidade: "UNID" },
            { codigo: "2422640725", idX3D: "", nome: "ADESIVO RECORTE", preco: 90, formula: "C * A * Q *$", unidade: "M²" },
        ],

        "MÃO DE OBRA": [
            { codigo: "20721234", idX3D: "", nome: "TEMPO ATENDIMENTO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "910053736", idX3D: "", nome: "TEMPO PRODUÇAO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "4232746688", idX3D: "", nome: "TEMPO DE INSTALAÇÃO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "2774299551", idX3D: "", nome: "ALMOÇO/LANCHE", preco: 40, formula: "Q * $", unidade: "UND" },
            { codigo: "699294314", idX3D: "", nome: "FRETE", preco: 1.50, formula: "Q * $ * 2", unidade: "KM" },
        ]
    },

    "TOLDO CAPOTA": {
        "LONA": [
            { codigo: "260620716", idX3D: "", nome: "LONA COBERTURA", preco: 80, unidade: "M2", formula: "C * A * Q * $" },
            { codigo: "181303780", idX3D: "", nome: "LONA LATERAL", preco: 80, unidade: "M2", formula: "C * A * Q * $" },
        ],

        "ESTRUTURA METALICA": [
            { codigo: "3482970812", idX3D: "", nome: "ELETRODO 2,5", preco: 1.3, unidade: "UNID", formula: "Q * $" },
            { codigo: "934429158", idX3D: "", nome: "METALON RETO	SUPERIOR E INFERIOR", preco: 15, unidade: "M", formula: "C * Q * $" },
            { codigo: "4233667353", idX3D: "", nome: "METALON RETO	LATERAL", preco: 15, unidade: "M", formula: "((C + A )* Q * $)" },
            { codigo: "2912238062", idX3D: "", nome: "METALON 	CURVA", preco: 20, unidade: "M", formula: "(C[4233667353] + 0.1) * Q * $" },
            { codigo: "2345126443", idX3D: "", nome: "BARRA CHATA LISA 1/8X1/2'", preco: 5, unidade: "M", formula: "C * Q * $" },
            { codigo: "2554262482", idX3D: "", nome: "DISCO DE CORTE 14'", preco: 45, unidade: "UNID", formula: "Q * $" },
            { codigo: "2562783750", idX3D: "", nome: "SUPORTE FIXAÇÃO", preco: 5, unidade: "UNID", formula: "Q * $" },
        ],

        "FIXAÇÃO": [
            { codigo: "83119561", idX3D: "", nome: "REBITE", preco: 0.1, unidade: "UNID", formula: "Q * $" },
            { codigo: "1592221388", idX3D: "", nome: "FITA DUPLA FACE 9MM", preco: 6, unidade: "M", formula: "Q * $" },
            { codigo: "3233780700", idX3D: "", nome: "PARAFUSO/BUCHA", preco: 1.5, unidade: "UNID", formula: "Q * $" },
        ],

        "PINTURA E ADESIVO": [
            { codigo: "3447331598", idX3D: "", nome: "PRIMER AUTOMOTIVO", preco: 40, unidade: "LT", formula: "Q * $" },
            { codigo: "2586028054", idX3D: "", nome: "LIXA 80/150/320", preco: 3, unidade: "UNID", formula: "Q * $" },
            { codigo: "3229336664", idX3D: "", nome: "TINTA", preco: 70, unidade: "LT", formula: "Q * $" },
            { codigo: "2473513462", idX3D: "", nome: "TINTA SPLAY", preco: 12, unidade: "LT", formula: "Q * $" },
            { codigo: "1746780745", idX3D: "", nome: "GALVIT", preco: 70, unidade: "LT", formula: "Q * $" },
            { codigo: "421072505", idX3D: "", nome: "VERNIZ", preco: 70, unidade: "LT", formula: "Q * $" },
            { codigo: "2147071312", idX3D: "", nome: "SELADOR MADEIRA", preco: 40, unidade: "LT", formula: "Q * $" },
            { codigo: "2288419204", idX3D: "", nome: "GASOLINA P/LIMPESA", preco: 8, unidade: "LT", formula: "Q * $" },
            { codigo: "1992662224", idX3D: "", nome: "THINER", preco: 22, unidade: "LT", formula: "Q * $" },
        ],

        "MÃO DE OBRA": [
            { codigo: "1754411091", idX3D: "", nome: "TEMPO ATENDIMENTO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "2325261755", idX3D: "", nome: "TEMPO PRODUÇAO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "809915396", idX3D: "", nome: "TEMPO DE INSTALAÇÃO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "3703031178", idX3D: "", nome: "ALMOÇO/LANCHE", preco: 40, formula: "Q * $", unidade: "UND" },
            { codigo: "1444185262", idX3D: "", nome: "FRETE", preco: 1.50, formula: "Q * $ * 2", unidade: "KM" },
        ]
    },



};

// ======= INTEGRAÇÃO COM BANCO DE DADOS =======
// Sobrescreve a função exportarExcelCompleto para salvar no banco
// Configura salvamento automático ao exportar
const exportarExcelCompletoOriginal = exportarExcelCompleto;

exportarExcelCompleto = async function () {
    // Executa a exportação original
    await exportarExcelCompletoOriginal();

    // Salva automaticamente na pasta
    await salvarAutomaticamenteNaPasta();
};

// Atalho de teclado para salvar
document.addEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        await salvarAutomaticamenteNaPasta();
    }
});

async function exportarExcelCompleto() {
    // Primeiro executa a exportação normal
    await exportarExcelCompletoOriginal();

    // Depois salva no banco de dados
    try {
        const session = verificarLogin();
        if (!session) {
            console.warn('Usuário não logado - orçamento não será salvo no banco');
            return;
        }

        // Coleta os dados do orçamento
        const cliente = {
            nome: document.getElementById('cliente_nome')?.value || '',
            endereco: document.getElementById('cliente_endereco')?.value || '',
            telefone: document.getElementById('cliente_telefone')?.value || '',
            data: document.getElementById('cliente_data')?.value || '',
            servico: document.getElementById('cliente_servico')?.value || '',
            numero: document.getElementById('cliente_numero')?.value || '',
            funcionario: document.getElementById('cliente_funcionario')?.value || ''
        };

        // Coleta os produtos
        const produtos = [];
        document.querySelectorAll('.planilha tbody tr').forEach(tr => {
            const Q = parseFloat(tr.querySelector('.quantidade')?.value) || 0;
            if (Q > 0) {
                produtos.push({
                    codigo: tr.cells[1]?.textContent.trim(),
                    nome: tr.cells[2]?.textContent.trim(),
                    unidade: tr.cells[5]?.textContent.trim(),
                    largura: parseFloat(tr.querySelector('.largura')?.value) || 0,
                    comprimento: parseFloat(tr.querySelector('.comprimento')?.value) || 0,
                    quantidade: Q,
                    valorTotal: parseFloat(tr.querySelector('.valor-total')?.textContent.replace(',', '.')) || 0
                });
            }
        });

        if (produtos.length === 0) {
            console.warn('Nenhum produto no orçamento - não será salvo');
            return;
        }

        // Calcula o total
        const total = produtos.reduce((sum, prod) => sum + prod.valorTotal, 0);

        // Cria o objeto orçamento
        const orcamento = new Orcamento(
            cliente.numero || gerarIdOrcamento(),
            cliente,
            produtos,
            total,
            new Date().toISOString(),
            session.nome
        );

        // Salva no banco
        const resultado = salvarOrcamento(orcamento);
        if (resultado.sucesso) {
            showNotification('Orçamento salvo no banco de dados com sucesso!', 'success');
        } else {
            console.error('Erro ao salvar no banco:', resultado.mensagem);
        }

    } catch (error) {
        console.error('Erro ao salvar orçamento no banco:', error);
    }
}

// Função para carregar orçamento do banco quando estiver editando
function carregarOrcamentoEditando() {
    const urlParams = new URLSearchParams(window.location.search);
    const editarId = urlParams.get('editar');

    if (editarId) {
        const orcamento = buscarOrcamento(editarId);
        if (orcamento) {
            // Carrega os dados do cliente
            const cliente = orcamento.cliente;
            document.getElementById('cliente_nome').value = cliente.nome;
            document.getElementById('cliente_endereco').value = cliente.endereco;
            document.getElementById('cliente_telefone').value = cliente.telefone;
            document.getElementById('cliente_data').value = cliente.data;
            document.getElementById('cliente_servico').value = cliente.servico;
            document.getElementById('cliente_numero').value = cliente.numero;
            document.getElementById('cliente_funcionario').value = cliente.funcionario;

            // Limpa a planilha atual
            document.querySelectorAll('.planilha tbody tr').forEach(tr => {
                tr.querySelector('.quantidade').value = 0;
                tr.querySelector('.largura').value = 0;
                tr.querySelector('.comprimento').value = 0;
                tr.querySelector('.valor-total').textContent = '0,00';
            });

            // Carrega os produtos
            orcamento.produtos.forEach(prod => {
                // Encontra a linha com o código do produto
                const linha = Array.from(document.querySelectorAll('.planilha tbody tr'))
                    .find(tr => tr.cells[1]?.textContent.trim() === prod.codigo);

                if (linha) {
                    linha.querySelector('.largura').value = prod.largura;
                    linha.querySelector('.comprimento').value = prod.comprimento;
                    linha.querySelector('.quantidade').value = prod.quantidade;
                    linha.querySelector('.valor-total').textContent = prod.valorTotal.toFixed(2).replace('.', ',');
                } else {
                    // Se não encontrar, adiciona como produto temporário
                    console.warn(`Produto ${prod.codigo} não encontrado na planilha`);
                }
            });

            showNotification(`Orçamento ${editarId} carregado para edição!`, 'success');

            // Limpa o parâmetro da URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            showNotification('Orçamento não encontrado no banco de dados!', 'error');
        }
    }
}

// Adiciona verificação de login em todas as páginas protegidas
function protegerPagina() {
    const session = verificarLogin();
    if (!session) {
        window.location.href = 'login.html';
        return false;
    }

    // Adiciona informações do usuário logado
    const userInfo = document.createElement('div');
    userInfo.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 9999;
    `;
    userInfo.innerHTML = `<i class="fas fa-user"></i> ${session.nome} (${session.tipo})`;
    document.body.appendChild(userInfo);

    return true;
}

// Modifica a função de inicialização para incluir carregamento de orçamentos
const initializeInterfaceOriginal = initializeInterface;

function initializeInterface() {
    // Executa a função original
    initializeInterfaceOriginal();

    // Adiciona verificação de login
    protegerPagina();

    // Verifica se está editando um orçamento
    setTimeout(() => {
        carregarOrcamentoEditando();
    }, 500);
}

// ======= NOTIFICAÇÕES =======
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.innerHTML = `
                <i class="fas fa-${getIconForType(type)}"></i> ${message}
            `;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function getIconForType(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ======= MODAIS =======
function showAddProductModal() {
    document.getElementById('addProductModal').style.display = 'block';
}

function showImportModal() {
    document.getElementById('importModal').style.display = 'block';
}

function showCalculatorModal() {
    document.getElementById('calculatorModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// ======= CALCULADORA =======
let calcValue = '';

function calcAppend(value) {
    calcValue += value;
    document.getElementById('calcDisplay').value = calcValue;
}

function calcClear() {
    calcValue = '';
    document.getElementById('calcDisplay').value = '';
}

function calcDelete() {
    calcValue = calcValue.slice(0, -1);
    document.getElementById('calcDisplay').value = calcValue;
}

function calcCalculate() {
    try {
        const result = eval(calcValue);
        document.getElementById('calcDisplay').value = result;
        calcValue = result.toString();
    } catch (error) {
        document.getElementById('calcDisplay').value = 'Erro';
        calcValue = '';
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        showLoading(true);
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('csvContent').value = e.target.result;
            showLoading(false);
        };
        reader.readAsText(file);
    }
}

function resetProducts() {
    if (confirm('Tem certeza que deseja resetar todos os produtos para os padrões? Esta ação não pode ser desfeita!')) {
        showLoading(true);
        setTimeout(() => {
            location.reload();
        }, 500);
    }
}

function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    const paginas = document.querySelectorAll('.pagina');

    if (category) {
        // Esconde todas as páginas e mostra apenas a selecionada
        paginas.forEach((pagina, index) => {
            if (nomesPaginas[index] === category) {
                pagina.classList.add('ativa');
                barraInferior.children[index].classList.add('ativo');
            } else {
                pagina.classList.remove('ativa');
                barraInferior.children[index].classList.remove('ativo');
            }
        });
        showNotification(`Filtrando por: ${category}`, 'info');
    } else {
        // Mostra a primeira página
        paginas.forEach((pagina, index) => {
            pagina.classList.toggle('ativa', index === 0);
            barraInferior.children[index].classList.toggle('ativo', index === 0);
        });
        showNotification('Mostrando todas as categorias', 'info');
    }
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    document.getElementById('categoryFilter').value = '';

    const allRows = document.querySelectorAll('.planilha tbody tr');
    let visibleCount = 0;

    allRows.forEach(row => {
        const nomeProduto = row.cells[2]?.textContent.toLowerCase() || '';
        const match = nomeProduto.includes(searchTerm);
        row.style.display = match ? '' : 'none';
        if (match) visibleCount++;
    });

    const paginas = document.querySelectorAll('.pagina');
    const botoes = document.querySelectorAll('.barra-inferior button');

    // Remove todas as classes ativas
    paginas.forEach(p => p.classList.remove('ativa'));
    botoes.forEach(b => b.classList.remove('ativo'));

    // Ativa apenas a primeira aba que tem resultados visíveis
    let abaAtivada = false;
    paginas.forEach((pagina, index) => {
        const temVisivel = Array.from(pagina.querySelectorAll('tbody tr')).some(tr => tr.style.display !== 'none');
        if (temVisivel && !abaAtivada) {
            pagina.classList.add('ativa');
            botoes[index].classList.add('ativo');
            abaAtivada = true;
        }
    });

    // Se nenhuma aba tem resultados, ativa a primeira (CLIENTE)
    if (!abaAtivada) {
        paginas[0].classList.add('ativa');
        botoes[0].classList.add('ativo');
    }

    if (searchTerm) {
        showNotification(`Encontrados ${visibleCount} produtos com: "${searchTerm}"`, 'info');
    } else {
        showNotification('Busca limpa. Mostrando primeira aba com resultados.', 'info');
    }
}

// ======= FUNÇÕES DE INTERFACE =======
function criarLinhaProduto(prod) {
    return `
                <tr data-formula="${prod.formula || 'Q * $'}" data-product-id="${prod.id}">
                    <td class="col-clonar">
                        <button class="btn-clone" title="Clonar produto" onclick="clonarLinha(this)">
                            <i class="fas fa-copy"></i>
                        </button>
                    </td>
                    <td style="font-size: 14px; opacity: 100%; font-size: 0px;">${prod.codigo}</td>
                    <td style="font-size: 14px;">${prod.nome}</td>
                    <td style="font-size: 14px;">${prod.idX3D}</td>
                    <td style="opacity: 100%; font-size: 0px;" class="preco-base">${prod.preco.toFixed(2).replace('.', ',')}</td>

                    <td style="font-size: 14px;">${prod.unidade || ''}</td>
                    <td style="width: 13%; font-size: 14px;"><input type="number" class="largura" min="0" step="1" value="0"></td>
                    <td style="width: 13%; font-size: 14px;"><input type="number" class="comprimento" min="0" step="1" value="0"></td>
                    <td style="width: 13%; font-size: 14px;"><input type="number" class="quantidade" min="0" step="1" value="0"></td>
                    <td style="opacity: 100%; font-size: 0px;><input type="text" class="descricao" placeholder="."></td>
                    <td style="font-size: 14px;" class="valor-total">0,00</td>
                </tr>
            `;
}

function criarTabela(categoria) {
    const dadosCategoria = catalogoProdutos[categoria];

    // Se for categoria com subcategorias (ADESIVOS/BANNER)
    if (dadosCategoria && typeof dadosCategoria === 'object' && !Array.isArray(dadosCategoria)) {
        let html = '';
        const subcategorias = Object.keys(dadosCategoria);

        subcategorias.forEach((sub, index) => {
            const produtos = dadosCategoria[sub];
            let linhas = '';

            produtos.forEach(prod => {
                linhas += criarLinhaProduto(prod);
            });

            html += `
                <div class="capsula-container">
                    <button class="capsula-header" onclick="toggleCapsula(this)" data-subcategoria="${sub}">
                        <span class="capsula-icon"><i class="fas fa-chevron-right"></i></span>
                        <span class="capsula-titulo">${sub}</span>
                        <span class="capsula-contador">(${produtos.length} produtos)</span>
                    </button>
                   <div class="capsula-conteudo" style="display: none;">
                        <table class="planilha">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th style="opacity: 100%; font-size: 0px;">ID</th>
                                    <th>Nome</th>
                                    <th>Código</th>
                                    <th style="opacity: 100%; font-size: 0px;">Preço</th>
                                    <th>Medida</th>
                                    <th>Altura</th>
                                    <th>Largura</th>
                                    <th>Quant</th>
                                    <th style="opacity: 100%; font-size: 0px;">Desc</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${linhas}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        });

        return html;
    }

    // Categoria normal (sem subcategorias)
    const produtos = dadosCategoria || [];
    let linhas = '';

    produtos.forEach(prod => {
        linhas += criarLinhaProduto(prod);
    });

    return `
        <table class="planilha">
            <thead>
                <tr>
                    <th></th>
                    <th style="opacity: 100%; font-size: 0px;">ID</th>
                    <th>Nome</th>
                    <th>Código</th>
                    <th style="opacity: 100%; font-size: 0px;">Preço</th>
                    <th>Medida</th>
                    <th>Largura</th>
                    <th>Altura</th>
                    <th>Quant</th>
                    <th style="opacity: 100%; font-size: 0px;">Desc</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${linhas}
            </tbody>
        </table>
    `;
}

function criarPaginaCliente() {
    return `
        <table class="planilha" style="margin-top: 30px;">
            <tbody>
                <tr>
                    <td><i class="fas fa-user"></i> CLIENTE</td>
                    <td colspan="8">
                        <input id="cliente_nome" type="text" style="width:98%" placeholder="Nome do cliente"
                            autocomplete="one-time-code" data-lpignore="true" data-form-type="other">
                    </td>
                </tr>
                <tr>
                    <td><i class="fas fa-map-marker-alt"></i> ENDEREÇO</td>
                    <td colspan="8">
                        <input id="cliente_endereco" type="text" style="width:98%" placeholder="Endereço completo"
                            autocomplete="one-time-code" data-lpignore="true" data-form-type="other">
                    </td>
                </tr>
                <tr>
                    <td><i class="fas fa-phone"></i> TELEFONE</td>
                    <td colspan="8">
                        <input id="cliente_telefone" type="text" style="width:98%" placeholder="(00) 00000-0000"
                            autocomplete="one-time-code" data-lpignore="true" data-form-type="other">
                    </td>
                </tr>
                <tr>
                    <td><i class="fas fa-calendar"></i> DATA</td>
                    <td colspan="8">
                        <input id="cliente_data" type="text" style="width:98%" placeholder="DD/MM/AAAA"
                            autocomplete="one-time-code" data-lpignore="true" data-form-type="other"
                            readonly onfocus="this.removeAttribute('readonly')" onblur="this.setAttribute('readonly','readonly')">
                    </td>
                </tr>
                <tr>
                    <td><i class="fas fa-tools"></i> SERVIÇO</td>
                    <td colspan="8">
                        <input id="cliente_servico" type="text" style="width:98%" placeholder="Descrição do serviço"
                            autocomplete="one-time-code" data-lpignore="true" data-form-type="other">
                    </td>
                </tr>
                <tr>
                    <td><i class="fas fa-user-tie"></i> FUNCIONÁRIO</td>
                    <td colspan="8">
                        <input id="cliente_funcionario" type="text" style="width:98%" placeholder="Nome do funcionário"
                            autocomplete="one-time-code" data-lpignore="true" data-form-type="other">
                    </td>
                </tr>
                <tr>
                    <td><i class="fas fa-hashtag"></i> Nº</td>
                    <td colspan="8">
                        <input id="cliente_numero" type="text" style="width:98%" placeholder="Número do Funcionário"
                            autocomplete="one-time-code" data-lpignore="true" data-form-type="other"
                            inputmode="numeric" pattern="[0-9]*">
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}
// ✅ ADICIONADO: Verificações de segurança
function initializeInterface() {
    console.log('📊 Inicializando interface...');

    const paginasContainer = document.getElementById("paginas-container");
    const barraInferior = document.getElementById("barra-inferior");

    if (!paginasContainer || !barraInferior) {
        console.error('❌ Elementos principais não encontrados');
        showNotification('Erro: Elementos da página não encontrados', 'error');
        return;
    }

    showLoading(true);

    // ======================  AGORA DENTRO DO SETTIMEOUT  ======================
    setTimeout(() => {
        paginasContainer.innerHTML = '';
        barraInferior.innerHTML = '';

        nomesPaginas.forEach((nome, index) => {
            const pagina = document.createElement("div");
            pagina.className = "pagina" + (index === 0 ? " ativa" : "");

            if (nome === "CLIENTE") {
                pagina.innerHTML = criarPaginaCliente();
            } else if (nome === "TOTAL GERAL") {
                pagina.innerHTML = `
          <table class="planilha" style="margin-bottom:0px;">
                        <tbody>
                            <tr><td style="width:20%"><i class="fas fa-user"></i> CLIENTE</td><td colspan="3"><input id="orc_cliente_nome" type="text" style="width:98%" readonly></td>                    <td style="width:20%"><i class="fas fa-map-marker-alt"></i> ENDEREÇO</td><td colspan="3"><input id="orc_cliente_endereco" type="text" style="width:98%" readonly></td></tr>
                            <tr><td style="width:20%"><i class="fas fa-phone"></i> TELEFONE</td><td colspan="3"><input id="orc_cliente_telefone" type="text" style="width:98%" readonly></td>              <td style="width:20%"><i class="fas fa-calendar"></i> DATA</td><td colspan="3"><input id="orc_cliente_data" type="text" style="width:98%" readonly></td></tr>
                            <tr><td style="width:20%"><i class="fas fa-tools"></i> SERVIÇO</td><td colspan="3"><input id="orc_cliente_servico" type="text" style="width:271%" readonly></td> <td></td>  <td></td>
                            <tr><td style="width:20%"><i class="fas fa-user-tie"></i> FUNCIONÁRIO</td><td colspan="3"><input id="orc_cliente_funcionario" type="text" style="width:98%" readonly></td>     <td style="width:20%"><i class="fas fa-hashtag"></i>Nº FUNCIONÁRIO</td><td colspan="3"><input id="orc_cliente_numero" type="text" style="width:98%" readonly></td></tr>
                        </tbody>
                    </table> 


                    
                    <table class="planilha" id="tabela-extra" style="margin-top: 20px;">
                        <tr>
                            <td class="rotacionado"><i class="fas fa-calculator"></i> TOTAL</td>

                            <td><i class="fas fa-credit-card"></i> PIX</td>
                            <td><i class="fas fa-money-check"></i> CHEQUE</td>
                            <td><i class="fas fa-money-bill"></i> DINHEIRO</td>
                            <td><i class="fas fa-credit-card"></i> CARTÃO</td>
                            <td><i class="fas fa-pencil-alt"></i> ANOTAR</td>
                            <td><i class="fas fa-calculator"></i> V. TOTAL</td>

                        </tr>
                        <tr>
                            <td>À VISTA</td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td id="linha2"></td>
                        </tr>
                        <tr>
                            <td>ENTRADA</td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td id="linha3"></td>
                        </tr>
                        <tr>
                            <td>A PRAZO</td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td id="linha4"></td>
                        </tr>
                        <tr>
                            <td>PARCELAS</td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td class="clicavel"></td>
                            <td id="linha5"></td>
                        </tr>
                    </table>
                `;

            } else if (nome === "ORÇAMENTO") {
                pagina.innerHTML = `
                    <table class="planilha" id="tabela-total-geral">
                        <thead>
                            <tr><th><i class="fas fa-list"></i> CATEGORIA</th><th><i class="fas fa-dollar-sign"></i> TOTAL (R$)</th></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    
                    <div class="orcamento-container">
                        <table class="planilha orcamento-coluna" id="orcamento-coluna1">
                            <thead>
                                <tr class="categoriaPROD">
                                    <th>CÓDIGO</th>
                                    <th>PRODUTO</th>
                                    <th>QTD</th>
                                    <th>UNID</th>
                                    <th>VALOR</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                `;
            } else {
                pagina.innerHTML = criarTabela(nome);
            }

            paginasContainer.appendChild(pagina);

            const btn = document.createElement("button");
            btn.textContent = nome;
            if (index === 0) btn.classList.add("ativo");
            btn.addEventListener("click", () => mudarPagina(index));
            barraInferior.appendChild(btn);
        });

        calcularValores();
        monitorarInputs();
        updateCategoryFilter();
        showLoading(false);

        // ======================  AGORA SIM, MUDE A PÁGINA  ======================
        mudarPagina(0);

        setTimeout(bloquearAutocompleteCliente, 100);
    }, 300);
}

function mudarPagina(indice) {
    const paginas = document.querySelectorAll('.pagina');
    const botoes = document.querySelectorAll('.barra-inferior button');

    paginas.forEach((p, i) => {
        const ativa = i === indice;
        p.classList.toggle('ativa', ativa);
        botoes[i].classList.toggle('ativo', ativa);
    });

    const mostrarInfoCliente = nomesPaginas[indice] === 'CLIENTE';

    const t = document.getElementById('tempo-pp-flutuante');
    const c = document.getElementById('info-cliente-flutuante');

    if (t) t.style.display = mostrarTempoPP ? 'block' : 'none';
    if (c) c.style.display = mostrarInfoCliente ? 'block' : 'none';

    if (mostrarInfoCliente) {
        setTimeout(bloquearAutocompleteCliente, 100);
    }
}


function sincronizarClienteParaOrcamento() {
    const campos = ["nome", "endereco", "telefone", "data", "servico", "funcionario", "numero"];
    campos.forEach(campo => {
        const origem = document.getElementById(`cliente_${campo}`);
        const destino = document.getElementById(`orc_cliente_${campo}`);
        if (origem && destino) destino.value = origem.value;
    });
}

function atualizarOrcamento() {
    const tbody = document.querySelector("#orcamento-coluna1 tbody");
    if (!tbody) {
        console.warn("⚠️ Tabela de orçamento não encontrada");
        return;
    }

    tbody.innerHTML = '';

    let totalOrcamento = 0;
    const items = [];

    document.querySelectorAll('.planilha tbody tr').forEach(linha => {
        const codigo = linha.cells[1]?.textContent.trim();
        const nome = linha.cells[2]?.textContent.trim();
        const unidade = linha.cells[5]?.textContent.trim() || "";
        const quantidade = parseFloat(linha.querySelector(".quantidade")?.value) || 0;
        const valorTotal = parseFloat(linha.querySelector(".valor-total")?.textContent.replace(',', '.')) || 0;

        if (quantidade > 0) {
            items.push({ codigo, nome, quantidade, unidade, valorTotal });
            totalOrcamento += valorTotal;
        }
    });

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>${item.unidade}</td>
            <td>R$ ${item.valorTotal.toFixed(2).replace('.', ',')}</td>
        `;
        tbody.appendChild(row);
    });

    const imposto = totalOrcamento * 0.13;
    const totalComImposto = totalOrcamento + imposto;

    // Linha de imposto
    const impostoRow = document.createElement('tr');
    impostoRow.style.background = 'var (--barra-imposto)';
    impostoRow.innerHTML = `
        <td></td>
        <td><strong><i class="fas fa-receipt"></i> IMPOSTO</strong></td>
        <td>1</td>
        <td></td>
        <td><strong>R$ ${imposto.toFixed(2).replace('.', ',')}</strong></td>
    `;
    tbody.appendChild(impostoRow);

    // Linha total
    const totalRow = document.createElement('tr');
    totalRow.style.background = 'var (--total)';
    totalRow.style.fontWeight = 'bold';
    totalRow.innerHTML = `
        <td></td>
        <td colspan="3" style="text-align:right;"><i class="fas fa-calculator"></i> TOTAL:</td>
        <td>R$ ${totalComImposto.toFixed(2).replace('.', ',')}</td>
    `;
    tbody.appendChild(totalRow);
}

function calcularValores() {
    // Garante que todos os inputs estão sendo monitorados
    monitorarInputs();
    document.querySelectorAll(".planilha").forEach(tabela => {
        const mapa = {};
        tabela.querySelectorAll("tbody tr").forEach(linha => {
            const codigo = linha.cells[1]?.textContent.trim();
            if (!codigo) return;
            const largura = parseFloat(linha.querySelector(".largura")?.value) || 0;
            const comprimento = parseFloat(linha.querySelector(".comprimento")?.value) || 0;
            const quantidade = parseFloat(linha.querySelector(".quantidade")?.value) || 0;
            mapa[codigo] = { C: comprimento, A: largura, Q: quantidade };
        });

        tabela.querySelectorAll("tbody tr").forEach(linha => {
            if (linha.querySelector(".preco-base")) {
                const precoBaseText = linha.querySelector(".preco-base").textContent.replace(',', '.');
                const precoBase = parseFloat(precoBaseText) || 0;
                const comprimento = parseFloat(linha.querySelector(".comprimento")?.value) || 0;
                const largura = parseFloat(linha.querySelector(".largura")?.value) || 0;
                const quantidade = parseFloat(linha.querySelector(".quantidade")?.value) || 0;
                let valorTotal = 0;
                const formula = linha.getAttribute("data-formula");

                if (formula && formula.trim() !== "") {
                    let expr = formula
                        .replace(/\$/g, precoBase.toString())
                        .replace(/\bQ\b(?!\[)/g, quantidade.toString())
                        .replace(/\bA\b(?!\[)/g, largura.toString())
                        .replace(/\bC\b(?!\[)/g, comprimento.toString());

                    expr = expr.replace(/C\[(\d+)\]/g, (_, cod) => {
                        const v = mapa[cod];
                        return v ? v.C.toString() : '0';
                    });
                    expr = expr.replace(/A\[(\d+)\]/g, (_, cod) => {
                        const v = mapa[cod];
                        return v ? v.A.toString() : '0';
                    });
                    expr = expr.replace(/Q\[(\d+)\]/g, (_, cod) => {
                        const v = mapa[cod];
                        return v ? v.Q.toString() : '0';
                    });

                    try {
                        valorTotal = eval(expr);
                    } catch (e) {
                        console.error("Erro na fórmula:", formula, expr, e);
                        valorTotal = 0;
                    }
                }

                const tdValorTotal = linha.querySelector(".valor-total");
                if (tdValorTotal) {
                    tdValorTotal.textContent = valorTotal.toFixed(2).replace('.', ',');
                }
            }
        });
    });

    atualizarTotalGeral();
    atualizarOrcamento();
}

function monitorarInputs() {
    document.querySelectorAll(".largura, .comprimento, .quantidade").forEach(input => {
        input.addEventListener("input", calcularValores);
    });
}

function updateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="">Todas</option>';

    Object.keys(catalogoProdutos).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function atualizarTotalGeral() {
    const tabelaGeral = document.querySelector("#tabela-total-geral tbody");
    if (!tabelaGeral) return;

    tabelaGeral.innerHTML = "";
    let somaGeral = 0;

    // Itera sobre todas as páginas/categorias
    document.querySelectorAll('.pagina').forEach((pagina, index) => {
        const nomePagina = nomesPaginas[index];
        if (!nomePagina || nomePagina === "CLIENTE" || nomePagina === "ORÇAMENTO" || nomePagina === "TOTAL GERAL") return;

        let soma = 0;

        // Soma todos os valores-total da página (incluindo dentro de cápsulas)
        pagina.querySelectorAll(".valor-total").forEach(v => {
            soma += parseFloat(v.textContent.replace(',', '.')) || 0;
        });

        if (soma > 0) {
            somaGeral += soma;
            tabelaGeral.innerHTML += `
                <tr>
                    <td><i class="fas fa-folder"></i> ${nomePagina}</td>
                    <td>R$ ${soma.toFixed(2).replace('.', ',')}</td>
                </tr>
            `;
        }
    });

    const imposto = somaGeral * 0.13;
    tabelaGeral.innerHTML += `
        <tr style="background: var (--barra-imposto)">
            <td><strong><i class="fas fa-receipt"></i> IMPOSTO</strong></td>
            <td><strong>R$ ${imposto.toFixed(2).replace('.', ',')}</strong></td>
        </tr>
    `;

    const totalComImposto = somaGeral + imposto;

    const linha2 = document.getElementById("linha2");
    const linha3 = document.getElementById("linha3");
    const linha4 = document.getElementById("linha4");
    const linha5 = document.getElementById("linha5");

    if (linha2) linha2.textContent = "R$ " + totalComImposto.toFixed(2).replace('.', ',');
    if (linha3) linha3.textContent = "R$ " + ((totalComImposto * 0.05 + totalComImposto) / 4).toFixed(2).replace('.', ',');
    if (linha4) linha4.textContent = "R$ " + (totalComImposto * 0.05 + totalComImposto).toFixed(2).replace('.', ',');
    if (linha5) linha5.textContent = "R$ " + ((totalComImposto * 0.05 + totalComImposto) / 4).toFixed(2).replace('.', ',');
}

/* ----------  SALVA DIRETO EM C:\Users\As informática\Downloads\orçamentos  ---------- */
/* ----------  SALVAR PEDINDO PASTA E VERSÃO  ---------- */
async function salvarNaPastaOrcamentos(blob, nomeArquivo) {
    try {
        // ✅ 1. Salva no localStorage (sempre funciona)
        const reader = new FileReader();
        reader.onload = function () {
            const base64 = reader.result;
            const orcamentos = JSON.parse(localStorage.getItem('orcamentosPasta2025') || '[]');
            orcamentos.unshift({
                id: nomeArquivo.replace('.xlsx', ''),
                nome: nomeArquivo,
                dados: base64,
                data: new Date().toISOString()
            });
            localStorage.setItem('orcamentosPasta2025', JSON.stringify(orcamentos));
        };
        reader.readAsDataURL(blob);

        // ✅ 2. Tenta salvar na pasta (se o usuário já deu permissão)
        if ('showDirectoryPicker' in window) {
            const dirHandle = await window.showDirectoryPicker({
                startIn: 'downloads',
                id: 'pasta-orcamentos-2025-fixa'
            });

            const pasta = dirHandle;
            const fileHandle = await pasta.getFileHandle(nomeArquivo, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            showNotification('✅ Salvo na pasta e no localStorage!', 'success');
        } else {
            showNotification('✅ Salvo no localStorage (API não suportada)', 'info');
        }

    } catch (err) {
        console.warn('❌ Erro ao salvar na pasta:', err);
        showNotification('✅ Salvo apenas no localStorage', 'info');
    }
}

function closeNotif(el) {
    el.classList.remove('notif--show');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
}

// ======= FUNÇÕES DE ARQUIVO =======
async function exportarExcelCompleto() {
    /* ---------- DADOS DO CLIENTE (com CORREÇÃO do nome) ---------- */
    const cliente = {
        nome: document.getElementById('cliente_nome')?.value || '',
        endereco: document.getElementById('cliente_endereco')?.value || '',
        telefone: document.getElementById('cliente_telefone')?.value || '',
        data: document.getElementById('cliente_data')?.value || '',
        servico: document.getElementById('cliente_servico')?.value || '',
        numero: document.getElementById('cliente_numero')?.value || '',
        funcionario: document.getElementById('cliente_funcionario')?.value || ''
    };

    /* ---------- PRODUTOS COM QUANTIDADE > 0 (inclui clonados) ---------- */
    const produtos = [];
    let subTotal = 0;

    // Percorre TODAS as tabelas de produtos
    document.querySelectorAll('.planilha tbody tr').forEach(tr => {
        const Q = parseFloat(tr.querySelector('.quantidade')?.value) || 0;
        if (Q <= 0) return;

        const cod = tr.cells[1]?.textContent.trim();
        const descr = tr.cells[2]?.textContent.trim();
        const pl = tr.cells[0]?.textContent.trim();
        const unid = tr.cells[5]?.textContent.trim();
        const comp = tr.querySelector('.comprimento')?.value || 0;
        const alt = tr.querySelector('.largura')?.value || 0;
        const vlr = parseFloat(tr.querySelector('.valor-total')?.textContent.replace(',', '.')) || 0;

        produtos.push([cod, descr, unid, comp, alt, Q, vlr.toFixed(2).replace('.', ',')]);
        subTotal += vlr;
    });

    const imposto = subTotal * 0.13;
    const total = subTotal + imposto;
    const aVista = total.toFixed(2).replace('.', ',');
    const entrada = (total * 1.05 * 0.25).toFixed(2).replace('.', ',');
    const aPrazo = (total * 1.05).toFixed(2).replace('.', ',');
    const parcela = (total * 1.05 + total / 4).toFixed(2).replace('.', ',');

    /* ---------- MONTAGEM DO EXCEL ---------- */
    const linhas = [
        ['CLIENTE', cliente.nome, '', '', '', '', 'FUNCIONÁRIO', cliente.funcionario],
        ['END.:', cliente.endereco],
        ['TEL.:', cliente.telefone, '', '', '', '', 'DATA', cliente.data],
        ['SERVIÇO:', cliente.servico, '', '', '', '', 'NOTA Nº',],
        [],
        ['TIPO DE PAGAMENTO', '', 'PIX ⬜', 'DINHEIRO ⬜', '', 'CHEQUE ⬜', '', 'CARTÃO ⬜'],
        [],
        ['FUNCIONÁRIOS ENVOLVIDOS:'],
        []

    ];
    /* ----------  CABEÇALHO DOURADO DOS PRODUTOS  ---------- */
    const headerRow = ['CODIGO', 'PRODUTO', 'MEDIDA', 'COMPRIMENTO', 'LARGURA', 'QUANTIDADE', 'VALOR'];
    linhas.push(headerRow);

    /* ---------- INSERE PRODUTOS ---------- */
    produtos.forEach(p => linhas.push(p));

    /* ---------- PREENCHE ATÉ LINHA 38 (índice 38) ---------- */
    while (linhas.length < 38) linhas.push([]);

    /* ---------- BLOCO DE TOTAIS (a partir da linha 39) ---------- */
    linhas.push(['', 'IMPOSTO', '', '', '', '', '13%', `R$ ${imposto.toFixed(2).replace('.', ',')}`]);
    linhas.push([]);
    linhas.push(['', '', 'PIX', 'CHEQUE', 'DINHEIRO', 'CARTÃO', '', 'V.TOTAL']);
    linhas.push(['', 'À VISTA', '', '', '', '', '', `R$ ${aVista}`]);
    linhas.push(['', 'ENTRADA', '', '', '', '', '', `R$ ${entrada}`]);
    linhas.push(['', 'À PRAZO', '', '', '', '', '', `R$ ${aPrazo}`]);
    linhas.push(['', 'PARCELAs', '', '', '', '', '', `R$ ${entrada}`]);

    /* ---------- GERA ARQUIVO ---------- */
    const ws = XLSX.utils.aoa_to_sheet(linhas);
    // ---------- CABEÇALHO SIMPLES (linha 100) ----------
    const cabecalhoSimples = [
        ['CLIENTE', cliente.nome],
        ['ENDEREÇO', cliente.endereco],
        ['TELEFONE', cliente.telefone],
        ['DATA', cliente.data],
        ['SERVIÇO', cliente.servico],
        ['FUNCIONÁRIO', cliente.funcionario],
        ['Nº', cliente.numero]
    ];
    XLSX.utils.sheet_add_aoa(ws, cabecalhoSimples, { origin: 'A100' });
    // ----------------------------------------------------
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    /* ---------- SALVA NA PASTA ---------- */
    if (window.pastaOrcamentosHandle) {
        try {
            const handle = await window.pastaOrcamentosHandle.getFileHandle(fileName, { create: true });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            console.log('✅ Salvo em yvgyv:', fileName);
        } catch (e) {
            console.warn('❌ Falha ao salvar na pasta:', e);
        }
    }
    const fileName = `ORÇAMENTO_${cliente.nome}_${cliente.servico}_${cliente.data}`
        .replace(/\s+/g, '_') + '.xlsx';
    // Salva no localStorage também
    const orcamentoData = {
        id: cliente.numero || `ORC_${Date.now()}`,
        cliente: cliente,
        produtos: produtos,
        total: total,
        dataCriacao: new Date().toISOString(),
        status: 'ativo',
        criadoPor: cliente.funcionario || 'Sistema'
    };

    let orcamentos = JSON.parse(localStorage.getItem('orcamentosPasta2025') || '[]');
    const index = orcamentos.findIndex(o => o.id === orcamentoData.id);
    if (index >= 0) {
        orcamentos[index] = orcamentoData;
    } else {
        orcamentos.unshift(orcamentoData);
    }
    localStorage.setItem('orcamentosPasta2025', JSON.stringify(orcamentos));
    await salvarNaPastaOrcamentos(blob, fileName);
}



// ======= FUNÇÃO DE IMPRESSÃO =======
async function imprimirExcelCompleto() {
    /* ---------- DADOS DO CLIENTE ---------- */
    const cliente = {
        nome: document.getElementById('cliente_nome')?.value || '',
        endereco: document.getElementById('cliente_endereco')?.value || '',
        telefone: document.getElementById('cliente_telefone')?.value || '',
        data: document.getElementById('cliente_data')?.value || '',
        servico: document.getElementById('cliente_servico')?.value || '',
        numero: document.getElementById('cliente_numero')?.value || '',
        funcionario: document.getElementById('cliente_funcionario')?.value || ''
    };

    /* ---------- PRODUTOS ---------- */
    const produtos = [];
    let subTotal = 0;
    document.querySelectorAll('.planilha tbody tr').forEach(tr => {
        const Q = parseFloat(tr.querySelector('.quantidade')?.value) || 0;
        if (Q <= 0) return;

        const cod = tr.cells[3]?.textContent.trim();
        const descr = tr.cells[2]?.textContent.trim();
        const pl = tr.cells[0]?.textContent.trim();
        const unid = tr.cells[5]?.textContent.trim();
        const comp = tr.querySelector('.comprimento')?.value || 0;
        const alt = tr.querySelector('.largura')?.value || 0;
        const vlr = parseFloat(tr.querySelector('.valor-total')?.textContent.replace(',', '.')) || 0;

        produtos.push([cod, descr, pl, pl, pl, pl, pl, pl, unid, comp, alt, Q, vlr.toFixed(2).replace('.', ',')]);
        subTotal += vlr;
    });

    const imposto = subTotal * 0.13;
    const total = subTotal + imposto;
    const aVista = total.toFixed(2).replace('.', ',');
    const entrada = (total * 1.05 * 0.25).toFixed(2).replace('.', ',');
    const aPrazo = (total * 1.05).toFixed(2).replace('.', ',');
    const parcela = (total * 1.05 * 1.05 / 4).toFixed(2).replace('.', ',');

    /* ---------- EXCELJS ---------- */
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Orçamento');

    /* ---------- MARGENS ESTREITAS ---------- */
    ws.pageSetup = {
        orientation: 'portrait',          // ou 'landscape'
        fitToPage: true,                  // ajusta tudo numa única página
        fitToWidth: 1,
        fitToHeight: 0,                   // 0 = sem limite de altura
        margins: {
            left: 0.25,     // 0,25"
            right: 0.25,
            top: 0.3,
            bottom: 0.3,
            header: 0.1,
            footer: 0.1
        },
        horizontalCentered: true,         // centraliza horizontalmente
    };

    ws.pageSetup = {
        paperSize: 9,          // 9 = A4
        orientation: 'portrait', // ou 'landscape'
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
        margins: {
            left: 0.25,
            right: 0.25,
            top: 0.3,
            bottom: 0.3,
            header: 0.1,
            footer: 0.1
        }
    };

    /* ---------- ESTILOS REUTILIZÁVEIS ---------- */
    const douradoCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD700' } },
    };

    const pastelCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8AF' } },
    };

    const peleCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEEC8' } }
    };
    const greenCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00FF00' } }
    };
    const blueCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0000FF' } }
    };
    const cinzaescuroCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'bfddf3' } }
    };
    const cinzaclaroCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } }
    };

    const cinzactCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } }
    };

    const cinzaetCell = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'bfddf3' } }
    };

    /* ---------- MONTAGEM DA PLANILHA ---------- */
    ws.addRow([]);
    ws.addRow(['CLIENTE', cliente.nome, '', '', '', '', '', 'FUNCIONÁRIO', '', cliente.funcionario]);
    ws.addRow(['END.:', cliente.endereco]);
    ws.addRow(['TEL.:', cliente.telefone, '', '', '', '', '', '', '', 'DATA', cliente.data]);
    ws.addRow(['SERVIÇO:', cliente.servico, '', '', '', '', '', '', '', 'NOTA Nº']);
    ws.addRow([]);
    ws.addRow(['FUNCIONÁRIOS ENVOLVIDOS:']);
    ws.addRow([]);

    /* ---------- CABEÇALHO DOURADO ---------- */
    const headerRow = ['COD', '', 'MATERIAL', '', '', '', '', '', 'UNID', 'COMP', 'ALTURA', 'QUANT', 'V. TOTAL'];
    ws.addRow(headerRow);

    /* ---------- PRODUTOS ---------- */
    produtos.forEach(p => ws.addRow(p));

    /* ---------- PREENCHE ATÉ LINHA 57 ---------- */
    while (ws.rowCount < 57) ws.addRow([]);

    /* ---------- TOTAIS ---------- */
    ws.addRow(['', '', '', 'IMPOSTO', '', '', '', '13%', `R$ ${imposto.toFixed(2).replace('.', ',')}`]);
    ws.addRow([]);
    ws.addRow(['', '', '', '', 'PIX', 'CHEQUE', 'DINHEIRO', 'CARTÃO', 'ANOTAR', 'V.TOTAL']);
    ws.addRow(['', '', 'VALOR', 'À VISTA', '', '', '', '', '', `R$ ${aVista}`]);
    ws.addRow(['', '', '1', 'ENTRADA', '', '', '', '', '', `R$ ${entrada}`]);
    ws.addRow(['', '', 'VALOR', 'À PRAZO', '', '', '', '', '', `R$ ${aPrazo}`]);
    ws.addRow(['', '', '3', 'PARCELAs', '', '', '', '', '', `R$ ${parcela}`]);
    ws.getColumn('H').alignment = { horizontal: 'left' };
    ws.getColumn('J').alignment = { horizontal: 'right' };


    const movimentos = [

        // recortar celulas de C10 a C37                
        { de: 'C10', para: 'L1' }, { de: 'C12', para: 'L1' }, { de: 'C13', para: 'L1' },
        { de: 'C14', para: 'L1' }, { de: 'C15', para: 'L1' }, { de: 'C16', para: 'L1' }, { de: 'C17', para: 'L1' },
        { de: 'C18', para: 'L1' }, { de: 'C19', para: 'L1' }, { de: 'C20', para: 'L1' }, { de: 'C21', para: 'L1' },
        { de: 'C22', para: 'L1' }, { de: 'C23', para: 'L1' }, { de: 'C24', para: 'L1' }, { de: 'C25', para: 'L1' },
        { de: 'C26', para: 'L1' }, { de: 'C27', para: 'L1' }, { de: 'C28', para: 'L1' }, { de: 'C29', para: 'L1' },
        { de: 'C30', para: 'L1' }, { de: 'C31', para: 'L1' }, { de: 'C32', para: 'L1' }, { de: 'C33', para: 'L1' },
        { de: 'C34', para: 'L1' }, { de: 'C35', para: 'L1' }, { de: 'C36', para: 'L1' }, { de: 'C37', para: 'L1' },
        { de: 'C34', para: 'L1' }, { de: 'C38', para: 'L1' }, { de: 'C39', para: 'L1' }, { de: 'C40', para: 'L1' },

        // recortar celulas de D10 a D37
        { de: 'D11', para: 'L1' },
        { de: 'D12', para: 'L1' },
        { de: 'D13', para: 'L1' },
        { de: 'D14', para: 'L1' },
        { de: 'D15', para: 'L1' },
        { de: 'D16', para: 'L1' },
        { de: 'D17', para: 'L1' },
        { de: 'D18', para: 'L1' },
        { de: 'D19', para: 'L1' },
        { de: 'D20', para: 'L1' },
        { de: 'D21', para: 'L1' },
        { de: 'D22', para: 'L1' },
        { de: 'D23', para: 'L1' },
        { de: 'D24', para: 'L1' },
        { de: 'D25', para: 'L1' },
        { de: 'D26', para: 'L1' },
        { de: 'D27', para: 'L1' },
        { de: 'D28', para: 'L1' },
        { de: 'D29', para: 'L1' },
        { de: 'D30', para: 'L1' },
        { de: 'D31', para: 'L1' },
        { de: 'D32', para: 'L1' },
        { de: 'D33', para: 'L1' },
        { de: 'D34', para: 'L1' },
        { de: 'D35', para: 'L1' },
        { de: 'D36', para: 'L1' },
        { de: 'D37', para: 'L1' },

        // recorte celulas E
        { de: 'E10', para: 'L1' },
        { de: 'E11', para: 'L1' }, { de: 'E12', para: 'L1' }, { de: 'E13', para: 'L1' },
        { de: 'E14', para: 'L1' }, { de: 'E15', para: 'L1' }, { de: 'E16', para: 'L1' },
        { de: 'E17', para: 'L1' }, { de: 'E18', para: 'L1' }, { de: 'E19', para: 'L1' },
        { de: 'E20', para: 'L1' }, { de: 'E21', para: 'L1' }, { de: 'E22', para: 'L1' },
        { de: 'E23', para: 'L1' }, { de: 'E24', para: 'L1' }, { de: 'E25', para: 'L1' },
        { de: 'E26', para: 'L1' }, { de: 'E27', para: 'L1' }, { de: 'E28', para: 'L1' },
        { de: 'E29', para: 'L1' }, { de: 'E30', para: 'L1' }, { de: 'E31', para: 'L1' },
        { de: 'E32', para: 'L1' }, { de: 'E33', para: 'L1' }, { de: 'E34', para: 'L1' },
        { de: 'E35', para: 'L1' }, { de: 'E36', para: 'L1' }, { de: 'E37', para: 'L1' },


        //recorte celulas H
        { de: 'H41', para: 'L1' }, { de: 'H42', para: 'L1' }, { de: 'H43', para: 'L1' },
        { de: 'H44', para: 'L1' }, { de: 'H45', para: 'L1' }, { de: 'H39', para: 'L1' },

        // recortar celulas especificas do cabeçalho

        { de: 'C2', para: 'L1' }, { de: 'D2', para: 'L1' }, { de: 'E2', para: 'L1' }, { de: 'B7', para: 'L1' },
        { de: 'C5', para: 'L1' }, { de: 'D5', para: 'L1' }, { de: 'E5', para: 'L1' }, { de: 'F5', para: 'L1' },
        { de: 'C3', para: 'L1' }, { de: 'C4', para: 'L1' }, { de: 'L2', para: 'L1' }, { de: 'G7', para: 'L1' },
        { de: 'E7', para: 'L1' }, { de: 'I2', para: 'L1' }, { de: 'E7', para: 'L1' }, { de: 'B9', para: 'L1' },
        { de: 'C11', para: 'L1' }, { de: 'D11', para: 'L1' }, { de: 'D10', para: 'L1' },
    ];

    /* ---------- COPIA/RECORTE MANUAL ---------- */
    function copiarCel(origem, destino, recortar = false) {
        const [o, d] = [ws.getCell(origem), ws.getCell(destino)];
        d.value = o.value;
        d.style = o.style;          // copia preenchimento, bordas, alinhamento...
        d.numFmt = o.numFmt;
        if (recortar) o.value = null; // limpa origem
    }

    /* ---------- EXECUTA OS MOVIMENTOS ---------- */
    movimentos.forEach(({ de, para }) => copiarCel(de, para, true));

    /* ---------- CÉLULAS COLORIDAS ---------- */
    headerRow.forEach((_, i) => ws.getCell(9, i + 1).style = douradoCell);

    /* ---------- CORES ZEBRADAS (sem sobrescrever alignment) ---------- */
    for (let row = 10; row <= 58; row++) {
        const style = row % 2 === 0 ? cinzaclaroCell : cinzaescuroCell;
        headerRow.forEach((_, i) => Object.assign(ws.getCell(row, i + 1).style, style));
    }

    /* ---------- ALINHAMENTO FINAL ---------- */
    ['A', 'B', 'C', 'D'].forEach(c => ws.getColumn(c).alignment = { horizontal: 'left' });
    ['I', 'J', 'K', 'L', 'M'].forEach(c => ws.getColumn(c).alignment = { horizontal: 'center' });

    ['A', 'B', 'C', 'D', 'E', 'H'].forEach(col =>
        headerRow.forEach((_, i) => ws.getCell(58, i + 1).style = cinzaescuroCell)
    );

    headerRow.forEach((_, i) => ws.getCell(59, i + 1).style = cinzaclaroCell);

    headerRow.forEach((_, i) => ws.getCell(60, i + 1).style = pastelCell);

    headerRow.forEach((_, i) => ws.getCell(61, i + 1).style = peleCell);

    headerRow.forEach((_, i) => ws.getCell(62, i + 1).style = pastelCell);

    headerRow.forEach((_, i) => ws.getCell(63, i + 1).style = peleCell);

    headerRow.forEach((_, i) => ws.getCell(64, i + 1).style = pastelCell);



    function copiarCel(origem, destino, recortar = false) {
        const [o, d] = [ws.getCell(origem), ws.getCell(destino)];
        d.value = o.value;
        d.style = o.style;          // copia preenchimento, bordas, alinhamento...
        d.numFmt = o.numFmt;
        if (recortar) o.value = null; // limpa origem
    }
    /* ---------- ESTILO: APENAS BORDA PRETA ---------- */
    const bordaPretaFUNDO = {
        border: {
            top: { style: 'thin', color: { argb: 'FFFFFF' } },//SIMA
            left: { style: 'thin', color: { argb: 'FFFFFF' } },//ESQUERDA
            bottom: { style: 'thin', color: { argb: '000000' } },//BAIXO
            right: { style: 'thin', color: { argb: 'FFFFFF' } } //DIREITA
        }
    };

    const bordaPretaFUNDOd = {
        border: {
            top: { style: 'thin', color: { argb: 'FFFFD700' } },//SIMA
            left: { style: 'thin', color: { argb: 'FFFFD700' } },//ESQUERDA
            bottom: { style: 'thin', color: { argb: '000000' } },//BAIXO
            right: { style: 'thin', color: { argb: 'FFFFD700' } } //DIREITA
        }
    };

    const bordaPretaFUNDOce = {
        border: {
            top: { style: 'thin', color: { argb: 'bfddf3' } },//SIMA
            left: { style: 'thin', color: { argb: 'bfddf3' } },//ESQUERDA
            bottom: { style: 'thin', color: { argb: '000000' } },//BAIXO
            right: { style: 'thin', color: { argb: 'bfddf3' } } //DIREITA
        }
    };

    const bordaPretaTOPO_FUNDO = {
        border: {
            top: { style: 'thin', color: { argb: '000000' } },//SIMA
            left: { style: 'thin', color: { argb: 'FFFFFF' } },//ESQUERDA
            bottom: { style: 'thin', color: { argb: '000000' } },//BAIXO
            right: { style: 'thin', color: { argb: 'FFFFFF' } } //DIREITA
        }
    };

    const bordaPretaFINAL_DIREITA = {
        border: {
            top: { style: 'thin', color: { argb: '000000' } },//SIMA
            left: { style: 'thin', color: { argb: 'FFFFFF' } },//ESQUERDA
            bottom: { style: 'thin', color: { argb: '000000' } },//BAIXO
            right: { style: 'thin', color: { argb: '000000' } } //DIREITA
        }
    };

    const bordaPretaCOMPLETO = {
        border: {
            top: { style: 'thin', color: { argb: '000000' } },//SIMA
            left: { style: 'thin', color: { argb: '000000' } },//ESQUERDA
            bottom: { style: 'thin', color: { argb: '000000' } },//BAIXO
            right: { style: 'thin', color: { argb: '000000' } } //DIREITA
        }
    };

    const bordaPretaFINAL_ESQUERDA = {
        border: {
            top: { style: 'thin', color: { argb: '000000' } },//SIMA
            left: { style: 'thin', color: { argb: '000000' } },//ESQUERDA
            bottom: { style: 'thin', color: { argb: '000000' } },//BAIXO
            right: { style: 'thin', color: { argb: 'FFFFFF' } } //DIREITA
        }
    };



    /* ---------- APLICANDO EM UMA CÉLULA ESPECÍFICA ---------- */
    // linha 1 
    ['A', 'B', 'C', 'D', 'F', 'G', 'E', 'H', 'I', 'J', 'K', 'L', 'M'].forEach(col =>
        Object.assign(ws.getCell(`${col}1`).style, bordaPretaFUNDO)
    );

    // linha 2
    ['B', 'C', 'D', 'E', 'F', 'G', 'J', 'K'].forEach(col =>
        Object.assign(ws.getCell(`${col}2`).style, bordaPretaFUNDO)
    );

    // lInha 3
    ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'].forEach(col =>
        Object.assign(ws.getCell(`${col}3`).style, bordaPretaFUNDO)
    );

    // linha 4
    ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M'].forEach(col =>
        Object.assign(ws.getCell(`${col}4`).style, bordaPretaTOPO_FUNDO)
    );

    // linha 5
    ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M'].forEach(col =>
        Object.assign(ws.getCell(`${col}5`).style, bordaPretaTOPO_FUNDO)
    );

    // linha 7
    ['B'].forEach(col =>
        Object.assign(ws.getCell(`${col}7`).style, bordaPretaTOPO_FUNDO),
    );

    ['A', 'B', 'C', 'D', 'E', 'H'].forEach(col =>
        Object.assign(ws.getCell(`${col}9`).style, bordaPretaFUNDOd)
    );

    // linha 39
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach(col =>
        Object.assign(ws.getCell(`${col}58`).style, bordaPretaFUNDOce)
    );

    // linha 41
    ['C', 'D', 'E', 'F', 'G'].forEach(col =>
        Object.assign(ws.getCell(`${col}60`).style, bordaPretaCOMPLETO)
    );

    // linha 42
    ['C', 'D', 'E', 'F', 'G'].forEach(col =>
        Object.assign(ws.getCell(`${col}61`).style, bordaPretaCOMPLETO)
    );

    // linha 43
    ['C', 'D', 'E', 'F', 'G'].forEach(col =>
        Object.assign(ws.getCell(`${col}62`).style, bordaPretaCOMPLETO)
    );

    // linha 44
    ['C', 'D', 'E', 'F', 'G'].forEach(col =>
        Object.assign(ws.getCell(`${col}63`).style, bordaPretaCOMPLETO)
    );

    // linha 64
    ['C', 'D', 'E', 'F', 'G'].forEach(col =>
        Object.assign(ws.getCell(`${col}64`).style, bordaPretaCOMPLETO)
    );


    Object.assign(ws.getCell('A2').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('A3').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('A4').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('A5').style, bordaPretaCOMPLETO);

    Object.assign(ws.getCell('B60').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('B61').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('B62').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('B63').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('B64').style, bordaPretaCOMPLETO);

    Object.assign(ws.getCell('A7').style, bordaPretaFINAL_ESQUERDA);
    Object.assign(ws.getCell('C7').style, bordaPretaFINAL_DIREITA);

    Object.assign(ws.getCell('H2').style, bordaPretaFINAL_ESQUERDA);

    Object.assign(ws.getCell('J5').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('J4').style, bordaPretaCOMPLETO);
    Object.assign(ws.getCell('I2').style, bordaPretaFINAL_DIREITA);
    Object.assign(ws.getCell('G60').style, bordaPretaFINAL_ESQUERDA);
    Object.assign(ws.getCell('G61').style, bordaPretaFINAL_ESQUERDA);
    Object.assign(ws.getCell('G62').style, bordaPretaFINAL_ESQUERDA);
    Object.assign(ws.getCell('G63').style, bordaPretaFINAL_ESQUERDA);
    Object.assign(ws.getCell('G64').style, bordaPretaFINAL_ESQUERDA);

    Object.assign(ws.getCell('H60').style, bordaPretaFINAL_DIREITA);
    Object.assign(ws.getCell('H61').style, bordaPretaFINAL_DIREITA);
    Object.assign(ws.getCell('H62').style, bordaPretaFINAL_DIREITA);
    Object.assign(ws.getCell('H63').style, bordaPretaFINAL_DIREITA);
    Object.assign(ws.getCell('H64').style, bordaPretaFINAL_DIREITA);

    Object.assign(ws.getCell('L2').style, bordaPretaTOPO_FUNDO)
    Object.assign(ws.getCell('L3').style, bordaPretaTOPO_FUNDO)
    Object.assign(ws.getCell('L4').style, bordaPretaTOPO_FUNDO)
    Object.assign(ws.getCell('L5').style, bordaPretaTOPO_FUNDO)

    Object.assign(ws.getCell('M2').style, bordaPretaFINAL_DIREITA)
    Object.assign(ws.getCell('M3').style, bordaPretaFINAL_DIREITA)
    Object.assign(ws.getCell('M4').style, bordaPretaFINAL_DIREITA)
    Object.assign(ws.getCell('M5').style, bordaPretaFINAL_DIREITA)

    // faixa de A9 até J64
    ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber >= 1 && rowNumber <= 64) {
            row.eachCell({ includeEmpty: false }, cell => {
                cell.font = { size: 10, name: 'Calibri' };
            });
        }
    });



    /* ---------- SALVA O ARQUIVO ---------- */
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `ORCAMENTO_${cliente.nome.replace(/\s+/g, '_')}.xlsx`);
}

/* ----------  IMPORTAÇÃO EXATA – CLIENTE + PRODUTOS  ---------- */
async function importarExcelOtimizado(file) {
    showLoading(true);

    try {
        const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array', cellFormula: false, cellStyles: false });
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1, defval: '' });

        /* ----------  LEITURA DOS CAMPOS DO CLIENTE (completa e flexível) ---------- */
        // ✅ Lê o cabeçalho simples da linha 100
        const cliente = {
            nome: String(rows[99]?.[1] || '').trim(),
            endereco: String(rows[100]?.[1] || '').trim(),
            telefone: String(rows[101]?.[1] || '').trim(),
            data: String(rows[102]?.[1] || '').trim(),
            servico: String(rows[103]?.[1] || '').trim(),
            funcionario: String(rows[104]?.[1] || '').trim(),
            numero: String(rows[105]?.[1] || '').trim()
        };
        // Procura por padrões mais flexíveis de campos do cliente
        rows.forEach((ln, index) => {
            if (!ln || !Array.isArray(ln)) return;

            const linhaTexto = ln.join(' ').toUpperCase();

            // Procura nome do cliente
            if (linhaTexto.includes('CLIENTE') || linhaTexto.includes('NOME')) {
                cliente.nome = String(ln[1] || ln[2] || '').trim();
            }

            // Procura endereço
            if (linhaTexto.includes('ENDEREÇO') || linhaTexto.includes('END.')) {
                cliente.endereco = String(ln[1] || ln[2] || '').trim();
            }

            // Procura telefone
            if (linhaTexto.includes('TELEFONE') || linhaTexto.includes('TEL.') || linhaTexto.includes('CELULAR')) {
                cliente.telefone = String(ln[1] || ln[2] || '').trim();
            }

            // Procura data
            if (linhaTexto.includes('DATA') || linhaTexto.includes('DIA') || linhaTexto.includes('EMISSÃO')) {
                cliente.data = String(ln[1] || ln[2] || '').trim();
            }

            // Procura serviço
            if (linhaTexto.includes('SERVIÇO') || linhaTexto.includes('DESCRIÇÃO') || linhaTexto.includes('TIPO')) {
                cliente.servico = String(ln[1] || ln[2] || '').trim();
            }

            // Procura funcionário
            if (linhaTexto.includes('FUNCIONÁRIO') || linhaTexto.includes('RESPONSÁVEL') ||
                linhaTexto.includes('ATENDENTE') || linhaTexto.includes('VENDEDOR')) {
                cliente.funcionario = String(ln[1] || ln[2] || '').trim();
            }

            // Procura número do orçamento
            if (linhaTexto.includes('NOTA') || linhaTexto.includes('Nº') ||
                linhaTexto.includes('NÚMERO') || linhaTexto.includes('ORÇAMENTO')) {
                cliente.numero = String(ln[1] || ln[2] || '').trim();
            }
        });

        /* ----------  APLICA NO FORMULÁRIO (COM GARANTIA) ---------- */
        function aplicarClienteNosCampos(dados) {
            const campos = ['nome', 'endereco', 'telefone', 'data', 'servico', 'funcionario', 'numero'];
            campos.forEach(campo => {
                const elCliente = document.getElementById(`cliente_${campo}`);
                const elOrc = document.getElementById(`orc_cliente_${campo}`);
                if (elCliente) elCliente.value = dados[campo] || '';
                if (elOrc) elOrc.value = dados[campo] || '';
            });
        }

        // Garante que a página CLIENTE esteja ativa
        mudarPagina(0);

        // Aguarda o DOM estar pronto e aplica os dados
        let tentativas = 0;
        const intervalo = setInterval(() => {
            const nomeInput = document.getElementById('cliente_nome');
            if (nomeInput) {
                aplicarClienteNosCampos(cliente);
                clearInterval(intervalo);
                console.log('✅ Dados do cliente aplicados:', cliente);
            } else {
                tentativas++;
                if (tentativas > 50) {
                    clearInterval(intervalo);
                    console.warn('⚠️ Campos de cliente não encontrados após 50 tentativas.');
                }
            }
        }, 100);

        /* ----------  LEITURA DOS PRODUTOS ---------- */
        let iniProd = rows.findIndex(ln => {
            const texto = String(ln[0] || '').toUpperCase();
            return texto.includes('COD') || texto.includes('CÓDIGO') || texto.includes('PRODUTO');
        }) + 1;

        if (iniProd === 0) iniProd = 9; // fallback

        const produtos = [];
        for (let i = iniProd; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length < 3) continue;

            const cod = String(row[0] || '').trim();
            const nome = String(row[1] || '').trim();
            const unid = String(row[2] || '').trim() || 'UNID';
            const comp = parseFloat(row[3]) || 0;
            const alt = parseFloat(row[4]) || 0;
            const qtd = parseFloat(row[5]) || 0;
            const valor = String(row[6] || '').replace(',', '.');

            if (qtd > 0 && cod) {
                produtos.push({
                    codigo: cod,
                    nome: nome,
                    unid: unid,
                    L: alt, // Largura
                    C: comp, // Comprimento
                    Q: qtd,
                    valorTotal: parseFloat(valor) || 0
                });
            }
        }

        /* ----------  APLICA PRODUTOS ---------- */
        await aplicarProdutosEmLote(produtos);

        setTimeout(() => {
            calcularValores();
            atualizarOrcamento();
            sincronizarClienteParaOrcamentoGarantido();
            showLoading(false);
            showNotification('Importação concluída com sucesso!', 'success');
            mudarPagina(0);
        }, 300);

    } catch (e) {
        showLoading(false);
        console.error(e);
        showNotification('Erro ao importar: ' + e.message, 'error');
    }
}

function sincronizarClienteParaOrcamentoGarantido() {
    const campos = ["nome", "endereco", "telefone", "data", "servico", "funcionario", "numero"];
    let sincronizados = 0;

    campos.forEach(campo => {
        const origem = document.getElementById(`cliente_${campo}`);
        const destino = document.getElementById(`orc_cliente_${campo}`);

        if (origem && destino && origem.value) {
            destino.value = origem.value;
            sincronizados++;
            console.log(`🔄 Sincronizado ${campo}: ${origem.value}`);
        }
    });

    console.log(`✅ ${sincronizados} campos sincronizados`);
    return sincronizados;
}

async function aplicarProdutosEmLote(produtos) {
    const batchSize = 50;
    for (let i = 0; i < produtos.length; i += batchSize) {
        const batch = produtos.slice(i, i + batchSize);
        batch.forEach(p => aplicarProdutoNaTabela(p));
        await new Promise(resolve => requestIdleCallback(resolve));
    }
}

function aplicarProdutoNaTabela({ codigo, nome, L, C, Q, unidade, precoBase, valorTotal }) {
    console.log(`🔍 Aplicando produto: ${codigo} | Q=${Q}, L=${L}, C=${C}`);

    // 🔍 Busca TODAS as linhas de TODAS as tabelas
    const todasLinhas = Array.from(document.querySelectorAll('.planilha tbody tr'));

    // 🔍 Filtra apenas as que têm o código correto
    const linhasComCodigo = todasLinhas.filter(tr => {
        const codigoCelula = tr.cells[1]?.textContent?.trim();
        return codigoCelula === codigo;
    });

    console.log(`📦 Linhas encontradas com código ${codigo}:`, linhasComCodigo.length);

    if (linhasComCodigo.length === 0) {
        console.warn(`⚠️ Nenhuma linha encontrada com código: ${codigo}`);
        return;
    }

    // 🔍 Tenta encontrar uma linha vazia (quantidade = 0)
    let linhaDisponivel = linhasComCodigo.find(tr => {
        const qtd = parseFloat(tr.querySelector('.quantidade')?.value) || 0;
        return qtd === 0;
    });

    // 🔥 Se não houver linha vazia, clona a última
    if (!linhaDisponivel) {
        const ultima = linhasComCodigo[linhasComCodigo.length - 1];
        console.log(`🧬 Clonando linha para ${codigo}`);
        clonarLinha(ultima.querySelector('.btn-clone'));
        linhaDisponivel = ultima.nextElementSibling;
    }

    if (!linhaDisponivel) {
        console.error(`❌ Falha ao obter linha disponível para ${codigo}`);
        return;
    }

    // ✅ Preenche a linha
    linhaDisponivel.querySelector('.largura').value = L;
    linhaDisponivel.querySelector('.comprimento').value = C;
    linhaDisponivel.querySelector('.quantidade').value = Q;

    console.log(`✅ Produto ${codigo} aplicado com sucesso.`);
}
// ======= BOTÃO CLONAR =======
function clonarLinha(btn) {
    const linhaOriginal = btn.closest('tr');
    const clone = linhaOriginal.cloneNode(true);

    clone.querySelectorAll('input').forEach(inp => {
        inp.value = 0;
        inp.dispatchEvent(new Event('input'));
    });

    clone.querySelector('.valor-total').textContent = '0,00';

    linhaOriginal.after(clone);
    monitorarInputs();

    showNotification('Produto clonado com sucesso!', 'info');
}

// ======= LOADING =======
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'flex' : 'none';
}

// ======= EVENTOS =======
document.addEventListener("input", e => {
    if (e.target.id && e.target.id.startsWith("cliente_")) {
        sincronizarClienteParaOrcamento();
    }
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("clicavel")) {
        e.target.textContent = e.target.textContent === "X" ? "" : "X";
    }
});

// Fechar modais ao clicar fora
window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
    }
});

// ======= INICIALIZAÇÃO =======
window.addEventListener("DOMContentLoaded", () => {
    initializeInterface();

    // Adiciona efeitos de entrada
    setTimeout(() => {
        document.body.classList.add('fade-in');
    }, 100);
});

// ======= ATALHOS DE TECLADO =======
document.addEventListener('keydown', e => {
    // Ctrl + S para salvar
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        salvarOrcamentoLocal();
    }

    // Ctrl + O para abrir
    if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        carregarOrcamentoDeArquivo();
    }

    // Ctrl + B para biblioteca
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        showBiblioteca();
    }

    // Ctrl + N para novo produto
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        showAddProductModal();
    }
});

document.addEventListener("input", e => {
    if (e.target.id && e.target.id.startsWith("cliente_")) {
        // Sincroniza imediatamente
        sincronizarClienteParaOrcamento();

        // Garante sincronização após um pequeno delay
        setTimeout(() => {
            sincronizarClienteParaOrcamentoGarantido();
        }, 100);
    }
});

document.getElementById('btnInstrucoes').addEventListener('click', function () {
    const querSair = confirm(
        'Atenção!\n' +
        'Ao mudar para a página de instruções você PERDERÁ o orçamento que não foi salvo.\n\n' +
        'Deseja realmente sair?'
    );

    if (querSair) {
        window.location.href = 'instrucoes.html';
    }
});

// Função para salvar automaticamente na pasta específica
// Função otimizada para salvar na pasta específica
async function salvarNaPastaEspecifica(orcamentoData) {
    try {
        // Verifica se a API File System Access está disponível
        if (!('showDirectoryPicker' in window)) {
            console.log('API File System Access não disponível, salvando no localStorage');
            return false;
        }

        // Tenta acessar a pasta Downloads
        const dirHandle = await window.showDirectoryPicker({
            startIn: 'downloads',
            id: 'pasta-orcamentos-2025-especifica'
        });

        // Tenta acessar a pasta específica ou cria se não existir
        let pastaOrcamentos;
        const caminhoPastas = ['orçamestos 2025', 'orçamentos 2025', 'Downloads'];

        for (const nomePasta of caminhoPastas) {
            try {
                pastaOrcamentos = await dirHandle.getDirectoryHandle(nomePasta, { create: true });
                break;
            } catch (e) {
                continue;
            }
        }

        if (!pastaOrcamentos) {
            // Se não conseguiu criar/acessar a pasta, tenta na raiz de Downloads
            pastaOrcamentos = dirHandle;
        }

        // Cria o arquivo Excel
        const wb = XLSX.utils.book_new();
        const wsData = [
            ['CLIENTE', orcamentoData.cliente.nome],
            ['ENDEREÇO', orcamentoData.cliente.endereco],
            ['TELEFONE', orcamentoData.cliente.telefone],
            ['DATA', orcamentoData.cliente.data],
            ['SERVIÇO', orcamentoData.cliente.servico],
            ['FUNCIONÁRIO', orcamentoData.cliente.funcionario],
            ['Nº', orcamentoData.cliente.numero],
            [],
            ['CÓDIGO', 'PRODUTO', 'UNID', 'COMPR', 'LARG', 'QTD', 'VALOR']
        ];

        orcamentoData.produtos.forEach(p => {
            wsData.push([
                p.codigo,
                p.nome,
                p.unidade,
                p.comprimento,
                p.largura,
                p.quantidade,
                p.valorTotal.toFixed(2).replace('.', ',')
            ]);
        });

        wsData.push([]);
        wsData.push(['', 'TOTAL', '', '', '', '', orcamentoData.total.toFixed(2).replace('.', ',')]);

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');

        // Nome do arquivo com data e hora para evitar conflitos
        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR').replace(/\//g, '-');
        const horaFormatada = agora.toLocaleTimeString('pt-BR').replace(/:/g, '-');
        const fileName = `ORÇAMENTO_${orcamentoData.cliente.nome || 'SEM_NOME'}_${dataFormatada}_${horaFormatada}.xlsx`
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9-_]/g, '');

        // Salva o arquivo
        const fileHandle = await pastaOrcamentos.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(XLSX.write(wb, { bookType: 'xlsx', type: 'array' }));
        await writable.close();

        console.log('✅ Orçamento salvo na pasta específica:', fileName);
        return true;

    } catch (err) {
        console.log('ℹ️ Não foi possível salvar na pasta específica:', err.message);
        return false;
    }
}

// Função principal de salvamento automático
async function salvarAutomaticamente() {
    try {
        // Coleta os dados do orçamento
        const cliente = {
            nome: document.getElementById('cliente_nome')?.value || '',
            endereco: document.getElementById('cliente_endereco')?.value || '',
            telefone: document.getElementById('cliente_telefone')?.value || '',
            data: document.getElementById('cliente_data')?.value || '',
            servico: document.getElementById('cliente_servico')?.value || '',
            numero: document.getElementById('cliente_numero')?.value || '',
            funcionario: document.getElementById('cliente_funcionario')?.value || ''
        };

        // Coleta os produtos
        const produtos = [];
        document.querySelectorAll('.planilha tbody tr').forEach(tr => {
            const Q = parseFloat(tr.querySelector('.quantidade')?.value) || 0;
            if (Q > 0) {
                produtos.push({
                    codigo: tr.cells[1]?.textContent.trim(),
                    nome: tr.cells[2]?.textContent.trim(),
                    unidade: tr.cells[5]?.textContent.trim(),
                    largura: parseFloat(tr.querySelector('.largura')?.value) || 0,
                    comprimento: parseFloat(tr.querySelector('.comprimento')?.value) || 0,
                    quantidade: Q,
                    valorTotal: parseFloat(tr.querySelector('.valor-total')?.textContent.replace(',', '.')) || 0
                });
            }
        });

        if (produtos.length === 0) return;

        // Calcula o total
        const total = produtos.reduce((sum, prod) => sum + prod.valorTotal, 0);

        // Cria o objeto orçamento
        const orcamento = {
            id: cliente.numero || `ORC_${Date.now()}`,
            cliente: cliente,
            produtos: produtos,
            total: total,
            dataCriacao: new Date().toISOString(),
            status: 'ativo'
        };

        // Tenta salvar na pasta específica primeiro
        const salvouNaPasta = await salvarNaPastaEspecifica(orcamento);

        // Salva no localStorage como fallback
        let orcamentos = JSON.parse(localStorage.getItem('orcamentosPasta2025') || '[]');
        const index = orcamentos.findIndex(o => o.id === orcamento.id);
        if (index >= 0) {
            orcamentos[index] = orcamento;
        } else {
            orcamentos.unshift(orcamento);
        }
        localStorage.setItem('orcamentosPasta2025', JSON.stringify(orcamentos));

        // Notifica o usuário
        if (salvouNaPasta) {
            showNotification('✅ Orçamento salvo na pasta específica!', 'success');
        } else {
            showNotification('✅ Orçamento salvo localmente!', 'info');
        }

        // Atualiza a lista de orçamentos se estiver na página de orçamentos
        if (window.location.pathname.includes('orcamentos.html')) {
            carregarOrcamentosDaPastaLocalStorage();
        }

    } catch (error) {
        console.error('Erro ao salvar automaticamente:', error);
        showNotification('❌ Erro ao salvar orçamento', 'error');
    }
}

// Configurações de salvamento automático
let ultimoSalvamento = 0;
const INTERVALO_SALVAMENTO = 15000; // 15 segundos

// Salva automaticamente quando há mudanças
function configurarSalvamentoAutomatico() {
    // Observa mudanças nos inputs
    const observarMudancas = () => {
        const agora = Date.now();
        if (agora - ultimoSalvamento > INTERVALO_SALVAMENTO) {
            const temProdutos = Array.from(document.querySelectorAll('.quantidade')).some(input =>
                parseFloat(input.value) > 0
            );

            if (temProdutos) {
                salvarAutomaticamente();
                ultimoSalvamento = agora;
            }
        }
    };

    // Adiciona listeners para mudanças
    document.addEventListener('input', (e) => {
        if (e.target.matches('.quantidade, .largura, .comprimento') ||
            e.target.id?.startsWith('cliente_')) {
            observarMudancas();
        }
    });

    // Salva ao sair da página
    window.addEventListener('beforeunload', () => {
        const temProdutos = Array.from(document.querySelectorAll('.quantidade')).some(input =>
            parseFloat(input.value) > 0
        );

        if (temProdutos && Date.now() - ultimoSalvamento > 2000) {
            salvarAutomaticamente();
        }
    });
}

// Inicia o salvamento automático
configurarSalvamentoAutomatico();

// Salva automaticamente a cada 30 segundos se houver produtos
setInterval(() => {
    const temProdutos = Array.from(document.querySelectorAll('.quantidade')).some(input =>
        parseFloat(input.value) > 0
    );

    if (temProdutos) {
        salvarAutomaticamente();
    }
}, 10000); // 30 segundos

// Salva ao sair da página
window.addEventListener('beforeunload', () => {
    const temProdutos = Array.from(document.querySelectorAll('.quantidade')).some(input =>
        parseFloat(input.value) > 0
    );

    if (temProdutos) {
        salvarAutomaticamente();
    }
});

// Função para garantir que os orçamentos sejam sempre salvos no localStorage
function garantirPersistenciaOrcamentos() {
    // Verifica se já existe a chave no localStorage
    if (!localStorage.getItem('orcamentosPasta2025')) {
        localStorage.setItem('orcamentosPasta2025', JSON.stringify([]));
    }
}

// Chama ao iniciar
garantirPersistenciaOrcamentos();


// Função para salvar automaticamente com fallback garantido
async function salvarAutomaticamenteNaPasta() {
    try {
        // 1. Coleta dados do orçamento
        const cliente = {
            nome: document.getElementById('cliente_nome')?.value || '',
            endereco: document.getElementById('cliente_endereco')?.value || '',
            telefone: document.getElementById('cliente_telefone')?.value || '',
            data: document.getElementById('cliente_data')?.value || '',
            servico: document.getElementById('cliente_servico')?.value || '',
            numero: document.getElementById('cliente_numero')?.value || '',
            funcionario: document.getElementById('cliente_funcionario')?.value || ''
        };

        // Coleta produtos
        const produtos = [];
        document.querySelectorAll('.planilha tbody tr').forEach(tr => {
            const Q = parseFloat(tr.querySelector('.quantidade')?.value) || 0;
            if (Q > 0) {
                produtos.push({
                    codigo: tr.cells[1]?.textContent.trim(),
                    nome: tr.cells[2]?.textContent.trim(),
                    unidade: tr.cells[5]?.textContent.trim(),
                    largura: parseFloat(tr.querySelector('.largura')?.value) || 0,
                    comprimento: parseFloat(tr.querySelector('.comprimento')?.value) || 0,
                    quantidade: Q,
                    valorTotal: parseFloat(tr.querySelector('.valor-total')?.textContent.replace(',', '.')) || 0
                });
            }
        });

        if (produtos.length === 0) return;

        const total = produtos.reduce((sum, prod) => sum + prod.valorTotal, 0);

        // 2. Cria arquivo Excel
        const wb = XLSX.utils.book_new();
        const wsData = [
            ['CLIENTE', cliente.nome],
            ['ENDEREÇO', cliente.endereco],
            ['TELEFONE', cliente.telefone],
            ['DATA', cliente.data],
            ['SERVIÇO', cliente.servico],
            ['FUNCIONÁRIO', cliente.funcionario],
            ['Nº', cliente.numero],
            [],
            ['CÓDIGO', 'PRODUTO', 'UNID', 'COMPR', 'LARG', 'QTD', 'VALOR']
        ];

        produtos.forEach(p => {
            wsData.push([
                p.codigo,
                p.nome,
                p.unidade,
                p.comprimento,
                p.largura,
                p.quantidade,
                p.valorTotal.toFixed(2).replace('.', ',')
            ]);
        });

        wsData.push([]);
        wsData.push(['', 'TOTAL', '', '', '', '', total.toFixed(2).replace('.', ',')]);

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');

        // 3. Nome do arquivo
        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR').replace(/\//g, '-');
        const fileName = `ORÇAMENTO_${cliente.nome || 'SEM_NOME'}_${dataFormatada}.xlsx`
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9-_]/g, '');

        // 4. Tenta salvar na pasta específica (sem pedir permissão)
        try {
            // Verifica se já temos permissão para a pasta
            if (window.directoryHandle) {
                const pasta = dirHandle;
                const fileHandle = await pasta.getFileHandle(fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(XLSX.write(wb, { bookType: 'xlsx', type: 'array' }));
                await writable.close();

                console.log('✅ Salvo na pasta específica:', fileName);
                showNotification('✅ Salvo na pasta orçamestos 2025!', 'success');
                return true;
            }
        } catch (err) {
            console.log('Tentando método alternativo...');
        }

        // 5. Fallback: Download direto
        const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        // Força download na pasta Downloads padrão
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        // 6. Sempre salva no localStorage também
        const orcamentoData = {
            id: cliente.numero || `ORC_${Date.now()}`,
            cliente: cliente,
            produtos: produtos,
            total: total,
            dataCriacao: agora.toISOString(),
            status: 'ativo',
            arquivo: fileName
        };

        let orcamentos = JSON.parse(localStorage.getItem('orcamentosPasta2025') || '[]');
        const index = orcamentos.findIndex(o => o.id === orcamentoData.id);
        if (index >= 0) {
            orcamentos[index] = orcamentoData;
        } else {
            orcamentos.unshift(orcamentoData);
        }
        localStorage.setItem('orcamentosPasta2025', JSON.stringify(orcamentos));

        console.log('✅ Salvo via download e localStorage:', fileName);
        showNotification('✅ Orçamento salvo com sucesso!', 'success');
        return true;

    } catch (error) {
        console.error('Erro ao salvar:', error);
        showNotification('❌ Erro ao salvar orçamento', 'error');
        return false;
    }
}

// Função simplificada para carregar orçamentos do localStorage
function carregarOrcamentosDaPastaLocalStorage() {
    try {
        const orcamentos = JSON.parse(localStorage.getItem('orcamentosPasta2025') || '[]');

        // Ordena por data (mais recente primeiro)
        orcamentos.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));

        renderizarOrcamentos(orcamentos);

        if (orcamentos.length === 0) {
            const noResults = document.getElementById('noResults');
            if (noResults) {
                noResults.style.display = 'block';
                noResults.innerHTML = `
                    <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                    <p>Nenhum orçamento encontrado.</p>
                    <p style="font-size: 12px; color: #666;">Os orçamentos são salvos automaticamente ao exportar.</p>
                `;
            }
        }

        console.log(`✅ ${orcamentos.length} orçamentos carregados do localStorage`);
        return orcamentos;

    } catch (error) {
        console.error('Erro ao carregar orçamentos:', error);
        renderizarOrcamentos([]);
        return [];
    }
}

// Função para renderizar orçamentos na tabela
function renderizarOrcamentos(orcamentos) {
    const tbody = document.getElementById('orcamentosList');
    const noResults = document.getElementById('noResults');

    if (!tbody) return;

    if (orcamentos.length === 0) {
        tbody.innerHTML = '';
        if (noResults) {
            noResults.style.display = 'block';
        }
        return;
    }

    if (noResults) {
        noResults.style.display = 'none';
    }

    tbody.innerHTML = orcamentos.map(orc => {
        const data = new Date(orc.dataCriacao);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        return `
            <tr>
                <td>${orc.id}</td>
                <td>${orc.cliente.nome}</td>
                <td>${orc.cliente.servico || 'Sem descrição'}</td>
                <td>${dataFormatada} ${horaFormatada}</td>
                <td>R$ ${orc.total.toFixed(2).replace('.', ',')}</td>
                <td>${orc.cliente.funcionario || 'Sistema'}</td>
                <td>
                    <span class="status-badge status-${orc.status || 'ativo'}">
                        ${orc.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-edit" onclick="editarOrcamento('${orc.id}')" title="Editar">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="btn-action btn-print" onclick="imprimirOrcamento('${orc.id}')" title="Imprimir">
                            <i class="fas fa-print"></i>
                        </button>
                        <button class="btn-action btn-delete" onclick="excluirOrcamento('${orc.id}')" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

/* ---------- LEITURA DA PASTA -> localStorage ---------- */
async function sincronizarPastaComLocalStorage() {
    if (!window.pastaOrcamentosHandle) return;
    const novos = [];
    for await (const [name, handle] of window.pastaOrcamentosHandle.entries()) {
        if (handle.kind !== 'file' || !name.endsWith('.xlsx')) continue;
        const file = await handle.getFile();
        const rows = XLSX.read(await file.arrayBuffer(), { type: 'array' }).Sheets;
        const data = XLSX.utils.sheet_to_json(rows[rows.length - 1], { header: 1, defval: '' });

        // extrai cliente (mesma lógica do import)
        const cliente = {
            nome: String(data[1]?.[1] || ''),
            endereco: String(data[2]?.[1] || ''),
            telefone: String(data[3]?.[1] || ''),
            data: String(data[4]?.[1] || ''),
            servico: String(data[5]?.[1] || ''),
            funcionario: String(data[6]?.[1] || ''),
            numero: String(data[0]?.[7] || name.replace('.xlsx', ''))
        };

        // extrai produtos
        const ini = data.findIndex(l => String(l[0]).toUpperCase().includes('COD'));
        const produtos = [];
        let total = 0;
        for (let i = ini + 1; i < data.length; i++) {
            const [cod, descr, unid, comp, alt, qtd, vlr] = data[i];
            if (!qtd) break;
            const val = parseFloat(String(vlr).replace(',', '.')) || 0;
            produtos.push({ codigo: cod, nome: descr, unidade: unid, largura: alt, comprimento: comp, quantidade: qtd, valorTotal: val });
            total += val;
        }

        novos.push({
            id: cliente.numero,
            cliente,
            produtos,
            total,
            dataCriacao: new Date(file.lastModified).toISOString(),
            status: 'ativo'
        });
    }
    // merge com localStorage
    const existentes = JSON.parse(localStorage.getItem('orcamentosPasta2025') || '[]');
    const map = new Map(existentes.map(o => [o.id, o]));
    novos.forEach(n => map.set(n.id, n));
    const atualizados = Array.from(map.values()).sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
    localStorage.setItem('orcamentosPasta2025', JSON.stringify(atualizados));


}

// ======= FUNÇÃO TOGGLE CÁPSULA =======
function toggleCapsula(btn) {
    const conteudo = btn.nextElementSibling;
    const icon = btn.querySelector('.capsula-icon i');
    const isOpen = conteudo.style.display === 'block';

    // Fecha todas as cápsulas da mesma página (opcional - comportamento accordion)
    // Se quiser que abram independentemente, comente as 3 linhas abaixo
    // const container = btn.closest('.pagina');
    // container.querySelectorAll('.capsula-conteudo').forEach(c => c.style.display = 'none');
    // container.querySelectorAll('.capsula-icon i').forEach(i => i.className = 'fas fa-chevron-right');

    if (isOpen) {
        conteudo.style.display = 'none';
        icon.className = 'fas fa-chevron-right';
        btn.classList.remove('ativa');
    } else {
        conteudo.style.display = 'block';
        icon.className = 'fas fa-chevron-down';
        btn.classList.add('ativa');
    }

    // Recalcula após abrir (garante que inputs novos sejam monitorados)
    setTimeout(() => {
        monitorarInputs();
        calcularValores();
    }, 50);
}

// ======= FUNÇÃO PARA BLOQUEAR AUTOCOMPLETE DINAMICAMENTE =======
function bloquearAutocompleteCliente() {
    const paginaCliente = document.querySelector('.pagina.ativa');
    if (!paginaCliente) return;

    const inputs = paginaCliente.querySelectorAll('input[type="text"]');
    inputs.forEach(function (input) {
        // Define autocomplete para valor que o Chrome não reconhece como campo de formulário
        input.setAttribute('autocomplete', 'one-time-code');
        input.setAttribute('data-lpignore', 'true');
        input.setAttribute('data-form-type', 'other');

        // Para campos de data e número, adiciona readonly que é removido no focus
        if (input.id === 'cliente_data' || input.id === 'cliente_numero') {
            if (!input.hasAttribute('readonly')) {
                input.setAttribute('readonly', 'readonly');
            }
        }

        // Previne o dropdown de autocomplete do Chrome
        input.addEventListener('focus', function (e) {
            this.setAttribute('autocomplete', 'one-time-code');
            if (this.id === 'cliente_data' || this.id === 'cliente_numero') {
                this.removeAttribute('readonly');
            }
        });

        input.addEventListener('blur', function (e) {
            if (this.id === 'cliente_data' || this.id === 'cliente_numero') {
                this.setAttribute('readonly', 'readonly');
            }
        });

        // Previne sugestões ao digitar
        input.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                if (this.getAttribute('autocomplete') === 'one-time-code') {
                    e.stopPropagation();
                }
            }
        });
    });
}