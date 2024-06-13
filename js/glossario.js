//Variable to store glossary terms
let glossary = [];

//Function to add a term to the glossary
function addTerm(term, definition) {
    glossary.push({ term, definition });
    renderGlossary();
}

//Function to display the glossary on the page
function renderGlossary() {
    const glossaryContainer = document.getElementById('glossary');
    glossaryContainer.innerHTML = '';
    glossary.forEach((term, index) => {
        const termElement = document.createElement('div');
        termElement.classList.add('term');
        termElement.innerHTML = `
            <strong>${term.term}:</strong> ${term.definition}
            <button class="edit-btn" onclick="openModal(${index})">Editar</button>
            <button class="delete-btn" onclick="deleteTerm(${index})">Excluir</button>
        `;
        glossaryContainer.appendChild(termElement);
    });
}

//Function to open the edit modal
function openModal(index) {
    const term = glossary[index].term;
    const definition = glossary[index].definition;
    document.getElementById('editTerm').value = term;
    document.getElementById('editDefinition').value = definition;
    //Show the modal
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
    //Update the term in the glossary by clicking Update
    document.getElementById('updateBtn').onclick = function () {
        const newTerm = document.getElementById('editTerm').value.trim();
        const newDefinition = document.getElementById('editDefinition').value.trim();
        if (newTerm !== '' && newDefinition !== '') {
            glossary[index].term = newTerm;
            glossary[index].definition = newDefinition;
            renderGlossary();
            closeModal();
        } else {
            alert('Por favor, preencha ambos os campos.');
        }
    };
}

//Function to close the modal
function closeModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

//Function to delete a term from the glossary
function deleteTerm(index) {
    if (confirm('Tem certeza que deseja excluir este termo?')) {
        glossary.splice(index, 1);
        renderGlossary();
    }
}

//Event listener to add a term when the form is submitted
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const term = document.getElementById('term').value.trim();
    const definition = document.getElementById('definition').value.trim();
    if (term !== '' && definition !== '') {
        addTerm(term, definition);
        document.getElementById('term').value = '';
        document.getElementById('definition').value = '';
    } else {
        alert('Por favor, preencha ambos os campos.');
    }
});

//Event listener to download the glossary
document.getElementById('saveBtn').addEventListener('click', function () {
    //Convert glossary to JSON
    const glossaryJSON = JSON.stringify(glossary);
    //Create a Blob object containing JSON
    const blob = new Blob([glossaryJSON], { type: 'application/json' });
    //Create a link to download the file
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'glossario.json';
    document.body.appendChild(a);
    a.click();
    //Clear link from memory
    setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 0);
});

//Event listener to load the glossary
document.getElementById('loadBtn').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            try {
                //Read file contents as JSON
                const glossaryJSON = reader.result;
                glossary = JSON.parse(glossaryJSON);
                //Display the glossary on the page
                renderGlossary();
            } catch (error) {
                console.error('Erro ao carregar o glossário:', error);
            }
        };
        reader.readAsText(file);
    };
    input.click();
});