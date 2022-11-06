const BASE_API = "https://api.dictionaryapi.dev/api/v2/entries/en"
const inputField = document.querySelector("#search__input")
const searchBtn = document.querySelector("#search__btn")
const formEl = document.querySelector(".form")
const resultBox = document.querySelector(".result")
console.log(resultBox);


formEl.addEventListener("submit", e => {
    e.preventDefault()
    resultBox.innerHTML = " "
    if(inputField.value.trim() !== "") {
        fetch(`${BASE_API}/${inputField.value}`)
        .then(res => res.json())
        .then(data => renderFunc(data))
        inputField.value = ""
        resultBox.style.display = "block"
    } else {
        alert("write something")
        resultBox.style.display = "none"    
    }
});



function renderFunc(word) {
    
    if (word.length > 0) {
        word.filter(sentence => {
            console.log(sentence);
            const wordText = document.createElement("h3")
            wordText.classList.add("word__text")
            wordText.innerHTML = `${sentence.word} - ${sentence.phonetics[0]?.text ? sentence.phonetics[0]?.text ? sentence.phonetics[1]?.text : "" : "" }`
            resultBox.append(wordText);
            if(sentence.phonetics[0].audio) {
                const audioEl = document.createElement("audio")
                audioEl.setAttribute("controls", true)
                audioEl.setAttribute("src", sentence.phonetics[0].audio)
                audioEl.classList.add("audio__text")
                resultBox.append(audioEl)
            }
            
            let findDefinition = sentence.meanings[0].definitions
            console.log(sentence);
            findDefinition.forEach(definition => {

                const definitionText = document.createElement("p")
                definitionText.innerHTML = `<strong>Definition of word</strong>: ${definition.definition}`
                definitionText.classList.add("definition__text")


                resultBox.append(definitionText)
                if(definition.example) {
                    console.log(definition.example);
                    const definitionExample = document.createElement("strong")
                    definitionExample.classList.add("example__text")
                    definitionExample.innerHTML = `Example: ${definition.example}`

                    
                    resultBox.append(definitionExample)
                }
                
            })

        })
    } else {
        const errorText = document.createElement("h1")
        errorText.innerHTML = word.title
        
        resultBox.append(errorText)
    }
}




