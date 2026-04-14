function converter(){
    var valor = document.getElementById("quant").value
    var moedaum = document.getElementById("moeda1").value
    var moedadois = document.getElementById("moeda2").value
    
fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_j1a1wClyBw4a9HRLVFWtNAVZhqa0tYz6Sn07titf`)
.then(res => res.json())
.then(dados => {
    console.log(dados)
    let taxa = dados.data[moedadois]
            let res = valor * taxa

            document.getElementById("res").innerText =
                `${valor} ${moedaum} = ${res.toFixed(2)} ${moedadois}`
        })
        .catch(erro => {
            console.log("Erro:", erro)
        })
}
