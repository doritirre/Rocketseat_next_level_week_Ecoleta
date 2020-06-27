
// Formulário Dados da Entidade

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( response => response.json() )
    .then( states => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )    
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateImput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateImput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ''
    //citySelect.disable = true

    fetch(url)
    .then( response => response.json() )
    .then( cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        //citySelect.disable = false
    } )    
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// Itens de Coleta
// Pegar todos os Li's

const itemsCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsCollect) {
    item.addEventListener('click', handledSelectItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handledSelectItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = event.target.dataset.id    

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadSelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    } )

    // Se já estiver selecionado, tirar da seleção
    
    if( alreadSelected >= 0 ) {
        const filteredItems = selectedItems.findIndex( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado, adicionar a seleção
        // Adicionar a seleção
        selectedItems.push(itemId)
    }    

    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}
