const input1 = document.getElementById("moeda1")
const input2 = document.getElementById("moeda2")
const sugestoes1 = document.getElementById("sugestoes1")
const sugestoes2 = document.getElementById("sugestoes2")

let moedasLista = []
let inputAtivo = null
let sugestoesAtivas = null


function Atualizar() {
    var data = document.getElementById('data')
    var date = new Date()
    //padStart preenche a string com 0 ate antigir 2 caracteres
    var dia = String(date.getDate()).padStart(2, '0')
    //auemnta 1 pois começa com Janeiro=0
    var mes = String(date.getMonth() + 1).padStart(2, '0')//adiciona 0 a esquerda
    var ano = date.getFullYear()
    
    data.innerHTML = `${dia}/${mes}/${ano}`
}

setInterval(Atualizar, 1000)

//bandeiras com código do país
const mapaMoedaPais = {
    USD: "us",
    BRL: "br",
    EUR: "eu",
    GBP: "gb",
    JPY: "jp",
    CAD: "ca",
    AUD: "au",
    CNY: "cn",
    INR: "in",
    KRW: "kr",
    RUB: "ru",
    MXN: "mx",
    ZAR: "za",
    CHF: "ch",
    SEK: "se",
    NOK: "no",
    DKK: "dk",
    PLN: "pl",
    TRY: "tr",
    HKD: "hk",
    SGD: "sg",
    THB: "th",
    PHP: "ph",
    MYR: "my",
    IDR: "id",
    ILS: "il",
    HUF: "hu",
    CZK: "cz",
    RON: "ro",
    BGN: "bg",
    HRK: "hr",
    ISK: "is"
}

function getBandeira(codigoMoeda) {
    const pais = mapaMoedaPais[codigoMoeda]
    if (!pais) return "🏦"
    //retorna uma imagem da bandeira
    return `<img src="https://flagcdn.com/20x15/${pais}.png" style="width: 20px; height: 15px; margin-left: 5px;" alt="${pais}">`
}

//função async para usar await e esperar dados
async function pegarMoedas() {
    const resposta = await fetch("https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_j1a1wClyBw4a9HRLVFWtNAVZhqa0tYz6Sn07titf")
    //converte resposta em JSON
    const dados = await resposta.json()

    let moedas = dados.data

    for (let codigo in moedas) {//percorre cada moeda
        moedasLista.push({//forma com que os dados vao ser salvos
            codigo: codigo,
            nome: moedas[codigo].name
        })
    }
}

// Função para mostrar sugestões no container correto
function mostrarMoedas(lista, container) {
    container.innerHTML = ''

    lista.forEach(moeda => {
        const div = document.createElement("div")
        const bandeira = getBandeira(moeda.codigo)
        div.innerHTML = `${moeda.codigo} ${bandeira} - ${moeda.nome}`
        
        div.onclick = () => {
            inputAtivo.value = moeda.codigo
            container.innerHTML = ''
        }
        
        container.appendChild(div)
    })
}

// Eventos dos inputs
input1.addEventListener("focus", () => {
    inputAtivo = input1
    sugestoesAtivas = sugestoes1
    mostrarMoedas(moedasLista, sugestoes1)
})

input2.addEventListener("focus", () => {
    inputAtivo = input2
    sugestoesAtivas = sugestoes2
    mostrarMoedas(moedasLista, sugestoes2)
})

// Fechar sugestões ao clicar fora
document.addEventListener("click", (e) => {
    if (!input1.contains(e.target) && !sugestoes1.contains(e.target)) {
        sugestoes1.innerHTML = ''
    }
    if (!input2.contains(e.target) && !sugestoes2.contains(e.target)) {
        sugestoes2.innerHTML = ''
    }
})
function converter() {
    const valor = document.getElementById("quant").value
    const moeda1 = input1.value
    const moeda2 = input2.value

    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_j1a1wClyBw4a9HRLVFWtNAVZhqa0tYz6Sn07titf&base_currency=${moeda1}`)
        .then(res => res.json())
        .then(dados => {
            //calculo de conversão de taxa
            let taxa = dados.data[moeda2]
            let resultado = valor * taxa
            //aparecendo resultado
            document.getElementById("res").innerHTML = `
                <strong>${valor} ${moeda1}</strong> ${getBandeira(moeda1)} = 
                <strong>${resultado.toFixed(2)} ${moeda2}</strong> ${getBandeira(moeda2)}
            `
        })
        .catch(erro => console.log(erro))
}
//antes de tudo ja busca a API moedas
window.onload = pegarMoedas