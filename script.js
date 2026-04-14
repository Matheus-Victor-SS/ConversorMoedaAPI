const input1 = document.getElementById("moeda1")
const input2 = document.getElementById("moeda2")
const sugestoes = document.getElementById("sugestoes")

let moedasLista = []//armazena as moedas da api
let inputAtivo = null //armazena o input do usuario

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

function mostrarMoedas(lista) {
    sugestoes.innerHTML = ''//limpa a lista antes

    lista.forEach(moeda => {
        const div = document.createElement("div")//cria uma opção para cada moeda
        const bandeira = getBandeira(moeda.codigo)
        //exibe sigla, nome e bandeira
        div.innerHTML = `<strong>${bandeira} ${moeda.codigo}</strong> - ${moeda.nome}`
        
        div.style.cursor = "pointer"
        div.style.padding = "8px"
        div.style.borderBottom = "1px solid #ddd"
        
        //efeito hover
        div.onmouseover = () => {
            div.style.backgroundColor = "#f0f0f0"
        }
        div.onmouseout = () => {
            div.style.backgroundColor = "transparent"
        }
        
        div.onclick = () => {
            inputAtivo.value = moeda.codigo
            sugestoes.innerHTML = ''
        }
        //pega o resultado escolhido
        sugestoes.appendChild(div)
    })
}
//quando cada input estiver selecionado chama a função de mostrarMoedas
input1.addEventListener("focus", () => {
    inputAtivo = input1
    mostrarMoedas(moedasLista)
})

input2.addEventListener("focus", () => {
    inputAtivo = input2
    mostrarMoedas(moedasLista)
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