const PDF_CONFIG = {
    // Formato da página
    //595, 530
    formatoPagina: [600, 700],
    orientacao: 'landscape',//landscape (paisagem/horizontal)portrait (retrato/vertical)

    clienteInicioY: 111,         // ← Dados do cliente (Nome, Contato, Telefone...)
    tabelaInicioY: 150,         // ← Tabela de produtos (header)
    totaisInicioY: 335,         // ← Seção de totais (Total, Total à vista)
    dataY: 80,                 // ← Data do orçamento
    prazosInicioY: 390,         // ← Rodapé de prazos e condições
    watermarkY: 820,            // ← Watermark "as informática"

    // Multiplicador de altura (deixe 1 para controle manual puro)
    multiplicadorAltura: 1,
    margemInferiorExtra: 0,

    tabelaPosicaoX: 10,         // ← MUDE linha AQUI: padrão é 50, tente 30, 80, 100...
    tabelaLarguraTotal: 680,    // ← Largura total da tabela

    logoPrincipal: {
        caminho: './imagens/LOGO SEM FUNDO.png',   // ← Logo colorida (cabeçalho)
        x: 40,                                      // ← Posição horizontal
        y: 20,                                      // ← Posição vertical
        largura: 83,                               // ← Largura em pontos
        altura: 44,                                 // ← Altura em pontos
        ativo: true                                 // ← true/false para mostrar
    },

    logoSecundaria: {
        caminho: './imagens/LOGO CINZA SEM FUNDO.png',  // ← Logo cinza (watermark/rodapé)
        x: 290,                                         // ← Posição horizontal
        y: 400,                                         // ← Posição vertical
        largura: 120,                                    // ← Largura em pontos
        altura: 63,                                     // ← Altura em pontos
        ativo: true,                                    // ← true/false para mostrar
        opacidade: 0                                  // ← 0.1 a 1.0 (transparência)
    },
};

const PDF_POSICOES = {
    // Cabeçalho azul (fixo no topo)
    header: {
        altura: 92.54,
        corFundo: [60, 80, 140],
        logoX: 40,
        logoY: 20,
        logoLargura: 100,
        logoAltura: 70,
        empresaX: 187,
        empresaY: 22,
        espacamentoLinhas: 14.5,
        fonteTitulo: 9,
        fonteInfo: 9,
    },

    // Dados do cliente — inicioY AGORA vem de PDF_CONFIG.clienteInicioY
    cliente: {
        coluna1X: 10,
        coluna2X: 248,
        coluna3X: 438,
        espacamentoLabelValor: 22,
        espacamentoGrupos: 50,
        fonteLabel: 8,
        fonteValor: 8,
        corLabel: [136, 136, 136],
    },

    // Tabela de produtos — inicioY AGORA vem de PDF_CONFIG.tabelaInicioY
    tabela: {
        fonte: 9,
        headerAltura: 18.5,
        linhaAltura: 35,
        maxLinhas: 1,
        colunas: {
            //valores separados do nome mudar distancia Y
            imagem: { x: 0, largura: 110, label: 'Imagem' },
            descricao: { x: 155, largura: 259, label: 'Descrição' },
            qtde: { x: 4970, largura: 2000, label: 'Qtde' },
            vUnit: { x: 540, largura: 0, label: 'V. Unit' },
            subtotal: { x: 620, largura: 0, label: 'Subtotal' },
        },
        corHeaderFundo: [245, 245, 245],
        corLinhaPar: [250, 250, 250],
        corLinhaImpar: [255, 255, 255],
        corBorda: [220, 220, 220],
    },

    // Totais — inicioY AGORA vem de PDF_CONFIG.totaisInicioY
    totais: {
        labelX: 800,
        valorX: 1000,
        espacamento: 30,
        fonte: 15,
    },

    // Data — y AGORA vem de PDF_CONFIG.dataY
    data: {
        x: 620,
        fonteLabel: 8,
        fonteValor: 8,
        corLabel: [0, 0, 0],
    },

    // Rodapé - Prazos — inicioY AGORA vem de PDF_CONFIG.prazosInicioY
    prazos: {
        tituloX: 15,
        fonteTitulo: 12,
        coluna1X: 15,
        coluna2X: 200,
        espacamentoLabelValor: 20,
        espacamentoGrupos: 25,
        fonteLabel: 8,
        fonteValor: 10,
        corLabel: [136, 136, 136],
    },

    // Rodapé azul
    footer: {
        altura: 50,
        fonte: 10,
        corFundo: [60, 80, 140],
    },

    // Imagem do produto na tabela
    imagemProduto: {
        x: 14,
        y: 2,
        larguraPadrao: 8,
        alturaPadrao: 80,
        margemExtra: 15,
        maxLargura: 125,
        maxAltura: 400,
    },

    // Descrição — CONFIGURAÇÃO DE QUEBRA DE LINHA
    descricao: {
        maxCaracteresPorLinha: 85,
        espacamentoEntreLinhas: 14,
        fonte: 9,
        maxLinhas: 10,   // ← NOVO: Limite de linhas
    },

    // Watermark logo
    watermark: {
        x: 400,
        tamanhoFonte: 50,
        cor: [220, 220, 220],
    },
};

// Variáveis globais para imagens
let imagemProdutoPDF = null;
let dimensoesImagemPDF = { largura: 0, altura: 0 };
let logoPrincipalBase64 = null;
let logoSecundariaBase64 = null;

// ======= FUNÇÃO: CARREGAR IMAGEM COMO BASE64 =======
function carregarImagemBase64(caminho) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const base64 = canvas.toDataURL('image/png');
            resolve({
                base64: base64,
                largura: img.naturalWidth,
                altura: img.naturalHeight
            });
        };
        img.onerror = () => reject(new Error(`Falha ao carregar imagem: ${caminho}`));
        img.src = caminho;
    });
}

// ======= FUNÇÃO: PRÉ-CARREGAR LOGOS =======
async function preCarregarLogos() {
    const cfg = PDF_CONFIG;

    try {
        if (cfg.logoPrincipal.ativo && cfg.logoPrincipal.caminho) {
            const resultado = await carregarImagemBase64(cfg.logoPrincipal.caminho);
            logoPrincipalBase64 = resultado.base64;
            console.log('✅ Logo principal carregada:', cfg.logoPrincipal.caminho);
        }
    } catch (e) {
        console.warn('⚠️ Logo principal não carregada:', e.message);
        logoPrincipalBase64 = null;
    }

    try {
        if (cfg.logoSecundaria.ativo && cfg.logoSecundaria.caminho) {
            const resultado = await carregarImagemBase64(cfg.logoSecundaria.caminho);
            logoSecundariaBase64 = resultado.base64;
            console.log('✅ Logo secundária carregada:', cfg.logoSecundaria.caminho);
        }
    } catch (e) {
        console.warn('⚠️ Logo secundária não carregada:', e.message);
        logoSecundariaBase64 = null;
    }
}

// ======= FUNÇÃO AUXILIAR: APLICAR CONFIGURAÇÕES DE POSIÇÃO =======
function aplicarConfiguracoesPosicao() {
    const cfg = PDF_CONFIG;

    // Aplica offset X da tabela (apenas movimento horizontal)
    const offsetX = cfg.tabelaPosicaoX - 50;

    PDF_POSICOES.tabela.colunas.imagem.x;
    PDF_POSICOES.tabela.colunas.descricao.x;
    PDF_POSICOES.tabela.colunas.qtde.x;
    PDF_POSICOES.tabela.colunas.vUnit.x;
    PDF_POSICOES.tabela.colunas.subtotal.x;

    PDF_POSICOES.imagemProduto.x;

    console.log(`📐 Configurações aplicadas: offsetX=${offsetX} | Posições Y → cliente=${cfg.clienteInicioY}, tabela=${cfg.tabelaInicioY}, totais=${cfg.totaisInicioY}, prazos=${cfg.prazosInicioY}`);
}

// ======= FUNÇÃO: UPLOAD DE IMAGEM DO PRODUTO =======
function setupUploadImagem() {
    let inputFile = document.getElementById('inputUploadImagemPDF');
    if (!inputFile) {
        inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.id = 'inputUploadImagemPDF';
        inputFile.accept = 'image/*';
        inputFile.style.display = 'none';
        inputFile.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (evt) {
                imagemProdutoPDF = evt.target.result;

                const img = new Image();
                img.onload = function () {
                    dimensoesImagemPDF = {
                        largura: img.naturalWidth,
                        altura: img.naturalHeight
                    };
                    showNotification(`Imagem carregada! (${img.naturalWidth}x${img.naturalHeight}px)`, 'success');
                };
                img.src = imagemProdutoPDF;

                const preview = document.getElementById('previewImagemPDF');
                if (preview) {
                    preview.src = imagemProdutoPDF;
                    preview.style.display = 'inline-block';
                }
                const nomeArq = document.getElementById('nomeArquivoImagem');
                if (nomeArq) nomeArq.textContent = file.name;
            };
            reader.readAsDataURL(file);
        });
        document.body.appendChild(inputFile);
    }
}

function abrirUploadImagemPDF() {
    setupUploadImagem();
    document.getElementById('inputUploadImagemPDF').click();
}

// ======= FUNÇÃO: ADICIONAR CAMPOS NA PÁGINA CLIENTE =======
function adicionarCamposPDFnaPaginaCliente() {
    const tbody = document.querySelector('.pagina.ativa .planilha tbody, #paginas-container .pagina:first-child .planilha tbody');
    if (!tbody) {
        console.warn('Tabela do cliente não encontrada');
        return;
    }

    if (document.getElementById('cliente_descricao_pdf')) return;

    const trDesc = document.createElement('tr');
    trDesc.innerHTML = `
        <td><i class="fas fa-file-alt" ></i> DESCRIÇÃO PDF</td>
        <td colspan="8">
            <textarea id="cliente_descricao_pdf"
                style="width:98%; min-height:50px; resize:vertical; padding:8px; border:1px solid var(--borda-img-at); border-radius:4px; font-family:inherit; color: var(--valor-celula)"
                placeholder="Descrição que aparecerá no PDF (serviço/produto)..."
            ></textarea>
        </td>
    `;
    tbody.appendChild(trDesc);

    const trImg = document.createElement('tr');
    trImg.innerHTML = `
        <td><i class="fas fa-image" style="color: var (--escrita);"></i> IMAGEM PDF</td>
        <td colspan="8" style="padding:10px;">
            <button type="button" onclick="abrirUploadImagemPDF()"
                style=" color: var(--valor-celula); padding:8px 16px; cursor:pointer; border:1px solid var(--linha-planilha); border-radius:4px;
                       background: var(--celula-valores);  font-weight:500;">
                <i class="fas fa-upload" style="color: var(--valor-celula);"></i> Escolher Imagem
            </button>
            <img id="previewImagemPDF" style="display:none; max-width:80px; max-height:80px; margin-left:15px; vertical-align:middle; border:1px solid var(--borda-img-at); border-radius:4px;" />
            <span id="nomeArquivoImagem" style="margin-left:10px; font-size:12px; color: var (--valor-celula);"></span>
        </td>
    `;
    tbody.appendChild(trImg);

    setupUploadImagem();
}

// ======= FUNÇÃO: QUEBRAR TEXTO EM LINHAS =======
function quebrarTextoEmLinhas(texto, maxCaracteres) {
    if (!texto || texto.length === 0) return [''];
    if (texto.length <= maxCaracteres) return [texto];

    const linhas = [];
    let inicio = 0;

    while (inicio < texto.length) {
        let fim = inicio + maxCaracteres;

        if (fim < texto.length) {
            let ultimoEspaco = texto.lastIndexOf(' ', fim);
            if (ultimoEspaco > inicio) {
                fim = ultimoEspaco;
            }
        }

        linhas.push(texto.substring(inicio, fim).trim());
        inicio = fim + 1;
    }

    return linhas;
}

// ======= FUNÇÃO: CALCULAR DIMENSÕES DA IMAGEM =======
function calcularDimensoesImagemPDF() {
    const cfg = PDF_POSICOES.imagemProduto;

    if (!imagemProdutoPDF || dimensoesImagemPDF.largura === 0) {
        return {
            largura: cfg.larguraPadrao,
            altura: cfg.alturaPadrao,
            larguraComMargem: cfg.larguraPadrao + (cfg.margemExtra * 2),
            alturaComMargem: cfg.alturaPadrao + (cfg.margemExtra * 2)
        };
    }

    const proporcao = Math.min(
        cfg.maxLargura / dimensoesImagemPDF.largura,
        cfg.maxAltura / dimensoesImagemPDF.altura,
        1
    );

    const larguraFinal = dimensoesImagemPDF.largura * proporcao;
    const alturaFinal = dimensoesImagemPDF.altura * proporcao;

    return {
        largura: larguraFinal,
        altura: alturaFinal,
        larguraComMargem: larguraFinal + (cfg.margemExtra * 2),
        alturaComMargem: alturaFinal + (cfg.margemExtra * 2)
    };
}

// ======= FUNÇÃO PRINCIPAL: GERAR PDF =======
async function gerarPDFDoOrcamento() {
    showLoading(true);
    showNotification('Gerando PDF, aguarde...', 'info');

    try {
        // Pré-carrega logos antes de gerar
        await preCarregarLogos();

        aplicarConfiguracoesPosicao();

        if (typeof window.jspdf === 'undefined') {
            await carregarJsPDF();
        }
        const { jsPDF } = window.jspdf;

        const cliente = coletarDadosCliente();
        const { produtos, subTotal } = coletarProdutos();
        const totais = calcularTotais(subTotal);

        const doc = new jsPDF({
            orientation: PDF_CONFIG.orientacao,
            unit: 'pt',
            format: PDF_CONFIG.formatoPagina
        });

        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();

        console.log(`📄 Tamanho do PDF: ${pageW.toFixed(0)} x ${pageH.toFixed(0)} pontos`);
        console.log(`📐 Posição X da tabela: ${PDF_CONFIG.tabelaPosicaoX}`);

        desenharCabecalho(doc, pageW);
        desenharDadosCliente(doc, cliente);

        const alturaTabela = desenharTabelaProdutos(doc, cliente, produtos, totais);

        const posTotais = Math.max(
            PDF_CONFIG.totaisInicioY,
            PDF_CONFIG.tabelaInicioY + alturaTabela + 20
        );

        desenharTotais(doc, totais, cliente, posTotais);
        desenharPrazos(doc, pageW, posTotais + 60);
        desenharFooter(doc, pageW, pageH);

        const nomeArquivo = `ORCAMENTO_${(cliente.nome || 'SEM_NOME').replace(/\s+/g, '_')}_${cliente.data.replace(/\//g, '-')}.pdf`;
        doc.save(nomeArquivo);

        showLoading(false);
        showNotification('PDF gerado e baixado com sucesso!', 'success');

    } catch (erro) {
        showLoading(false);
        console.error('Erro ao gerar PDF:', erro);
        showNotification('Erro ao gerar PDF: ' + erro.message, 'error');
    }
}

// ======= FUNÇÕES AUXILIARES DO PDF =======

function coletarDadosCliente() {
    return {
        nome: document.getElementById('cliente_nome')?.value?.trim() || 'CLIENTE',
        endereco: document.getElementById('cliente_endereco')?.value?.trim() || 'XXX',
        telefone: document.getElementById('cliente_telefone')?.value?.trim() || '+55 (00) 00000-0000',
        data: document.getElementById('cliente_data')?.value?.trim() || new Date().toLocaleDateString('pt-BR'),
        servico: document.getElementById('cliente_servico')?.value?.trim() || '',
        numero: document.getElementById('cliente_numero')?.value?.trim() || '',
        funcionario: document.getElementById('cliente_funcionario')?.value?.trim() || '',
        cnpj: document.getElementById('cliente_cnpj')?.value?.trim() || '00.000.000/0000-00',
        descricao: document.getElementById('cliente_descricao_pdf')?.value?.trim() || '',
    };
}

function coletarProdutos() {
    const produtos = [];
    let subTotal = 0;

    document.querySelectorAll('.planilha tbody tr').forEach(tr => {
        const Q = parseFloat(tr.querySelector('.quantidade')?.value) || 0;
        if (Q > 0) {
            const vlr = parseFloat(tr.querySelector('.valor-total')?.textContent.replace(',', '.')) || 0;
            produtos.push({
                codigo: tr.cells[1]?.textContent?.trim() || '',
                nome: tr.cells[2]?.textContent?.trim() || '',
                quantidade: 1,
                valorTotal: vlr
            });
            subTotal += vlr;
        }
    });

    return { produtos, subTotal };
}

function calcularTotais(subTotal) {
    const imposto = subTotal * 0.14;
    const total = subTotal + imposto;
    return {
        subTotal,
        imposto,
        total,
        totalAvista: total,
        totalPrazo: total * 1.05,
    };
}

// Desenha cabeçalho azul com logo configurável
function desenharCabecalho(doc, pageW) {
    const h = PDF_POSICOES.header;
    const cfgLogo = PDF_CONFIG.logoPrincipal;

    // Fundo azul do cabeçalho
    doc.setFillColor(...h.corFundo);
    doc.rect(0, 0, pageW, h.altura, 'F');

    // Logo principal (imagem PNG)
    if (cfgLogo.ativo && logoPrincipalBase64) {
        try {
            doc.addImage(
                logoPrincipalBase64,
                'PNG',
                cfgLogo.x,
                cfgLogo.y,
                cfgLogo.largura,
                cfgLogo.altura
            );
        } catch (e) {
            console.warn('Erro ao adicionar logo principal:', e);
            desenharLogoFallback(doc, h, cfgLogo); // Desenha círculos como fallback
        }
    } else {
        // Fallback: desenha círculos coloridos (logo antigo)
        desenharLogoFallback(doc, h, cfgLogo);
    }

    // Texto da empresa
    doc.setTextColor(255, 255, 255);
    let y = h.empresaY;

    doc.setFontSize(h.fonteTitulo);
    doc.setFont('helvetica', 'bold');
    doc.text('AS Informática Ltda EPP', h.empresaX, y);
    y += h.espacamentoLinhas;

    doc.setFontSize(h.fonteInfo);
    doc.setFont('helvetica', 'normal');
    doc.text('Rua: Américo Mignone, centro nº 88 Muniz Freire/ES', h.empresaX, y);
    y += h.espacamentoLinhas;
    doc.text('CNPJ: 11.335.231/0001-72', h.empresaX, y);
    y += h.espacamentoLinhas;
    doc.text('TEL.: (28) 99923-2788', h.empresaX, y);
}

// Fallback: desenha logo com círculos coloridos
function desenharLogoFallback(doc, h, cfgLogo) {
    doc.setFillColor(0, 150, 200);
    doc.circle(cfgLogo.x + 25, cfgLogo.y + 35, 25, 'F');
    doc.setFillColor(220, 50, 50);
    doc.circle(cfgLogo.x + 55, cfgLogo.y + 35, 25, 'F');

    doc.setTextColor(255, 255, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('i n f o r m á t i c a', cfgLogo.x + 5, cfgLogo.y + 55);
}

// Desenha dados do cliente — USA PDF_CONFIG.clienteInicioY
function desenharDadosCliente(doc, cliente) {
    const c = PDF_POSICOES.cliente;
    const inicioY = PDF_CONFIG.clienteInicioY;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(c.fonteLabel);
    doc.setTextColor(...c.corLabel);

    doc.text('Cliente', c.coluna1X, inicioY);
    doc.text('Contato', c.coluna2X, inicioY);
    doc.text('Telefone', c.coluna3X, inicioY);

    doc.text('CNPJ/CPF', c.coluna1X, inicioY + c.espacamentoGrupos);
    doc.text('Endereço', c.coluna2X, inicioY + c.espacamentoGrupos);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(c.fonteValor);

    doc.text(cliente.nome.toUpperCase(), c.coluna1X, inicioY + c.espacamentoLabelValor);
    doc.text(cliente.nome.toUpperCase(), c.coluna2X, inicioY + c.espacamentoLabelValor);
    doc.text(cliente.telefone, c.coluna3X, inicioY + c.espacamentoLabelValor);

    doc.text(cliente.cnpj, c.coluna1X, inicioY + c.espacamentoGrupos + c.espacamentoLabelValor);
    doc.text(cliente.endereco, c.coluna2X, inicioY + c.espacamentoGrupos + c.espacamentoLabelValor);
}

// Desenha tabela de produtos — USA PDF_CONFIG.tabelaInicioY
function desenharTabelaProdutos(doc, cliente, produtos, totais) {
    const t = PDF_POSICOES.tabela;
    const cols = t.colunas;
    const cfgDesc = PDF_POSICOES.descricao;
    const posX = PDF_CONFIG.tabelaPosicaoX;
    const larguraTotal = PDF_CONFIG.tabelaLarguraTotal;
    const inicioY = PDF_CONFIG.tabelaInicioY;

    // Header da tabela
    doc.setFillColor(...t.corHeaderFundo);
    doc.rect(posX, inicioY, larguraTotal, t.headerAltura, 'F');

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');

    doc.text(cols.imagem.label, cols.imagem.x + (cols.imagem.largura / 2), inicioY + 12);
    doc.text(cols.descricao.label, cols.descricao.x, inicioY + 12);
    doc.text(cols.qtde.label, cols.qtde.x, inicioY + 12);
    doc.text(cols.vUnit.label, cols.vUnit.x, inicioY + 12);
    doc.text(cols.subtotal.label, cols.subtotal.x, inicioY + 12);

    // Linhas
    let y = inicioY + t.headerAltura;
    const itens = produtos.length > 0 ? produtos : [{
        nome: cliente.descricao || 'Serviços prestados',
        quantidade: 1,
        valorTotal: totais.totalPrazo
    }];

    const dimImg = calcularDimensoesImagemPDF();

    itens.slice(0, t.maxLinhas).forEach((item, i) => {
        const descricaoTexto = i === 0 ? (cliente.descricao || item.nome) : item.nome;
        let linhasDescricao = quebrarTextoEmLinhas(descricaoTexto, cfgDesc.maxCaracteresPorLinha);
        if (cfgDesc.maxLinhas) {
            linhasDescricao = linhasDescricao.slice(0, cfgDesc.maxLinhas);
        } const alturaDescricao = linhasDescricao.length * cfgDesc.espacamentoEntreLinhas;

        const alturaLinha = Math.max(
            t.linhaAltura,
            (i === 0 ? dimImg.alturaComMargem : 0),
            alturaDescricao + 10
        );

        // Fundo zebrado
        const cor = i % 2 === 0 ? t.corLinhaPar : t.corLinhaImpar;
        doc.setFillColor(...cor);
        doc.rect(posX, y, larguraTotal, alturaLinha, 'F');

        // Imagem do produto (apenas primeira linha)
        if (i === 0 && imagemProdutoPDF) {
            try {
                const imgX = PDF_POSICOES.imagemProduto.x;
                const imgY = y + (alturaLinha - dimImg.altura) / 2;

                doc.addImage(
                    imagemProdutoPDF,
                    'JPEG',
                    imgX,
                    imgY,
                    dimImg.largura,
                    dimImg.altura
                );
            } catch (e) {
                console.warn('Erro ao adicionar imagem do produto:', e);
            }
        }

        // Descrição
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(cfgDesc.fonte);
        doc.setFont('helvetica', 'normal');

        linhasDescricao.forEach((linha, idxLinha) => {
            doc.text(linha, cols.descricao.x, y + 18 + (idxLinha * cfgDesc.espacamentoEntreLinhas));
        });

        // Quantidade
        doc.text(String(item.quantidade), cols.qtde.x + 30, y + 22);

        // Valor Unit e Subtotal
        if (i === 0) {
            const vPrazo = 'R$ ' + totais.totalPrazo.toFixed(2).replace('.', ',');
            doc.text(vPrazo, cols.vUnit.x, y + 22);
            doc.text(vPrazo, cols.subtotal.x, y + 22);
        }

        y += alturaLinha;
    });

    // Bordas da tabela
    doc.setDrawColor(...t.corBorda);
    doc.rect(posX, inicioY, larguraTotal, y - inicioY);
    doc.line(posX, inicioY + t.headerAltura, posX + larguraTotal, inicioY + t.headerAltura);

    let xLinha = posX;
    doc.line(xLinha, inicioY, xLinha, y);

    xLinha += cols.imagem.largura + (cols.descricao.x - cols.imagem.x - cols.imagem.largura);
    doc.line(cols.descricao.x - 10, inicioY, cols.descricao.x - 10, y);

    doc.line(cols.qtde.x - 10, inicioY, cols.qtde.x - 10, y);
    doc.line(cols.vUnit.x - 10, inicioY, cols.vUnit.x - 10, y);
    doc.line(cols.subtotal.x - 10, inicioY, cols.subtotal.x - 10, y);
    doc.line(posX + larguraTotal, inicioY, posX + larguraTotal, y);

    return y - inicioY;
}

// Desenha totais — USA PDF_CONFIG.totaisInicioY
function desenharTotais(doc, totais, cliente, posY) {
    const tot = PDF_POSICOES.totais;
    const inicioY = PDF_CONFIG.totaisInicioY;
    const dataY = PDF_CONFIG.dataY;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    doc.text('Total:', tot.labelX - 329, inicioY);
    doc.text('R$ ' + totais.totalPrazo.toFixed(2).replace('.', ','), tot.valorX - 500, inicioY);

    doc.text('Total à vista:', tot.labelX - 213, inicioY);
    doc.text('R$ ' + totais.totalAvista.toFixed(2).replace('.', ','), tot.valorX - 353, inicioY);

    const dt = PDF_POSICOES.data;
    doc.setTextColor(254, 254, 254);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Data:', dt.x, dataY);
    doc.setTextColor(254, 254, 254);
    doc.setFontSize(9);
    doc.text(cliente.data, dt.x + 25, dataY);
}

// Desenha seção de prazos — USA PDF_CONFIG.prazosInicioY
function desenharPrazos(doc, pageW, posY) {
    const p = PDF_POSICOES.prazos;
    const cfgLogoSec = PDF_CONFIG.logoSecundaria;
    const inicioY = PDF_CONFIG.prazosInicioY;

    // Logo secundária (watermark) como imagem real
    if (cfgLogoSec.ativo && logoSecundariaBase64) {
        try {
            // Calcula posição baseada na configuração
            const logoX = cfgLogoSec.x;
            const logoY = cfgLogoSec.y;

            doc.addImage(
                logoSecundariaBase64,
                'PNG',
                logoX,
                logoY,
                cfgLogoSec.largura,
                cfgLogoSec.altura
            );
        } catch (e) {
            console.warn('Erro ao adicionar logo secundária:', e);
        }
    }

    doc.setDrawColor(200, 200, 200);
    doc.line(15, inicioY - 15, pageW - 15, inicioY - 15);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(p.fonteTitulo);
    doc.setFont('helvetica', 'bold');
    doc.text('Prazos e condições de pagamento', p.tituloX, inicioY);

    doc.setTextColor(...p.corLabel);
    doc.setFontSize(p.fonteLabel);
    doc.text('Forma de pagamento', p.coluna1X, inicioY + 20);
    doc.text('Condições', p.coluna1X, inicioY + 65);
    doc.text('Validade da proposta', p.coluna2X, inicioY + 20);
    doc.text('Prazo de entrega', p.coluna2X, inicioY + 65);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(p.fonteValor);
    doc.text('Pix, Cartão ou dinheiro', p.coluna1X, inicioY + 40);
    doc.text('50% no pedido e 50% na entrega', p.coluna1X, inicioY + 85);
    doc.text('10 dia(s)', p.coluna2X, inicioY + 40);
    doc.text('Conferir com Atendente', p.coluna2X, inicioY + 85);

    // Watermark texto como fallback se imagem não carregar
    if (!cfgLogoSec.ativo || !logoSecundariaBase64) {
        const w = PDF_POSICOES.watermark;
        doc.setTextColor(...w.cor);
        doc.setFontSize(w.tamanhoFonte);
        doc.setFont('helvetica', 'bold');
        doc.text('as', w.x, inicioY + 80);
        doc.setFontSize(14);
        doc.text('i n f o r m á t i c a', w.x - 10, inicioY + 100);
    }
}

// Desenha footer azul
function desenharFooter(doc, pageW, pageH) {
    const f = PDF_POSICOES.footer;
    const altura = f.altura;

    doc.setFillColor(...f.corFundo);
    doc.rect(0, pageH - altura, pageW, altura, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(f.fonte);
    doc.setFont('helvetica', 'normal');
    doc.text(
        'CNPJ:11.335.231/0001-72 \u2022 Rua Américo Mignone, 88 - Centro, Muniz Freire/ES  Tel.: 28 3544-1049',
        pageW / 2,
        pageH - 20,
        { align: 'center' }
    );
}

// Carrega jsPDF dinamicamente
function carregarJsPDF() {
    return new Promise((resolve, reject) => {
        if (window.jspdf && window.jspdf.jsPDF) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Falha ao carregar jsPDF'));
        document.head.appendChild(script);
    });
}

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║         MODIFICAÇÕES NO EXPORTAR/IMPORTAR EXCEL (DESCRIÇÃO)                 ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const exportarExcelCompleto_Original = window.exportarExcelCompleto;

window.exportarExcelCompleto = async function () {
    const cliente = {
        nome: document.getElementById('cliente_nome')?.value || '',
        endereco: document.getElementById('cliente_endereco')?.value || '',
        telefone: document.getElementById('cliente_telefone')?.value || '',
        data: document.getElementById('cliente_data')?.value || '',
        servico: document.getElementById('cliente_servico')?.value || '',
        numero: document.getElementById('cliente_numero')?.value || '',
        funcionario: document.getElementById('cliente_funcionario')?.value || ''
    };

    const descricao = document.getElementById('cliente_descricao_pdf')?.value || '';

    const produtos = [];
    let subTotal = 0;
    document.querySelectorAll('.planilha tbody tr').forEach(tr => {
        const Q = parseFloat(tr.querySelector('.quantidade')?.value) || 0;
        if (Q > 0) {
            const cod = tr.cells[1]?.textContent.trim();
            const descr = tr.cells[2]?.textContent.trim();
            const unid = tr.cells[5]?.textContent.trim();
            const comp = tr.querySelector('.comprimento')?.value || 0;
            const alt = tr.querySelector('.largura')?.value || 0;
            const vlr = parseFloat(tr.querySelector('.valor-total')?.textContent.replace(',', '.')) || 0;
            produtos.push([cod, descr, unid, comp, alt, Q, vlr.toFixed(2).replace('.', ',')]);
            subTotal += vlr;
        }
    });

    const imposto = subTotal * 0.14;
    const total = subTotal + imposto;
    const aVista = total.toFixed(2).replace('.', ',');
    const entrada = (total * 1.05 * 0.25).toFixed(2).replace('.', ',');
    const aPrazo = (total * 1.05).toFixed(2).replace('.', ',');

    const linhas = [
        ['CLIENTE', cliente.nome, '', '', '', '', 'FUNCIONÁRIO', cliente.funcionario],
        ['END.:', cliente.endereco],
        ['TEL.:', cliente.telefone, '', '', '', '', '', '', '', 'DATA', cliente.data],
        ['SERVIÇO:', cliente.servico, '', '', '', '', '', '', '', 'NOTA Nº', cliente.numero],
        [],
        ['TIPO DE PAGAMENTO', '', 'PIX \u2B1C', 'DINHEIRO \u2B1C', '', 'CHEQUE \u2B1C', '', 'CARTÃO \u2B1C'],
        [],
        ['FUNCIONÁRIOS ENVOLVIDOS:'],
        []
    ];

    const headerRow = ['CODIGO', 'PRODUTO', 'MEDIDA', 'COMPRIMENTO', 'LARGURA', 'QUANTIDADE', 'VALOR'];
    linhas.push(headerRow);
    produtos.forEach(p => linhas.push(p));

    while (linhas.length < 200) linhas.push([]);

    linhas.push(['DESCRIÇÃO:', descricao]);

    linhas.push([]);
    linhas.push(['', 'IMPOSTO', '', '', '', '', '14%', `R$ ${imposto.toFixed(2).replace('.', ',')}`]);
    linhas.push([]);
    linhas.push(['', '', 'PIX', 'CHEQUE', 'DINHEIRO', 'CARTÃO', '', 'V.TOTAL']);
    linhas.push(['', 'A VISTA', '', '', '', '', '', `R$ ${aVista}`]);
    linhas.push(['', 'ENTRADA', '', '', '', '', '', `R$ ${entrada}`]);
    linhas.push(['', 'A PRAZO', '', '', '', '', '', `R$ ${aPrazo}`]);
    linhas.push(['', 'PARCELAs', '', '', '', '', '', `R$ ${entrada}`]);

    const cabecalhoSimples = [
        ['CLIENTE', cliente.nome],
        ['ENDEREÇO', cliente.endereco],
        ['TELEFONE', cliente.telefone],
        ['DATA', cliente.data],
        ['SERVIÇO', cliente.servico],
        ['FUNCIONÁRIO', cliente.funcionario],
        ['Nº', cliente.numero]
    ];

    const ws = XLSX.utils.aoa_to_sheet(linhas);
    XLSX.utils.sheet_add_aoa(ws, cabecalhoSimples, { origin: 'A300' });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const fileName = `ORÇAMENTO_${cliente.nome}_${cliente.servico}_${cliente.data}`.replace(/\s+/g, '_') + '.xlsx';

    if (window.pastaOrcamentosHandle) {
        try {
            const handle = await window.pastaOrcamentosHandle.getFileHandle(fileName, { create: true });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
        } catch (e) {
            console.warn('Falha ao salvar na pasta:', e);
        }
    }

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const orcamentoData = {
        id: cliente.numero || `ORC_${Date.now()}`,
        cliente: cliente,
        produtos: produtos,
        descricao: descricao,
        total: total,
        dataCriacao: new Date().toISOString(),
        status: 'ativo'
    };

    let orcamentos = JSON.parse(localStorage.getItem('orcamentosPasta2025') || '[]');
    const index = orcamentos.findIndex(o => o.id === orcamentoData.id);
    if (index >= 0) orcamentos[index] = orcamentoData;
    else orcamentos.unshift(orcamentoData);
    localStorage.setItem('orcamentosPasta2025', JSON.stringify(orcamentos));

    await salvarNaPastaOrcamentos(blob, fileName);
    showNotification('Excel exportado com descrição na linha 201!', 'success');
};

const importarExcelOtimizado_Original = window.importarExcelOtimizado;

window.importarExcelOtimizado = async function (file) {
    showLoading(true);

    try {
        const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array', cellFormula: false, cellStyles: false });
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1, defval: '' });

        let descricaoImportada = '';
        if (rows[200] && rows[200][0] === 'DESCRIÇÃO:') {
            descricaoImportada = String(rows[200][1] || '');
        } else {
            for (let i = 195; i < 205; i++) {
                if (rows[i] && String(rows[i][0]).toUpperCase().includes('DESCRIÇÃO')) {
                    descricaoImportada = String(rows[i][1] || '');
                    break;
                }
            }
        }

        const campoDesc = document.getElementById('cliente_descricao_pdf');
        if (campoDesc && descricaoImportada) {
            campoDesc.value = descricaoImportada;
            showNotification('Descrição importada do Excel!', 'success');
        }

        const cliente = {
            nome: String(rows[99]?.[1] || rows[0]?.[1] || '').trim(),
            endereco: String(rows[100]?.[1] || rows[1]?.[1] || '').trim(),
            telefone: String(rows[101]?.[1] || rows[2]?.[1] || '').trim(),
            data: String(rows[102]?.[1] || rows[2]?.[9] || '').trim(),
            servico: String(rows[103]?.[1] || rows[3]?.[1] || '').trim(),
            funcionario: String(rows[104]?.[1] || rows[0]?.[7] || '').trim(),
            numero: String(rows[105]?.[1] || rows[3]?.[9] || '').trim()
        };

        rows.forEach((ln) => {
            if (!ln || !Array.isArray(ln)) return;
            const texto = ln.join(' ').toUpperCase();
            if (texto.includes('CLIENTE') || texto.includes('NOME')) cliente.nome = String(ln[1] || ln[2] || cliente.nome).trim();
            if (texto.includes('ENDEREÇO') || texto.includes('END.')) cliente.endereco = String(ln[1] || ln[2] || cliente.endereco).trim();
            if (texto.includes('TELEFONE') || texto.includes('TEL.')) cliente.telefone = String(ln[1] || ln[2] || cliente.telefone).trim();
            if (texto.includes('DATA') || texto.includes('DIA')) cliente.data = String(ln[1] || ln[2] || cliente.data).trim();
            if (texto.includes('SERVIÇO') || texto.includes('DESCRIÇÃO')) cliente.servico = String(ln[1] || ln[2] || cliente.servico).trim();
            if (texto.includes('FUNCIONÁRIO') || texto.includes('RESPONSÁVEL') || texto.includes('ATENDENTE'))
                cliente.funcionario = String(ln[1] || ln[2] || cliente.funcionario).trim();
            if (texto.includes('NOTA') || texto.includes('Nº') || texto.includes('NÚMERO'))
                cliente.numero = String(ln[1] || ln[2] || cliente.numero).trim();
        });

        function aplicarCliente(dados) {
            const campos = ['nome', 'endereco', 'telefone', 'data', 'servico', 'funcionario', 'numero'];
            campos.forEach(campo => {
                const el = document.getElementById(`cliente_${campo}`);
                const elOrc = document.getElementById(`orc_cliente_${campo}`);
                if (el) el.value = dados[campo] || '';
                if (elOrc) elOrc.value = dados[campo] || '';
            });
        }

        mudarPagina(0);
        let tentativas = 0;
        const intervalo = setInterval(() => {
            if (document.getElementById('cliente_nome')) {
                aplicarCliente(cliente);
                clearInterval(intervalo);
            } else {
                tentativas++;
                if (tentativas > 50) clearInterval(intervalo);
            }
        }, 100);

        let iniProd = rows.findIndex(ln => {
            const t = String(ln[0] || '').toUpperCase();
            return t.includes('COD') || t.includes('CÓDIGO') || t.includes('PRODUTO');
        }) + 1;
        if (iniProd === 0) iniProd = 9;

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
                produtos.push({ codigo: cod, nome: nome, unid: unid, L: alt, C: comp, Q: qtd, valorTotal: parseFloat(valor) || 0 });
            }
        }

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
};

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                    INICIALIZAÇÃO AUTOMÁTICA                                  ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const initializeInterface_PDF = initializeInterface;
initializeInterface = function () {
    initializeInterface_PDF();
    setTimeout(() => {
        adicionarCamposPDFnaPaginaCliente();
    }, 600);
};