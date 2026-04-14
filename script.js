const input1 = document.getElementById("moeda1")
const input2 = document.getElementById("moeda2")
const sugestoes = document.getElementById("sugestoes")

let moedasLista = []//armazena as moedas da api
let inputAtivo = null //armazena o input do usuario

//função async para usar await e esperar dados
async function pegarMoedas() {
    const resposta = await fetch("https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_j1a1wClyBw4a9HRLVFWtNAVZhqa0tYz6Sn07titf")
    const dados = await resposta.json() //converte os dados em JSON

    let moedas = dados.data

    for (let codigo in moedas) { //percorre cada moeda
        moedasLista.push({//guarda nesse formato de json
            codigo: codigo,
            nome: moedas[codigo].name
        })
    }
}

function mostrarMoedas(lista) {
    sugestoes.innerHTML = ''//limpa antes de mostrar

    lista.forEach(moeda => {//para cada moeda cria um item
        const div = document.createElement("div")
        //exibe
        div.innerText = `${moeda.codigo} - ${moeda.nome}`
        //ao clicar seleciona e some a lista
        div.onclick = () => {
            inputAtivo.value = moeda.codigo
            sugestoes.innerHTML = ''
        }
        //coloca item na tela
        sugestoes.appendChild(div)
    })
}

//quando clica em algum input ele chama a função mostrar moedas
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
    //pega as moedas selecionadas
    const moeda1 = input1.value
    const moeda2 = input2.value

    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_j1a1wClyBw4a9HRLVFWtNAVZhqa0tYz6Sn07titf&base_currency=${moeda1}`)
        .then(res => res.json())
        .then(dados => {
            //calculo de conversão de taxa
            let taxa = dados.data[moeda2]
            let resultado = valor * taxa

            document.getElementById("res").innerText =
            //forma com que o resultado aparece
                `${valor} ${moeda1} = ${resultado.toFixed(2)} ${moeda2}`
        })
        .catch(erro => console.log(erro))
}

//assim que iniciar ja chama a API de pegar moedas 
window.onload = pegarMoedas