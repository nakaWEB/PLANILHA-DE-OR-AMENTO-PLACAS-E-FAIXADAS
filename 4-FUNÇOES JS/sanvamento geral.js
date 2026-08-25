/* ----------  SALVAR EM PASTA PERÇONALIZADA  ---------- */
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