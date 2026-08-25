// ======= SISTEMA DE BANCO DE DADOS LOCAL =======
const ORCAMENTOS_DB = 'orcamentosDB';
const LOG_DB = 'logDB';

// Estrutura do orçamento
class Orcamento {
    constructor(id, cliente, produtos, total, dataCriacao, criadoPor) {
        this.id = id;
        this.cliente = cliente;
        this.produtos = produtos;
        this.total = total;
        this.dataCriacao = dataCriacao;
        this.dataEdicao = dataCriacao;
        this.criadoPor = criadoPor;
        this.editadoPor = criadoPor;
        this.status = 'ativo'; // ativo, inativo, finalizado
        this.observacoes = '';
    }
}

// Estrutura do log
class LogEdicao {
    constructor(orcamentoId, usuario, acao, data, detalhes) {
        this.orcamentoId = orcamentoId;
        this.usuario = usuario;
        this.acao = acao; // criado, editado, excluido
        this.data = data;
        this.detalhes = detalhes;
    }
}

// Inicializa o banco de dados
function inicializarBanco() {
    if (!localStorage.getItem(ORCAMENTOS_DB)) {
        localStorage.setItem(ORCAMENTOS_DB, JSON.stringify({}));
    }
    if (!localStorage.getItem(LOG_DB)) {
        localStorage.setItem(LOG_DB, JSON.stringify([]));
    }
}

// Salvar orçamento
function salvarOrcamento(orcamento) {
    try {
        const orcamentos = JSON.parse(localStorage.getItem(ORCAMENTOS_DB) || '{}');
        orcamentos[orcamento.id] = orcamento;
        localStorage.setItem(ORCAMENTOS_DB, JSON.stringify(orcamentos));
        
        // Registrar log
        registrarLog(orcamento.id, 'criado', `Orçamento criado para ${orcamento.cliente.nome}`);
        
        return { sucesso: true, mensagem: 'Orçamento salvo com sucesso!' };
    } catch (error) {
        return { sucesso: false, mensagem: 'Erro ao salvar orçamento: ' + error.message };
    }
}

// Buscar orçamento por ID
function buscarOrcamento(id) {
    const orcamentos = JSON.parse(localStorage.getItem(ORCAMENTOS_DB) || '{}');
    return orcamentos[id] || null;
}

// Listar todos os orçamentos
function listarOrcamentos(filtro = '') {
    const orcamentos = JSON.parse(localStorage.getItem(ORCAMENTOS_DB) || '{}');
    let lista = Object.values(orcamentos);
    
    // Aplicar filtro por nome do cliente
    if (filtro) {
        lista = lista.filter(orc => 
            orc.cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            orc.cliente.servico.toLowerCase().includes(filtro.toLowerCase())
        );
    }
    
    // Ordenar por data (mais recente primeiro)
    lista.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
    
    return lista;
}

// Atualizar orçamento
function atualizarOrcamento(id, dados) {
    try {
        const orcamentos = JSON.parse(localStorage.getItem(ORCAMENTOS_DB) || '{}');
        
        if (!orcamentos[id]) {
            return { sucesso: false, mensagem: 'Orçamento não encontrado' };
        }
        
        // Atualiza dados
        orcamentos[id] = { ...orcamentos[id], ...dados, dataEdicao: new Date().toISOString() };
        localStorage.setItem(ORCAMENTOS_DB, JSON.stringify(orcamentos));
        
        // Registrar log
        registrarLog(id, 'editado', `Orçamento atualizado para ${dados.cliente?.nome || orcamentos[id].cliente.nome}`);
        
        return { sucesso: true, mensagem: 'Orçamento atualizado com sucesso!' };
    } catch (error) {
        return { sucesso: false, mensagem: 'Erro ao atualizar orçamento: ' + error.message };
    }
}

// Excluir orçamento (soft delete)
function excluirOrcamento(id) {
    try {
        const orcamentos = JSON.parse(localStorage.getItem(ORCAMENTOS_DB) || '{}');
        
        if (!orcamentos[id]) {
            return { sucesso: false, mensagem: 'Orçamento não encontrado' };
        }
        
        orcamentos[id].status = 'inativo';
        orcamentos[id].dataEdicao = new Date().toISOString();
        localStorage.setItem(ORCAMENTOS_DB, JSON.stringify(orcamentos));
        
        // Registrar log
        registrarLog(id, 'excluido', `Orçamento excluído para ${orcamentos[id].cliente.nome}`);
        
        return { sucesso: true, mensagem: 'Orçamento excluído com sucesso!' };
    } catch (error) {
        return { sucesso: false, mensagem: 'Erro ao excluir orçamento: ' + error.message };
    }
}

// Registrar log de edição
function registrarLog(orcamentoId, acao, detalhes) {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
    const log = new LogEdicao(
        orcamentoId,
        session.nome || 'Sistema',
        acao,
        new Date().toISOString(),
        detalhes
    );
    
    const logs = JSON.parse(localStorage.getItem(LOG_DB) || '[]');
    logs.unshift(log); // Adiciona no início
    
    // Mantém apenas os últimos 1000 logs
    if (logs.length > 1000) {
        logs.splice(1000);
    }
    
    localStorage.setItem(LOG_DB, JSON.stringify(logs));
}

// Buscar logs por orçamento
function buscarLogsPorOrcamento(orcamentoId) {
    const logs = JSON.parse(localStorage.getItem(LOG_DB) || '[]');
    return logs.filter(log => log.orcamentoId === orcamentoId);
}

// Buscar logs por usuário
function buscarLogsPorUsuario(usuarioId) {
    const logs = JSON.parse(localStorage.getItem(LOG_DB) || '[]');
    return logs.filter(log => log.usuario === usuarioId);
}

// Gerar ID único
function gerarIdOrcamento() {
    return 'ORC_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Exportar orçamento para arquivo
function exportarOrcamentoParaArquivo(orcamento) {
    const dados = {
        versao: '1.0',
        orcamento: orcamento,
        exportadoEm: new Date().toISOString()
    };
    
    return JSON.stringify(dados, null, 2);
}

// Importar orçamento de arquivo
function importarOrcamentoDeArquivo(conteudo) {
    try {
        const dados = JSON.parse(conteudo);
        
        if (!dados.orcamento) {
            return { sucesso: false, mensagem: 'Arquivo inválido' };
        }
        
        // Valida estrutura básica
        const orc = dados.orcamento;
        if (!orc.id || !orc.cliente || !orc.produtos) {
            return { sucesso: false, mensagem: 'Estrutura do orçamento inválida' };
        }
        
        return { sucesso: true, orcamento: orc };
    } catch (error) {
        return { sucesso: false, mensagem: 'Erro ao importar: ' + error.message };
    }
}

// Inicializa o banco
inicializarBanco();