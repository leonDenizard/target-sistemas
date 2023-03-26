async function loadData(){
    try{
        //tratando o json
        const response = await fetch('dados.json')
        const data = await response.json()

        //definindo o valor de faturamento onde não teve faturamento ou foi fim de semana
        const valorFaturamento = data.filter(dados => dados.valor !== 0)

        //Guardando o menorValor de faturamento e o maior
        const menorValor = Math.min(...valorFaturamento.map(dados => dados.valor))

        
        const maiorValor = Math.max(...valorFaturamento.map(dados => dados.valor))

        //realizando soma total do faturamento
        const somaMensal = valorFaturamento.reduce((acumalador, valorAtual) =>{
            return acumalador + valorAtual.valor
        }, 0)

        //guardando quantos dias teve faturamento
        const numeroDiasFaturamento = valorFaturamento.length

        //realizando media mensal
        const mediaMensal = somaMensal/numeroDiasFaturamento

        //Verificando quais dias foram acima da média
        const diasAcimaDaMedia = valorFaturamento.filter(dados => dados.valor > mediaMensal)
        //Guardando o numero de dias que foram acima da média
        const numeroDiasAcimaDaMedia = diasAcimaDaMedia.length

        // console.log(`Número de dias no mês em que o valor de faturamento diário foi superior à média mensal: ${numeroDiasAcimaDaMedia}`)
        // console.log(`Menor valor de faturamento ocorrido: ${menorValor}`)
        // console.log(`Maior valor de faturamento ocorrido: ${maiorValor}`)

        for(dados of valorFaturamento){
            if(dados.valor === menorValor){
                console.log(`Menor valor de faturamento ocorreu no dia ${dados.dia} valor = ${menorValor.toFixed(2)}`)
            }
            if(dados.valor === maiorValor){
                console.log(`Maior valor de faturamento ocorreu no dia ${dados.dia} valor = ${maiorValor.toFixed(2)}`)
            }

        }
        console.log(`Número de dias no mês em que o valor de faturamento diário foi superior à média mensal: ${numeroDiasAcimaDaMedia}`)

        for(dados of diasAcimaDaMedia){
            console.log(`Dia em que o faturamento diário foi maior que ${mediaMensal.toFixed(2)}: ${dados.dia} valor = ${dados.valor.toFixed(2)}`)
        }

        
        // console.log(`Media mensal: ${mediaMensal.toFixed(2)}`)

    }catch(error){
        console.log(error)
    }
}



loadData()