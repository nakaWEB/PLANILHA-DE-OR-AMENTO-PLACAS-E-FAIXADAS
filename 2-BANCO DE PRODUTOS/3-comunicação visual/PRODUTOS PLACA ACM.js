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
    "CLIENTE", "ESTRUTURA METALICA", "LONAS E ADESIVOS",
    "ACM FUNDO", "LETRAS", "ILUMINAÇÃO",
    "PINTURA", "MÃO DE OBRA", "TOTAL GERAL", "ORÇAMENTO"
];

let bibliotecaOrcamentos = JSON.parse(localStorage.getItem('bibliotecaOrcamentos')) || [];
let currentProductId = 1000;
let isDarkTheme = localStorage.getItem('darkTheme') === 'true';

//catalogoProdutos vista
// USE { codigo: "", idX3D: "", nome: "", preco: , formula: "", unidade: "" },
//PARA ADICIONAR PRODUTOS. OBS. TODOS DEVEM TER UMA VIRGULA NO FINAL MENOS O ULTIMO DE CADA SEÇÃO
let catalogoProdutos = {
    "ESTRUTURA METALICA": {
        "FERRAGEM": [
            { codigo: "5992", idX3D: "2600878", nome: "ELETRODO 2,5 5KG 266 UNID", preco: 1.3, formula: "Q * $", unidade: "UNID" },
            { codigo: "19772", idX3D: "26013907", nome: "SOLDA BARRA", preco: 18, formula: "Q * $", unidade: "UNID" },

            { codigo: "32435", idX3D: "26013871", nome: "ESTRUTURA METÁLICA 100X40", preco: 150, formula: "C * Q * $", unidade: "M" },
            { codigo: "25652", idX3D: "2601023", nome: "ESTRUTURA METÁLICA 15X15", preco: 15, formula: "(A + C) * 2 * $ * Q", unidade: "PRE" },
            { codigo: "40524", idX3D: "426", nome: "ESTRUTURA METÁLICA 20X20", preco: 15, formula: "(A + C) * 2 * $ * Q", unidade: "PRE" },
            { codigo: "28618", idX3D: "2601209", nome: "ESTRUTURA METÁLICA 20X40", preco: 15, formula: "(A + C) * 2 * $ * Q", unidade: "PRE" },
            { codigo: "46684", idX3D: "26013865", nome: "ESTRUTURA METÁLICA 25X25", preco: 15, formula: "(A + C) * 2 * $ * Q", unidade: "PRE" },
            { codigo: "1279", idX3D: "26013866", nome: "ESTRUTURA METÁLICA 30X30", preco: 78, formula: "(A + C) * 2 * $ * Q", unidade: "PRE" },
            { codigo: "42209", idX3D: "26013867", nome: "ESTRUTURA METÁLICA 30X50 GALV", preco: 15, formula: "(A + C) * 2 * $ * Q", unidade: "M" },
            { codigo: "20839", idX3D: "765", nome: "ESTRUTURA METÁLICA 40X40", preco: 48, formula: "(A + C) * 2 * $ * Q", unidade: "PRE" },
            { codigo: "83516", idX3D: "2601158", nome: "ESTRUTURA METÁLICA 50X50", preco: 48, formula: "(A + C) * 2 * $ * Q", unidade: "PRE" },

            { codigo: "50795", idX3D: "26013872", nome: "ESTRUTURA METÁLICA CANALETA 100X40", preco: 132, formula: "C * Q * $", unidade: "M" },

            { codigo: "87182", idX3D: "26013868", nome: "ESTRUTURA METÁLICA REDONDA 15X15", preco: 30, formula: "C * Q * $", unidade: "M" },
            { codigo: "26891", idX3D: "26013869", nome: "ESTRUTURA METÁLICA REDONDA 20X20", preco: 35, formula: "C * Q * $", unidade: "M" },
            { codigo: "61927", idX3D: "26013870", nome: "ESTRUTURA METÁLICA REDONDA 40X40", preco: 48, formula: "C * $ * Q", unidade: "M" },

            { codigo: "75911", idX3D: "26013882", nome: "PEDAÇO METÁLICA 100X40", preco: 150, formula: "C * Q * $", unidade: "M" },
            { codigo: "74354", idX3D: "26013873", nome: "PEDAÇO METÁLICA 15X15", preco: 15, formula: "C * Q * $", unidade: "M" },
            { codigo: "52372", idX3D: "26013874", nome: "PEDAÇO METÁLICA 20X20", preco: 15, formula: "C * Q * $", unidade: "M" },
            { codigo: "68733", idX3D: "26013879", nome: "PEDAÇO METÁLICA 20X40", preco: 15, formula: "C * $ * Q", unidade: "M" },
            { codigo: "24177", idX3D: "26013875", nome: "PEDAÇO METÁLICA 25X25", preco: 15, formula: "C * Q * $", unidade: "M" },
            { codigo: "22439", idX3D: "26013876", nome: "PEDAÇO METÁLICA 30X30", preco: 78, formula: "C * Q * $", unidade: "M" },
            { codigo: "13462", idX3D: "26013880", nome: "PEDAÇO METÁLICA 30X50 GALV", preco: 40, formula: "C * Q * $", unidade: "M" },
            { codigo: "1131", idX3D: "26013877", nome: "PEDAÇO METÁLICA 40X40", preco: 48, formula: "C * $ * Q", unidade: "M" },
            { codigo: "892", idX3D: "26013878", nome: "PEDAÇO METÁLICA 50X50", preco: 48, formula: "C * $ * Q", unidade: "M" },

            { codigo: "747", idX3D: "26013883", nome: "PEDAÇO METÁLICA CANALETA 100X40", preco: 132, formula: "C * Q * $", unidade: "M" },

            { codigo: "5682", idX3D: "43339", nome: "PERFIL ENRIGECIDO 75 MM", preco: 39, formula: "C * Q * $", unidade: "M" },

            { codigo: "54955", idX3D: "26013892", nome: "VERGALHÃO 3/8", preco: 12, formula: "C * Q * $", unidade: "UNID" },
            { codigo: "60251", idX3D: "43848", nome: "VERGALHÃO 5/16", preco: 9, formula: "C * Q * $", unidade: "UNID" },

            { codigo: "77466", idX3D: "2600876", nome: "SUPORTE", preco: 5, formula: "Q * $", unidade: "UNID" },
        ],

        "DISCOS": [
            { codigo: "64841", idX3D: "2601024", nome: "DISCO ABRASIVO DESBASTE 7'", preco: 22, formula: "Q * $", unidade: "UNID" },
            { codigo: "16985", idX3D: "2601000", nome: "DISCO CORTE 1,6 - 4 1/2'", preco: 6, formula: "Q * $", unidade: "UNID" },
            { codigo: "19642", idX3D: "2601096", nome: "DISCO CORTE 14'", preco: 30, formula: "Q * $", unidade: "UNID" },
            { codigo: "9964", idX3D: "2601002", nome: "DISCO CORTE 2.5 -  4 1/2'", preco: 6, formula: "Q * $", unidade: "UNID" },
            { codigo: "90961", idX3D: "2601004", nome: "DISCO DE CORTE 7'", preco: 6, formula: "Q * $", unidade: "UNID" },
            { codigo: "13618", idX3D: "2600967", nome: "DISCO DESBASTE LIXADEIRA 4 1/2'", preco: 10.6, formula: "Q * $", unidade: "UNID" },
            { codigo: "31854", idX3D: "2601003", nome: "DISCO FLAP 4 1/2", preco: 6, formula: "Q * $", unidade: "UNID" },
        ],

        "REBITES E AUTOBROCANTES": [
            { codigo: "71906", idX3D: "2600825", nome: "PARAFUSO AUTOBROCANTE 4X25(CABEÇA FLAGELADA)", preco: 0.3, formula: "Q * $", unidade: "UNID" },
            { codigo: "57532", idX3D: "2601169", nome: "PARAFUSO AUTOBROCANTE 4X8 (CABEÇA FLAGELADA)", preco: 0.2, formula: "Q * $", unidade: "UNID" },
            { codigo: "51293", idX3D: "2601148", nome: "REBITADOR PRO - STANLEY", preco: 92.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "96486", idX3D: "2600879", nome: "REBITE 4X10", preco: 0.3, formula: "Q * $", unidade: "UNID" },
            { codigo: "69329", idX3D: "2601028", nome: "REBITE 4X8", preco: 0.15, formula: "Q * $", unidade: "UNID" },

        ],

        "PORCAS E BARRAS ROSCADAS": [
            { codigo: "64713", idX3D: "26013888", nome: "BARRA ROSCADA 1/4 - 1M", preco: 8.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "80542", idX3D: "26013889", nome: "BARRA ROSCADA 3/16 - 1M", preco: 4, formula: "Q * $", unidade: "UNID" },
            { codigo: "73549", idX3D: "26013890", nome: "BARRA ROSCADA 5/16 - 1M", preco: 12.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "73926", idX3D: "2601087", nome: "PORCA 1/4", preco: 0.3, formula: "Q * $", unidade: "UNID" },
            { codigo: "61137", idX3D: "26013891", nome: "PORCA 3/16", preco: 0.2, formula: "Q * $", unidade: "UNID" },
            { codigo: "67047", idX3D: "201088", nome: "PORCA 5/16", preco: 0.45, formula: "Q * $", unidade: "M" },

        ],

        "SERRAS E BROCAS": [
            { codigo: "69827", idX3D: "43313", nome: "BROCA 2,50mm", preco: 6.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "46033", idX3D: "43286", nome: "BROCA 3 PONTAS 3mm", preco: 13, formula: "Q * $", unidade: "UNID" },
            { codigo: "13515", idX3D: "43286", nome: "BROCA 3mm", preco: 13, formula: "Q * $", unidade: "UNID" },
            { codigo: "8139", idX3D: "2601151", nome: "BROCA 4,5mm", preco: 8.6, formula: "Q * $", unidade: "UNID" },
            { codigo: "2711", idX3D: "2601168", nome: "BROCA 6X110mm ENCAIXE RÁPIDO", preco: 25, formula: "Q * $", unidade: "UNID" },
            { codigo: "93507", idX3D: "2600940", nome: "BROCA 8mm ENCAIXE RÁPIDO", preco: 0, formula: "Q * $", unidade: "UNID" },
            { codigo: "28865", idX3D: "26013825", nome: "BROCA PARA METAL", preco: 10, formula: "Q * $", unidade: "UNID" },
            { codigo: "11045", idX3D: "2601172", nome: "LIXADEIRA DEWALT", preco: 525, formula: "Q * $", unidade: "UNID" },
            { codigo: "23953", idX3D: "2601147", nome: "SERRA COPO DIAMANTADA", preco: 199, formula: "Q * $", unidade: "UNID" },

        ],

        "FERRAMENTAS": [
            { codigo: "28136", idX3D: "43843", nome: "BITS PONTA DUPLA 50mm - 1/4'", preco: 6.4, formula: "Q * $", unidade: "UNID" },
            { codigo: "50596", idX3D: "2601196", nome: "BITS PONTA DUPLA 65mm", preco: 26, formula: "Q * $", unidade: "UNID" },
            { codigo: "80091", idX3D: "2601149", nome: "BIT MAKITA", preco: 8.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "20342", idX3D: "26013836", nome: "BIT DEWALT", preco: 8, formula: "Q * $", unidade: "UNID" },

            { codigo: "7276", idX3D: "2601151", nome: "CHAVE DE FENDA", preco: 20.7, formula: "Q * $", unidade: "UNID" },
            { codigo: "77874", idX3D: "2601152", nome: "CHAVE DE PHILLIPS", preco: 20.7, formula: "Q * $", unidade: "UNID" },
            { codigo: "34682", idX3D: "43334", nome: "CHAVE PARA MANDRIL", preco: 12, formula: "Q * $", unidade: "UNID" },

            { codigo: "34139", idX3D: "43323", nome: "DESENGRIPANTE WURTH", preco: 29, formula: "Q * $", unidade: "UNID" },
            { codigo: "89888", idX3D: "2601095", nome: "LIMPA CONTATO", preco: 31, formula: "Q * $", unidade: "UNID" },

            { codigo: "72015", idX3D: "43322", nome: "ESCOVA CIRCULAR", preco: 16, formula: "Q * $", unidade: "UNID" },
            { codigo: "77103", idX3D: "26013910", nome: "ESCOVA CIRCULAR 115MM", preco: 45, formula: "Q * $", unidade: "UNID" },
            { codigo: "45004", idX3D: "2601171", nome: "FURADEIRA IMPACTO BOSCH", preco: 469, formula: "Q * $", unidade: "UNID" },
            { codigo: "11045", idX3D: "2601172", nome: "LIXADEIRA DEWALT", preco: 525, formula: "Q * $", unidade: "UNID" },
            { codigo: "67387", idX3D: "2601265", nome: "MANDRIL", preco: 60, formula: "Q * $", unidade: "UNID" },
            { codigo: "69424", idX3D: "2601149", nome: "SOQUETE MAGNÉTICO 5/16mm SEXTAVADO", preco: 8.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "51293", idX3D: "2601148", nome: "REBITADOR PRO - STANLEY", preco: 92.5, formula: "Q * $", unidade: "UNID" },

            { codigo: "21089", idX3D: "347", nome: "LÂMINA ESTILETE", preco: 0.7, formula: "Q * $", unidade: "UNID" },

            { codigo: "27827", idX3D: "43284", nome: "LUVA VINIFLEX", preco: 1.7, formula: "Q * $", unidade: "UNID" },
            { codigo: "92929", idX3D: "2601165", nome: "ÓCULOS DE SEGURANÇA", preco: 10, formula: "Q * $", unidade: "UNID" },

        ],

        "PARAFUSOS E FIXADORES": [
            { codigo: "1.3753", idX3D: "2600707", nome: "BOTÃO DE ACABAMENTO (ESCONDE PARAFUSO)", preco: 8.50, formula: "Q * $", unidade: "UNID" },
            { codigo: "96826", idX3D: "43597", nome: "CORRENTE 4X19X16mm", preco: 19.8, formula: "C * Q * $", unidade: "M" },
            { codigo: "99111", idX3D: "2600956", nome: "PARAFUSO 1/4 X 50", preco: 0.6, formula: "Q * $", unidade: "UNID" },
            { codigo: "44598", idX3D: "2601047", nome: "PARAFUSO 1/4 X75", preco: 0.85, formula: "Q * $", unidade: "UNID" },
            { codigo: "24652", idX3D: "2601206", nome: "PARAFUSO 1/4X60", preco: 1, formula: "Q * $", unidade: "UNID" },
            { codigo: "71906", idX3D: "2600825", nome: "PARAFUSO AUTOBROCANTE 4X25(CABEÇA FLAGELADA)", preco: 0.3, formula: "Q * $", unidade: "UNID" },
            { codigo: "57532", idX3D: "2601169", nome: "PARAFUSO AUTOBROCANTE 4X8 (CABEÇA FLAGELADA)", preco: 0.2, formula: "Q * $", unidade: "UNID" },
            { codigo: "98698", idX3D: "2600956", nome: "PARAFUSO SEXTAVADO 1/4x50 SEM BUCHA 8/10", preco: 0.6, formula: "Q * $", unidade: "UNID" },
            { codigo: "11512", idX3D: "2601047", nome: "PARAFUSO SEXTAVADO 1/4x75 SEM BUCHA 8/10", preco: 0.85, formula: "Q * $", unidade: "UNID" },

            { codigo: "18365", idX3D: "843", nome: "BUCHA 6", preco: 0.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "18263", idX3D: "43503", nome: "BUCHA 10", preco: 1, formula: "Q * $", unidade: "UNID" },
            { codigo: "22038", idX3D: "827", nome: "BUCHA 8", preco: 1, formula: "Q * $", unidade: "UNID" },

            { codigo: "16602", idX3D: "2601097", nome: "PARABOLTE CHUMBADOR 1/4x65", preco: 8.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "50192", idX3D: "2601098", nome: "PARABOLTE CHUMBADOR 5/16X75", preco: 14.3, formula: "Q * $", unidade: "UNID" },

        ],

        "BARRAS E CANTONEIRAS": [
            { codigo: "85521", idX3D: "43326", nome: "BARRA ACHATADA BRANCA 3FUROS 3/8X1/8", preco: 5, formula: "Q * $", unidade: "UNID" },
            { codigo: "95264", idX3D: "2601219", nome: "BARRA CHATA 1'X1/8", preco: 15, formula: "Q * $", unidade: "M" },
            { codigo: "69704", idX3D: "26013900", nome: "CANTONEIRA (BARRA DE FERRO V) 0,5POL X 1/8", preco: 12, formula: "C * Q * $", unidade: "UNID" },
            { codigo: "93024", idX3D: "1417", nome: "CANTONEIRA DE ALUMÍNIO POLIDO 3/4 (PEDAÇO)", preco: 7.2, formula: "C * Q * $", unidade: "M" },
            { codigo: "42734", idX3D: "1417", nome: "CANTONEIRA DE ALUMÍNIO POLID (PERÍMETRO)", preco: 7.2, formula: "(A + C) * 2 * $ * Q", unidade: "M²" },

        ]
    },

    "LONAS E ADESIVOS": {
        "ADESIVOS": [
            { codigo: "1373", idX3D: "1319", nome: "MÁSCARA", preco: 26, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "53778", idX3D: "416", nome: "ADESIVO", preco: 85.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "64535", idX3D: "428", nome: "ADESIVO (FIBRA DE CARBONO)", preco: 110.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "76709", idX3D: "2601190", nome: "ADESIVO BLACKLIGHT", preco: 97.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "5585", idX3D: "", nome: "ADESIVO BRANCO COM TEXTURA", preco: 60.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "81871", idX3D: "2601354", nome: "ADESIVO CIMENTO QUEIMADO", preco: 60.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "93743", idX3D: "310", nome: "ADESIVO COLOR CORTE RETO", preco: 45.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "86203", idX3D: "356", nome: "ADESIVO COLUNA DE PORTA", preco: 200.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "8535", idX3D: "311", nome: "ADESIVO ESPELHADO", preco: 75.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "2494", idX3D: "803", nome: "ADESIVO FAIXA DE PORTA", preco: 25.00, formula: "C * Q * $", unidade: "M²" },
            { codigo: "77768", idX3D: "1263", nome: "ADESIVO GOLD METÁLICO", preco: 110.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "35492", idX3D: "915", nome: "ADESIVO JATEADO", preco: 70.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "44045", idX3D: "2601355", nome: "ADESIVO MADEIRA", preco: 60.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "59098", idX3D: "", nome: "ADESIVO PERFURADO", preco: 85.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "80707", idX3D: "43567", nome: "ADESIVO PRATA METÁLICO", preco: 110.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "42428", idX3D: "43564", nome: "ADESIVO PROMO FAST", preco: 40.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "13587", idX3D: "312", nome: "ADESIVO REFLETIVO", preco: 120.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "74617", idX3D: "", nome: "ADESIVO REVESTWALL ARTÍSTICO", preco: 120.00, formula: "C * A * Q * $", unidade: "M²" },

        ],

        "FERRAMENTAS": [
            { codigo: "35702", idX3D: "1404", nome: "ESPÁTULA", preco: 3.80, formula: "Q * $", unidade: "UNID" },
            { codigo: "7435", idX3D: "2601264", nome: "ESPÁTULA AÇO", preco: 4.90, formula: "Q * $", unidade: "UNID" },

        ],

        "LONAS": [
            { codigo: "69126", idX3D: "43176", nome: "LONA BLACKLIGHT", preco: 100, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "1037", idX3D: "819", nome: "LONA SEM IMPRESSÃO - CORTE RETO", preco: 45, formula: "C * A * Q * $", unidade: "M²" },

        ]
    },

    "ACM FUNDO": {
        "ACMs": [
            { codigo: "91765", idX3D: "1445", nome: "ACM COR BRILHO FUNDO PLACA", preco: 200.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "59635", idX3D: "2600865", nome: "ACM DARK GREY", preco: 250.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "10026", idX3D: "2601049", nome: "ACM FUNDO FACHADA", preco: 350.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "93195", idX3D: "960", nome: "ACM MADEIRA", preco: 360.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "89677", idX3D: "26013829", nome: "ACM PRETO", preco: 250.00, formula: "C * A * Q * $", unidade: "M²" },

        ],

        "COLAS E FIXADORES": [
            { codigo: "79587", idX3D: "43820", nome: "MANTA ISOLAMENTO", preco: 6.50, formula: "Q * $", unidade: "M" },
            { codigo: "37363", idX3D: "43332", nome: "MASSA PLÁSTICA", preco: 20.00, formula: "Q * $", unidade: "M²" },
            { codigo: "13151", idX3D: "2601008", nome: "SILICONE 180G", preco: 25.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "18531", idX3D: "2600880", nome: "SILICONE PRETO", preco: 25.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "22983", idX3D: "43745", nome: "PU40 SELANTE", preco: 30.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "29224", idX3D: "2600745", nome: "TEKBOND", preco: 35.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "79638", idX3D: "43627", nome: "VEDA CALHA", preco: 40.00, formula: "Q * $", unidade: "UNID" },

        ]
    },

    "LETRAS": {
        "ACM LETRAS": [
            { codigo: "91765", idX3D: "1445", nome: "ACM LATERAL LETRA CAIXA", preco: 200.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "29375", idX3D: "1422", nome: "ACM LETRAS (ROUTER)", preco: 400.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "2681", idX3D: "1421", nome: "ACM LETRAS ESPELHADO, ESCOVADO", preco: 600.00, formula: "C * A * Q * $", unidade: "M²" },

        ],

        "PVC LETRAS": [
            { codigo: "661", idX3D: "1258", nome: "PVC 6mm", preco: 170.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "14025", idX3D: "", nome: "PVC EXPANDIDO 10mm", preco: 500.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "4432", idX3D: "2601044", nome: "PVC EXPANDIDO 15mm", preco: 202.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "96359", idX3D: "26011323", nome: "PVC EXPANDIDO 20mm", preco: 235.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "49205", idX3D: "43296", nome: "PVC EXPANDIDO 25mm", preco: 270.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "1.6035", idX3D: "26013831", nome: "PVC EXPANDIDO 30mm", preco: 302.00, formula: "C * A * Q * $", unidade: "M²" },

        ],

        "ACRILICO LETRAS": [
            { codigo: "30432", idX3D: "", nome: "DOBRA ACRÍLICO", preco: 0.70, formula: "Q * $", unidade: "DOBRA" },

            { codigo: "0075", idX3D: "2600861", nome: "ACRÍLICO 2mm - CORTE LASER", preco: 400.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "68944", idX3D: "43345", nome: "ACRÍLICO 2mm ESPELHADO PRATA 2X1 (LASER)", preco: 600.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "52885", idX3D: "43333", nome: "ACRÍLICO 2mm ESPELHADO DOURADO 2X1 (LASER)", preco: 600.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "7181", idX3D: "2601285", nome: "ACRÍLICO 2mm ESPELHADO ROSE 2X1 (LASER)", preco: 600.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "13799", idX3D: "260113837", nome: "ACRÍLICO 3mm - CORTE LASER", preco: 450.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "22544", idX3D: "2601216", nome: "ACRÍLICO 4mm - CORTE LASER", preco: 500.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "64214", idX3D: "43821", nome: "ACRÍLICO 6mm - CORTE LASER", preco: 600.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "40506", idX3D: "2601229", nome: "ACRÍLICO AZUL 6mm - CORTE LASER", preco: 635.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "96889", idX3D: "26013851", nome: "ACRÍLICO 10mm - CORTE LASER", preco: 750.00, formula: "C * A * Q * $", unidade: "M²" },

            { codigo: "89988", idX3D: "2601238", nome: "PS 2mm - CORTE LASER", preco: 100.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "71814", idX3D: "2600966", nome: "PS 3mm - CORTE LASER", preco: 150.00, formula: "C * A * Q * $", unidade: "M²" },

        ],

        "AÇO GALVANIZADO LETRAS": [
            { codigo: "1122", idX3D: "43547", nome: "LETRA AÇO GALVANIZADO 2mx1m", preco: 1000, formula: "C * A * Q * $", unidade: "M²" },

        ],

        "MDF LETRA": [
            { codigo: "55365", idX3D: "43060", nome: "MDF 10MM CRU CORTE ROUTER", preco: 200.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "5114", idX3D: "", nome: "MDF 15MM CRU CORTE ROUTER", preco: 250.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "54549", idX3D: "", nome: "MDF 18MM CRU CORTE ROUTER", preco: 170.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "71624", idX3D: "43057", nome: "MDF 3MM CRU CORTE LASER", preco: 150.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "12146", idX3D: "", nome: "MDF 6MM CRU CORTE LASER", preco: 170.00, formula: "C * A * Q * $", unidade: "M²" },

        ],

        "COLAS, FITAS E ATIVADORES": [
            { codigo: "46039", idX3D: "43335", nome: "ATIVADOR DE TEKBOND", preco: 58.00, formula: "Q * $", unidade: "M²" },
            { codigo: "9637", idX3D: "897", nome: "FITA DUPLA FACE 15mm", preco: 6.00, formula: "Q * $", unidade: "M²" },
            { codigo: "21886", idX3D: "2600710", nome: "FITA DUPLA FACE 9mm", preco: 3.30, formula: "Q * $", unidade: "M²" },
            { codigo: "65384", idX3D: "26013911", nome: "FITA DUPLA FACE CINZA 6mm", preco: 2.50, formula: "Q * $", unidade: "M" },
            { codigo: "7586", idX3D: "2600970", nome: "PROMOTOR ADERENCIA - 7225", preco: 240.00, formula: "Q * $", unidade: "LT" },
            { codigo: "50599", idX3D: "2600971", nome: "GABARITO", preco: 10.00, formula: "C * A * Q * $", unidade: "M" },

        ],

        "PREGOS E PORCAS": [
            { codigo: "14452", idX3D: "43294", nome: "PREGO DE TELHA", preco: 0.80, formula: "Q * $", unidade: "M" },
            { codigo: "50348", idX3D: "827", nome: "BUCHA PARA PREGO", preco: 1.00, formula: "Q * $", unidade: "UNID" },

            { codigo: "64713", idX3D: "26013888", nome: "BARRA ROSCADA 1/4 - 1M", preco: 8.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "80542", idX3D: "26013889", nome: "BARRA ROSCADA 3/16 - 1M", preco: 4, formula: "Q * $", unidade: "UNID" },
            { codigo: "73549", idX3D: "26013890", nome: "BARRA ROSCADA 5/16 - 1M", preco: 12.5, formula: "Q * $", unidade: "UNID" },
            { codigo: "73926", idX3D: "2601087", nome: "PORCA 1/4", preco: 0.3, formula: "Q * $", unidade: "UNID" },
            { codigo: "61137", idX3D: "26013891", nome: "PORCA 3/16", preco: 0.2, formula: "Q * $", unidade: "UNID" },
            { codigo: "67047", idX3D: "201088", nome: "PORCA 5/16", preco: 0.45, formula: "Q * $", unidade: "M" },

        ]

    },

    "ILUMINAÇÃO": {
        "FIOs EM GERAL": [
            { codigo: "29929", idX3D: "", nome: "SOLDA DE ESTANHO (BRANCA)", preco: 12.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "34019", idX3D: "1284", nome: "FIO 2X0,5", preco: 2.00, formula: "Q * $", unidade: "M" },
            { codigo: "45753", idX3D: "1348", nome: "FIO BICOLOR", preco: 2.00, formula: "Q * $", unidade: "M" },
            { codigo: "29204", idX3D: "1284", nome: "FIO PARALELO 2X0,5", preco: 2.00, formula: "Q * $", unidade: "M" },
            { codigo: "63983", idX3D: "668", nome: "FIO PARALELO 2X0,75", preco: 2.00, formula: "Q * $", unidade: "M" },
            { codigo: "13791", idX3D: "2601082", nome: "FIO PARALELO PRETO", preco: 4.50, formula: "Q * $", unidade: "M" },
            { codigo: "62056", idX3D: "43331", nome: "FIXA CABO", preco: 1.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "0707", idX3D: "26101305", nome: "PASSA FIO COM ALMA DE AÇO - 15 MT", preco: 15.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "91958", idX3D: "2601306", nome: "PASSA FIO COM ALMA DE AÇO - 20 MT", preco: 30.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "23365", idX3D: "2601195", nome: "QUADRO DE DISTRIBUIÇÃO", preco: 61.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "88472", idX3D: "2600983", nome: "FITA ISOLANTE", preco: 15.00, formula: "Q * $", unidade: "UNID" },

            { codigo: "1", idX3D: "43842", nome: "PERFIL DE LED", preco: 75.00, formula: "C * Q * $", unidade: "M" },
            { codigo: "0827", idX3D: "43856", nome: "DIFUSOR PERFIL ACRÍLICO LED", preco: 45.00, formula: "C * Q * $", unidade: "M" },

        ],

        "COTOVELOS E CLAMPER": [
            { codigo: "73581", idX3D: "2600454", nome: "ARANDELA", preco: 120.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "47178", idX3D: "2601194", nome: "CLAMPER (PROTETOR CONTRA RAIOS)", preco: 63.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "97715", idX3D: "43584", nome: "COTOVELO 90 G", preco: 1.20, formula: "Q * $", unidade: "UNID" },
            { codigo: "46115", idX3D: "43585", nome: "COTOVELO INTERNO 20X10", preco: 1.20, formula: "Q * $", unidade: "UNID" },

        ],

        "LEDs, MÓDULOS E FONTES": [
            { codigo: "34145", idX3D: "834", nome: "CONECTOR BNC PINO FIXO", preco: 6.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "57453", idX3D: "638", nome: "FITA LED 50X50", preco: 18.00, formula: "C * Q * $", unidade: "M" },
            { codigo: "85845", idX3D: "43888", nome: "FITA LED NEON", preco: 24.00, formula: "C * Q * $", unidade: "M" },
            { codigo: "68734", idX3D: "43018", nome: "LED MÓDULO COM 3 LENTES", preco: 24.00, formula: "C * Q * $", unidade: "M" },
            { codigo: "26046", idX3D: "2600935", nome: "FONTE 12V 2A", preco: 67.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "14403", idX3D: "43673", nome: "FONTE 12V 5A", preco: 75.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "1457b", idx3D: "26014044", nome: "FONTE 20", preco: 180.00, formuta: "Q * $", unidade: "UNID" },

        ],

        "LAMPADA LED": [
            { codigo: "34302", idX3D: "43501", nome: "LÂMPADA LED 0,60", preco: 30.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "4959", idX3D: "43502", nome: "LÂMPADA LED 1,2", preco: 40.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "90512", idX3D: "43833", nome: "SOQUETE CERÂMICA P/LÂMPADA E27", preco: 5.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "67892", idX3D: "768", nome: "SOQUETE P/LÂMPADA TUBULAR", preco: 3.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "52024", idX3D: "2600590", nome: "SUPORTE PRA LÂMPADA", preco: 2.50, formula: "Q * $", unidade: "UNID" },

        ],

        "REFLETORES E PAINEIS DE LED": [
            { codigo: "99944", idX3D: "43437", nome: "BRAÇO REFLETOR 15X15", preco: 20.00, formula: "C * Q * $", unidade: "M" },
            { codigo: "18465", idX3D: "1423", nome: "REFLETOR LED 10W", preco: 46.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "81586", idX3D: "2601078", nome: "REFLETOR LED 20W", preco: 55.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "80651", idX3D: "2600847", nome: "REFLETOR LED 50W", preco: 125.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "92116", idX3D: "2600927", nome: "SPOT LED 6W", preco: 20.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "43422", idX3D: "2600422", nome: "PAINEL LED 12W", preco: 36.00, formula: "Q * $", unidade: "UNID" },

        ],

        "TOMADAS, INTERRUPTORES e TEMPORISADORES": [
            { codigo: "73659", idX3D: "1496", nome: "INTERRUPTOR AUTOMÁTICO 180°", preco: 35.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "31859", idX3D: "1495", nome: "INTERRUPTOR AUTOMÁTICO 360°", preco: 38.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "2494", idX3D: "43578", nome: "INTERRUPTOR P/ FIO", preco: 3.50, formula: "Q * $", unidade: "UNID" },
            { codigo: "70981", idX3D: "43785", nome: "INTERRUPTOR PARA MÓVEL", preco: 15.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "24289", idX3D: "2600697", nome: "INTERRUPTOR PAREDE", preco: 7.50, formula: "Q * $", unidade: "UNID" },

            { codigo: "4597", idX3D: "", nome: "TOMADA FÊMEA", preco: 3.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "54414", idX3D: "43510", nome: "TOMADA MACHO", preco: 5.50, formula: "Q * $", unidade: "UNID" },
            { codigo: "69926", idX3D: "4351054", nome: "TOMADA MACHO", preco: 1.55, formula: "Q * $", unidade: "UNID" },
            { codigo: "80865", idX3D: "43110", nome: "PLUG MACHO", preco: 5.00, formula: "Q * $", unidade: "UNID" },

            { codigo: "46547", idX3D: "1012", nome: "RELÉ FOTOCELULA", preco: 50.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "17041", idX3D: "1182", nome: "TIMER", preco: 115.00, formula: "Q * $", unidade: "UNID" },

        ]

    },

    "PINTURA": {
        "LIMPESA PISTOLA": [
            { codigo: "11077", idX3D: "2600965", nome: "GASOLINA LIMPEZA", preco: 8.00, formula: "Q * $", unidade: "LT" },
            { codigo: "70497", idX3D: "2600873", nome: "THINNER (MEIO LITRO)", preco: 17.00, formula: "Q * $", unidade: "LT" },

        ],

        "ACABAMENTO": [
            { codigo: "92755", idX3D: "2600874", nome: "LIXA 80, 150, 320", preco: 4.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "30091", idX3D: "43308", nome: "PANO POLIMENTO", preco: 10.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "79476", idX3D: "", nome: "ESTOPA", preco: 2.00, formula: "Q * $", unidade: "UNID" },

        ],

        "PINTURA": [
            { codigo: "55909", idX3D: "26013912", nome: "FILTRO PARA TINTA", preco: 2.70, formula: "Q * $", unidade: "UNID" },
            { codigo: "27969", idX3D: "26013864", nome: "PRIMER", preco: 50.00, formula: "Q * $", unidade: "LT" },
            { codigo: "72049", idX3D: "2600859", nome: "PRIMER (PROMOTOR DE ADERÊNCIA)- 7225", preco: 240.00, formula: "", unidade: "LT" },
            { codigo: "2015", idX3D: "2600875", nome: "TINTA AUTOMOTIVA (BÁSICA)", preco: 70.00, formula: "Q * $", unidade: "LT" },
            { codigo: "58863", idX3D: "2601085", nome: "TINTA BRANCO NEVE", preco: 100.00, formula: "Q * $", unidade: "LT" },
            { codigo: "70666", idX3D: "2601170", nome: "TINTA ESMALTE BRANCO 115-100", preco: 175.00, formula: "Q * $", unidade: "LT" },
            { codigo: "80057", idX3D: "43297", nome: "TINTA ESMALTE PRETO 115-022", preco: 175.00, formula: "Q * $", unidade: "LT" },
            { codigo: "97878", idX3D: "2601090", nome: "TINTA GALVITE", preco: 154.00, formula: "Q * $", unidade: "LT" },
            { codigo: "39199", idX3D: "2601086", nome: "TINTA PRETO FOSCO", preco: 48.00, formula: "Q * $", unidade: "LT" },
            { codigo: "32308", idX3D: "43295", nome: "TINTA SPRAY", preco: 18.00, formula: "Q * $", unidade: "LT" },
            { codigo: "14599", idX3D: "2600736", nome: "TINTA SPRAY BRANCO BRILHANTE - TEKBOND", preco: 20.00, formula: "Q * $", unidade: "LT" },
            { codigo: "6397", idX3D: "26013966", nome: "TINTA SPRAY BRANCO FOSCO - TEKBOND", preco: 30.00, formula: "Q * $", unidade: "LT" },
            { codigo: "25524", idX3D: "2600738", nome: "TINTA SPRAY DOURADO", preco: 40.00, formula: "Q * $", unidade: "LT" },
            { codigo: "43912", idX3D: "2600738", nome: "TINTA SPRAY PRATA - TEKBOND", preco: 40.00, formula: "Q * $", unidade: "LT" },
            { codigo: "58983", idX3D: "43337", nome: "TINTA SPRAY PRETO BRILHANTE - CHEMI COLOR", preco: 20.00, formula: "Q * $", unidade: "LT" },
            { codigo: "9708", idX3D: "43629", nome: "TINTA SPRAY PRETO FOSCO - CHEMI COLOR", preco: 20.00, formula: "Q * $", unidade: "LT" },
            { codigo: "80909", idX3D: "43629", nome: "TINTA SPRAY PRETO FOSCO - TEKBOND", preco: 25.00, formula: "Q * $", unidade: "LT" },
            { codigo: "84358", idX3D: "2600737", nome: "TINTA SPRAY ROSE GOLD METALLIK - 56 - COLORGIN", preco: 50.00, formula: "Q * $", unidade: "LT" },
            { codigo: "26768", idX3D: "43138", nome: "TINTA SPRAY VERMELHO", preco: 20.00, formula: "Q * $", unidade: "LT" },

        ],

        "RESINA RIGIDA, SELADOR E VERNIZ": [
            { codigo: "91205", idX3D: "623", nome: "SELADOR MADEIRA", preco: 40.00, formula: "Q * $", unidade: "LT" },
            { codigo: "6434", idX3D: "43129", nome: "RESINA RÍGIDA (ml/cUNID)", preco: 226.00, formula: "C * A * Q * $", unidade: "M²" },
            { codigo: "50027", idX3D: "43571", nome: "VERNIZ", preco: 70.00, formula: "Q * $", unidade: "LT" },

            { codigo: "87356", idX3D: "", nome: "QUANT. EM ML", preco: 1750, formula: "C[6434], * A[6434], * Q[6434], * $", unidade: "ML" },
            { codigo: "17175", idX3D: "", nome: "QUANT. EM LITROS", preco: 1.75, formula: "C[6434], * A[6434], * Q[6434], * $", unidade: "LT" },

        ],
    },

    "MÃO DE OBRA": {
        "ENTREGA": [
            { codigo: "967", idX3D: "2600885", nome: "ALMOÇO/LANCHE", preco: 40.00, formula: "Q * $", unidade: "UNID" },
            { codigo: "99133", idX3D: "2601119", nome: "ALUGUEL DE ANDAIME", preco: 3.00, formula: "Q * $", unidade: "PÇ" },
            { codigo: "35538", idX3D: "2600846", nome: "FRETE", preco: 3.00, formula: "Q * $", unidade: "H" },
            { codigo: "0351", idX3D: "", nome: "TEMPO DE PRODUÇÃO (ESTRADA)", preco: 0.83, formula: "Q[35538] / (0.6 * 60) * 2 * 15", unidade: "H" },
            { codigo: "82991", idX3D: "", nome: "IMPRESSÃO A4 COLORIDA", preco: 2.50, formula: "Q * $", unidade: "UNID" },

        ],
        "TEMPO DE DESIGNER E ATENDIMENTO": [
            { codigo: "3679", idX3D: "2600884", nome: "TEMPO ATENDIMENTO", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "28893", idX3D: "26013915", nome: "TEMPO DE DESIGNER E ARQUIVOS - LORENA", preco: 50.00, formula: "Q * $", unidade: "H" },
            { codigo: "16613", idX3D: "26013915", nome: "TEMPO DE DESIGNER E ARQUIVOS - EDUARDA", preco: 50.00, formula: "Q * $", unidade: "H" },
            { codigo: "78612", idX3D: "26013915", nome: "TEMPO DE DESIGNER E ARQUIVOS - DANI", preco: 50.00, formula: "Q * $", unidade: "H" },
            { codigo: "3898", idX3D: "26013915", nome: "TEMPO DE DESIGNER E ARQUIVOS - MAICON", preco: 50.00, formula: "Q * $", unidade: "H" },
            { codigo: "4326", idX3D: "26013915", nome: "TEMPO DE DESIGNER E ARQUIVOS - ALICE", preco: 50.00, formula: "Q * $", unidade: "H" },
            { codigo: "97773", idX3D: "26013915", nome: "TEMPO DE DESIGNER E ARQUIVOS -", preco: 50.00, formula: "Q * $", unidade: "H" },
        ],
        "TEMPO DE SERVIÇO": [
            { codigo: "9697", idX3D: "43822", nome: "TEMPO DE LASER - MATERIAL CLIENTE (VERIFICAR NO PROGRAMA DE CORTE)", preco: 1.00, formula: "C * Q * $", unidade: "H" },
            { codigo: "5127", idX3D: "43822", nome: "TEMPO DE LASER (VERIFICAR NO PROGRAMA DE CORTE)", preco: 15, formula: "(C / 60 * Q) * $", unidade: "H" },
            { codigo: "5664", idX3D: "630", nome: "TEMPO DE PINTURA", preco: 25.00, formula: "Q * $", unidade: "H" },
            { codigo: "1830", idX3D: "630", nome: "TEMPO PRODUÇÃO COMUNICAÇÃO VISUAL", preco: 25.00, formula: "Q * $", unidade: "H" },
            { codigo: "2658", idX3D: "630", nome: "TEMPO INSTALAÇÃO COMUNICAÇÃO VISUAL", preco: 25.00, formula: "Q * $", unidade: "H" },
            { codigo: "6145", idX3D: "630", nome: "TEMPO PRODUÇÃO LETRA CAIXA (ACM/GALVAN) 2h/LETRA", preco: 25, formula: "Q * $", unidade: "H" },
            { codigo: "3297", idX3D: "2600884", nome: "TEMPO PRODUÇÃO PRESTAÇÃO DE SERVIÇO", preco: 16.00, formula: "Q * $", unidade: "H" },
            { codigo: "2523", idX3D: "", nome: "VALOR PARA ARREDONDAR", preco: 1, formula: "Q * $", unidade: "UNID" },
        ],
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

// Inicializa tema
if (isDarkTheme) {
    document.body.classList.add('dark-theme');
    document.querySelector('.btn-theme i').className = 'fas fa-sun';
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
                    <td style="width: 9%; font-size: 14px;"><input type="number" class="quantidade" min="0" step="1" value="0"></td>
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

                if (prod.tipo === "composto") {

                    linhas += criarLinhaProdutoComposto(prod);

                } else {

                    linhas += criarLinhaProduto(prod);

                }

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
                    <th>NOME</th>
                    <th>CÓDIGO</th>
                    <th style="opacity: 100%; font-size: 0px;">Preço</th>
                    <th>MEDIDA</th>
                    <th>LARGURA</th>
                    <th>ALTURA</th>
                    <th>QTD</th>
                    <th style="opacity: 100%; font-size: 0px;">Desc</th>
                    <th>TOTAL</th>
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

        if (prod.tipo === "composto") {

            linhas += criarLinhaProdutoComposto(prod);

        } else {

            linhas += criarLinhaProduto(prod);

        }

    });

    return `
        <table class="planilha">
            <thead>
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
                    <td style="width: 9%; font-size: 14px;"><input type="number" class="quantidade" min="0" step="1" value="0"></td>
                    <td style="opacity: 100%; font-size: 0px;><input type="text" class="descricao" placeholder="."></td>
                    <td style="font-size: 14px;" class="valor-total">0,00</td>
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

    const mostrarRebitesEletrodos = nomesPaginas[indice] === 'ESTRUTURA METALICA';
    const mostrarTempoPP = nomesPaginas[indice] === 'MÃO DE OBRA';
    const mostrarInfoCliente = nomesPaginas[indice] === 'CLIENTE';



    const r = document.getElementById('rebites-flutuante');
    const e = document.getElementById('eletrodos-flutuante');
    const t = document.getElementById('tempo-pp-flutuante');
    const c = document.getElementById('info-cliente-flutuante');

    if (r) r.style.display = mostrarRebitesEletrodos ? 'block' : 'none';
    if (e) e.style.display = mostrarRebitesEletrodos ? 'block' : 'none';
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

    const imposto = totalOrcamento * 0.15;
    const totalComImposto = totalOrcamento + imposto;

    // Linha de imposto
    const impostoRow = document.createElement('tr');
    impostoRow.style.background = 'var(--barra-imposto)';
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
    totalRow.style.background = 'var(--total)';
    totalRow.style.fontWeight = 'bold';
    totalRow.innerHTML = `
        <td></td>
        <td colspan="3" style="text-align:right;"><i class="fas fa-calculator"></i> TOTAL:</td>
        <td>R$ ${totalComImposto.toFixed(2).replace('.', ',')}</td>
    `;
    tbody.appendChild(totalRow);
}

function calcularValores() {
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

    calcularRebites();
    calcularEletrodos();
    atualizarTotalGeral();
    atualizarOrcamento();
}

function calcularRebites() {
    const mapa = {};
    document.querySelectorAll('.pagina').forEach((pagina, idx) => {
        if (nomesPaginas[idx] !== 'ESTRUTURA METALICA') return;

        pagina.querySelectorAll('tbody tr').forEach(linha => {
            const cod = String(linha.cells[1]?.textContent.trim());
            const C = parseFloat(linha.querySelector('.comprimento')?.value) || 0;
            const A = parseFloat(linha.querySelector('.largura')?.value) || 0;
            const Q = parseFloat(linha.querySelector('.quantidade')?.value) || 0;
            if (cod) mapa[cod] = { C, A, Q };
        });
    });

    const get = (cod) => {
        const v = mapa[cod];
        return v ? (v.C + v.C + v.A + v.A) * v.Q * 6 : 0;
    };

    const total =
        get('32435') + // CA
        get('25652') + // RA
        get('40524') + // IO
        get('28618') + // DE
        get('46684') + // CON
        get('1279') + // TA
        get('42209') + // DOS
        get('20839') + // IN
        get('83516') + // FER
        get('50795') + // NO
        get('87182') + // GRAN
        get('26891') + // DE
        get('61927') + // PRA
        get('21768') + // CA
        get('29759') + // CE
        get('27842');  // TE

    document.getElementById('rebites-valor').textContent = '>.< ' + total.toFixed(2).replace('.', ',');
}

function calcularEletrodos() {
    const mapa = {};
    document.querySelectorAll('.pagina').forEach((pagina, idx) => {
        if (nomesPaginas[idx] !== 'ESTRUTURA METALICA') return;

        pagina.querySelectorAll('tbody tr').forEach(linha => {
            const cod = String(linha.cells[1]?.textContent.trim());
            const Q = parseFloat(linha.querySelector('.quantidade')?.value) || 0;
            if (cod) mapa[cod] = Q;
        });
    });

    const get = (cod, mult = 2) => (mapa[cod] || 0) * mult;

    const total =
        get('85521') +       // MEU
        get('95264') +     // DE
        get('64713') +    // US
        get('80542') +    // MEU
        get('73549') +    // SE
        get('60404') +       // NHOR
        get('32435', 4) + // MI
        get('25652', 4) +  // AJU
        get('40524', 4) +      // DA
        get('28618', 4) +  // POR
        get('46684', 4) + // FA
        get('1279', 4) + // VOR
        get('42209', 4) + // E
        get('20839', 4) +      // NA
        get('83516', 4) +  // ES
        get('50795', 4) + // CO
        get('87182', 4) + // NO
        get('26891', 4) + // TRA
        get('61927', 4) + // BA
        get('21768', 4) +    // LHO
        get('29759', 4) +  // OU
        get('27842', 4) + // FA
        get('75911', 2) + // CU
        get('74354', 2) + // DA
        get('52372', 2) + // DE
        get('68733', 2) + // ES
        get('24177', 2) + // TOU
        get('22439', 2) + // VI
        get('13462', 2) + // CI
        get('1131', 2) + // ADO
        get('892', 2) + // NO
        get('747', 2) + // ZAP
        get('59011', 2) + // INS
        get('35975', 2) + // TA
        get('11568', 2) + // ENO
        get('54955', 2) + // FACE
        get('60251', 2);  // BOOK

    document.getElementById('eletrodos-valor').textContent = '>.< ' + total.toFixed(2).replace('.', ',');
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
    const categorias = Object.keys(catalogoProdutos);
    const tabelaGeral = document.querySelector("#tabela-total-geral tbody");
    if (!tabelaGeral) return;

    tabelaGeral.innerHTML = "";
    let somaGeral = 0;


    categorias.forEach(cat => {
        const indice = nomesPaginas.indexOf(cat);
        if (indice >= 0) {
            const pagina = document.querySelectorAll('.pagina')[indice];
            const valores = pagina.querySelectorAll(".valor-total");
            let soma = 0;
            valores.forEach(v => soma += parseFloat(v.textContent.replace(',', '.')) || 0);
            somaGeral += soma;
            tabelaGeral.innerHTML += `<tr><td><i class="fas fa-folder"></i> ${cat}</td><td>R$ ${soma.toFixed(2).replace('.', ',')}</td></tr>`;
        }
    });

    const imposto = somaGeral * 0.15;
    tabelaGeral.innerHTML += `<tr style="background: var(--barra-imposto);">
            <td><strong><i class="fas fa-receipt"></i> IMPOSTO</strong></td>
            <td><strong>R$ ${imposto.toFixed(2).replace('.', ',')}</strong></td>
        </tr>`;
    const totalComImposto = somaGeral + imposto;

    document.getElementById("linha2").textContent = "R$ " + totalComImposto.toFixed(2).replace('.', ',');
    document.getElementById("linha3").textContent = "R$ " + ((totalComImposto * 0.05 + totalComImposto) / 4).toFixed(2).replace('.', ',');
    document.getElementById("linha4").textContent = "R$ " + (totalComImposto * 0.05 + totalComImposto).toFixed(2).replace('.', ',');
    document.getElementById("linha5").textContent = "R$ " + ((totalComImposto * 0.05 + totalComImposto) / 4).toFixed(2).replace('.', ',');
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

    const imposto = subTotal * 0.15;
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
    linhas.push(['', 'IMPOSTO', '', '', '', '', '15%', `R$ ${imposto.toFixed(2).replace('.', ',')}`]);
    linhas.push([]);
    linhas.push(['', '', 'PIX', 'CHEQUE', 'DINHEIRO', 'CARTÃO', '', 'V.TOTAL']);
    linhas.push(['', 'A VISTA', '', '', '', '', '', `R$ ${aVista}`]);
    linhas.push(['', 'ENTRADA', '', '', '', '', '', `R$ ${entrada}`]);
    linhas.push(['', 'A PRAZO', '', '', '', '', '', `R$ ${aPrazo}`]);
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

    const imposto = subTotal * 0.15;
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
    ws.addRow(['', '', '', 'IMPOSTO', '', '', '', '15%', `R$ ${imposto.toFixed(2).replace('.', ',')}`]);
    ws.addRow([]);
    ws.addRow(['', '', '', '', 'PIX', 'CHEQUE', 'DINHEIRO', 'CARTÃO', 'ANOTAR', 'V.TOTAL']);
    ws.addRow(['', '', 'VALOR', 'A VISTA', '', '', '', '', '', `R$ ${aVista}`]);
    ws.addRow(['', '', '1', 'ENTRADA', '', '', '', '', '', `R$ ${entrada}`]);
    ws.addRow(['', '', 'VALOR', 'A PRAZO', '', '', '', '', '', `R$ ${aPrazo}`]);
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

document.addEventListener("input", e => {

    if (
        !e.target.classList.contains(
            "quantidade"
        )
    ) return;

    const linha =
        e.target.closest("tr");

    if (
        !linha.classList.contains(
            "produto-composto"
        )
    ) return;

    const componentes =
        linha.nextElementSibling;

    componentes.style.display =
        Number(e.target.value) > 0
            ? "table-row"
            : "none";

});

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