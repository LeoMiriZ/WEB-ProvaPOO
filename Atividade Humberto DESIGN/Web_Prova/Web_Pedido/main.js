async function listPratos() {
    try {
        const response = await fetch(`http://localhost:8080/menu`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        var lista = document.getElementById('lista');
        lista.innerHTML = '';

        result.forEach(menu => {
            var linha = document.createElement('tr');

            var id = document.createElement('td');
            id.innerHTML = `<a href="javascript:detailPrato('${menu.id}');">${menu.id}</a>`;
            linha.appendChild(id);

            var prato = document.createElement('td');
            prato.innerHTML = menu.prato;
            linha.appendChild(prato);

            var preco = document.createElement('td');
            preco.innerHTML = menu.preco;
            linha.appendChild(preco);

            var acoes = document.createElement('td');
            acoes.innerHTML = `<button class = "botao" onClick="deletePrato('${menu.id}');">&#10003</button>`;

            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

async function createPrato() {
    var menu = {

        "id": uuidv4(),
        "prato": document.getElementById('detail-prato').value,
        "preco": document.getElementById('detail-preco').value

    }

    try {
        const response = await fetch('http://localhost:8080/menu', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menu)
        });
        listPratos();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deletePrato(id) {
    try {
        const response = await fetch(`http://localhost:8080/menu/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        listPratos();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function detailPrato(id) {
    try {
        const result = await fetch(`http://localhost:8080/menu/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var menu = await result.json();
        document.getElementById('detail-id').value = menu.id;
        document.getElementById('detail-prato').value = menu.prato;
        document.getElementById('detail-preco').value = menu.preco;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function filterPratos() {

    lista.innerHTML = '';

    var filtro = document.getElementById('filter').value;

    try {
        const response = await fetch(`http://localhost:8080/menu?prato=${filtro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        for (let index = 0; index < result.length; index++) {

            if (result[index].prato == filtro) {


                menu = result[index];

                var linha = document.createElement('tr');

                var id = document.createElement('td');
                id.innerHTML = `<a href="javascript:detailPrato('${menu.id}');">${menu.id}</a>`; result[index].id;
                linha.appendChild(id);

                var prato = document.createElement('td');
                prato.innerHTML = result[index].prato;
                linha.appendChild(prato);

                var preco = document.createElement('td');
                preco.innerHTML = result[index].preco;
                linha.appendChild(preco);

                var acoes = document.createElement('td');
                acoes.innerHTML = `<button class = "botao" onClick="deletePrato('${menu.id}');">&#10003</button>`;

                linha.appendChild(acoes);

                lista.appendChild(linha);

            }

        }


    } catch (error) {
        console.error("Error:", error);
    }
}


async function cleanPrato() {

    document.getElementById('detail-id').value = '';
    document.getElementById('detail-prato').value = '';
    document.getElementById('detail-preco').value = '';

}

async function atualizarPrato(id) {

    var menu = {

        "id": document.getElementById('detail-id').value,
        "prato": document.getElementById('detail-prato').value,
        "preco": document.getElementById('detail-preco').value

    }

    try {
        const response = await fetch(`http://localhost:8080/menu/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menu)
        });
        listPratos();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function limpar() {

    try {
        const response = await fetch(`http://localhost:8080/menu`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        var lista = document.getElementById('lista');
        lista.innerHTML = '';

        result.forEach(menu => {
            var linha = document.createElement('tr');

            var id = document.createElement('td');
            id.innerHTML = `<a href="javascript:detailPrato('${menu.id}');">${menu.id}</a>`;
            linha.appendChild(id);

            var prato = document.createElement('td');
            prato.innerHTML = menu.prato;
            linha.appendChild(prato);

            var preco = document.createElement('td');
            preco.innerHTML = menu.preco;
            linha.appendChild(preco);

            var acoes = document.createElement('td');
            acoes.innerHTML = `<button class = "botao" onClick="deletePrato('${menu.id}');">&#10003</button>`;

            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }

    document.getElementById('detail-id').value = '';
    document.getElementById('detail-prato').value = '';
    document.getElementById('detail-preco').value = '';
    document.getElementById('filter').value = '';


}


