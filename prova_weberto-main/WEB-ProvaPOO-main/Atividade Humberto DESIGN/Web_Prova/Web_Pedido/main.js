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
            acoes.innerHTML = `<button class = "botao" onClick="createItemPedido('${menu.id}');">&#10003</button>`;

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
                acoes.innerHTML = `<button class = "botao" onClick="createItemPedido('${menu.id}');">&#10003</button>`;

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
            acoes.innerHTML = `<button class = "botao" onClick="createItemPedido('${menu.id}');">&#10003</button>`;

            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }

    document.getElementById('filter').value = '';


}

async function listPedidos() {
    try {
        const response = await fetch(`http://localhost:8080/menu/pedido`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        var lista = document.getElementById('lista');
        lista.innerHTML = '';

        result.forEach(pedido => {
            var linha = document.createElement('tr');

            var id = document.createElement('td');
            id.innerHTML = `<a href="javascript:detailPedido('${pedido.id}');">${pedido.id}</a>`;
            linha.appendChild(id);

            var nump = document.createElement('td');
            nump.innerHTML = pedido.nump;
            linha.appendChild(nump);

            var total = document.createElement('td');
            total.innerHTML = pedido.total;
            linha.appendChild(total);

            var status = document.createElement('td');
            status.innerHTML = pedido.statusp;
            linha.appendChild(status);

            var acoes = document.createElement('td');
            acoes.innerHTML = `<button class = "botao" onClick="deletePedido('${pedido.id}');">X</button>`;

            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

var soma = 0;

async function createPedido() {
    var pedido = {

        "id": uuidv4(),
        "nump": indx - 1,
        "total": soma,
        "statusp": "AGUARDANDO"

    }

    try {
        const response = await fetch('http://localhost:8080/menu/pedido', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });
        listPedidos();
    } catch (error) {
        console.error("Error:", error);
    }

    alert("Pedido realizado com sucesso!");

    limpar();

    listPratos();
}

async function deletePedido(id) {
    try {
        const response = await fetch(`http://localhost:8080/menu/pedido/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        listPedidos();
    } catch (error) {
        console.error("Error:", error);
    }

    alert("Pedido cancelado com sucesso!");

}

async function detailPedido(id) {
    try {
        const result = await fetch(`http://localhost:8080/menu/${pedido.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var pedido = await result.json();
        document.getElementById('detail-id').value = pedido.id;
        document.getElementById('detail-nmPedido').value = pedido.nmPedido;
        document.getElementById('detail-totalPedido').value = pedido.totalPedido;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function filterPedidos() {

    lista.innerHTML = '';

    var filtro = document.getElementById('filter').value;

    try {
        const response = await fetch(`http://localhost:8080/menu/pedido?nump=${filtro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        for (let index = 0; index < result.length; index++) {

            if (result[index].nump == filtro) {


                pedido = result[index];

                var linha = document.createElement('tr');

                var id = document.createElement('td');
                id.innerHTML = `<a href="javascript:detailPedido('${pedido.id}');">${pedido.id}</a>`; result[index].id;
                linha.appendChild(id);

                var nump = document.createElement('td');
                nump.innerHTML = result[index].nump;
                linha.appendChild(nump);

                var total = document.createElement('td');
                total.innerHTML = result[index].total;
                linha.appendChild(total);

                var status = document.createElement('td');
                status.innerHTML = result[index].statusp;
                linha.appendChild(status);

                var acoes = document.createElement('td');
                acoes.innerHTML = `<button class = "botao" onClick="deletePedido('${pedido.id}');">X</button>`;

                linha.appendChild(acoes);

                lista.appendChild(linha);

            }

        }


    } catch (error) {
        console.error("Error:", error);
    }
}


async function cleanPedido() {

    document.getElementById('detail-id').value = '';
    document.getElementById('detail-nmPedido').value = '';
    document.getElementById('detail-totalPedido').value = '';

}

async function atualizarPedido(id) {

    var menu = {

        "id": document.getElementById('detail-id').value,
        "nmPedido": document.getElementById('detail-nmPedido').value,
        "totalPedido": document.getElementById('detail-totalPedido').value

    }

    try {
        const response = await fetch(`http://localhost:8080/menu/${pedido.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });
        listPedidos();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function limparPedido() {

    try {
        const response = await fetch(`http://localhost:8080/menu/pedido`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        var lista = document.getElementById('lista');
        lista.innerHTML = '';

        result.forEach(pedido => {
            var linha = document.createElement('tr');

            var id = document.createElement('td');
            id.innerHTML = `<a href="javascript:detailPedido('${pedido.id}');">${pedido.id}</a>`;
            linha.appendChild(id);

            var nump = document.createElement('td');
            nump.innerHTML = pedido.nump;
            linha.appendChild(nump);

            var total = document.createElement('td');
            total.innerHTML = pedido.total;
            linha.appendChild(total);

            var status = document.createElement('td');
            status.innerHTML = pedido.statusp;
            linha.appendChild(status);

            var acoes = document.createElement('td');
            acoes.innerHTML = `<button class = "botao" onClick="deletePedido('${pedido.id}');">X</button>`;

            linha.appendChild(acoes);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }

    document.getElementById('filter').value = '';


}



async function listItemPedido() {
    try {
        const response = await fetch(`http://localhost:8080/menu/item`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();

        var lista = document.getElementById('lista');
        lista.innerHTML = '';

        result.forEach(item => {
            var linha = document.createElement('tr');

            var id = document.createElement('td');
            id.innerHTML = `<a href="javascript:detailItemPedido('${item.id}');">${item.id}</a>`;
            linha.appendChild(id);

            var numpe = document.createElement('td');
            numpe.innerHTML = item.numpe;
            linha.appendChild(numpe);

            var prato = document.createElement('td');
            prato.innerHTML = item.prato;
            linha.appendChild(prato);

            var preco = document.createElement('td');
            preco.innerHTML = item.preco;
            linha.appendChild(preco);


            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function createItemPedido(id) {

    try {
        const result = await fetch(`http://localhost:8080/menu/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var menu = await result.json();

        var i = menu.id;
        var j = menu.prato;
        var k = menu.preco;


    } catch (error) {
        console.error("Error:", error);
    }

    var item = {

        "id": i,
        "numpe": indx,
        "prato": j,
        "preco": k

    }

    try {
        const response = await fetch('http://localhost:8080/menu/item', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        listItemPedido();
    } catch (error) {
        console.error("Error:", error);
    }

    soma = soma + k;

    limpar();

    listPratos();


}

async function deleteItemPedido(id) {
    try {
        const response = await fetch(`http://localhost:8080/menu/${item.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        listItemPedido();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function detailItemPedido(id) {
    try {
        const result = await fetch(`http://localhost:8080/menu/item/${item.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        var item = await result.json();
        document.getElementById('detail-id').value = item.id;
        document.getElementById('detail-prato').value = item.prato;
        document.getElementById('detail-preco').value = item.preco;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function filterItemPedido() {

    lista.innerHTML = '';

    var filtro = document.getElementById('filter').value;

    try {
        const response = await fetch(`http://localhost:8080/menu/item?prato=${filtro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        for (let index = 0; index < result.length; index++) {

            if (result[index].prato == filtro) {


                item = result[index];

                var linha = document.createElement('tr');

                var id = document.createElement('td');
                id.innerHTML = `<a href="javascript:detailPrato('${item.id}');">${item.id}</a>`; result[index].id;
                linha.appendChild(id);

                var numpe = document.createElement('td');
                numpe.innerHTML = result[index].numpe;
                linha.appendChild(numpe);

                var prato = document.createElement('td');
                prato.innerHTML = result[index].prato;
                linha.appendChild(prato);

                var preco = document.createElement('td');
                preco.innerHTML = result[index].preco;
                linha.appendChild(preco);

                lista.appendChild(linha);

            }

        }


    } catch (error) {
        console.error("Error:", error);
    }
}


async function cleanItemPedido() {

    document.getElementById('detail-id').value = '';
    document.getElementById('detail-prato').value = '';
    document.getElementById('detail-preco').value = '';

}

async function atualizarItemPedido(id) {

    var item = {

        "id": document.getElementById('detail-id').value,
        "prato": document.getElementById('detail-prato').value,
        "preco": document.getElementById('detail-preco').value

    }

    try {
        const response = await fetch(`http://localhost:8080/menu/${item.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        listItemPedido();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function limparItemPedido() {

    try {
        const response = await fetch(`http://localhost:8080/menu/item`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        var lista = document.getElementById('lista');
        lista.innerHTML = '';

        result.forEach(item => {
            var linha = document.createElement('tr');

            var id = document.createElement('td');
            id.innerHTML = `<a href="javascript:detailPrato('${item.id}');">${item.id}</a>`;
            linha.appendChild(id);

            var numpe = document.createElement('td');
            numpe.innerHTML = item.numpe;
            linha.appendChild(numpe);

            var prato = document.createElement('td');
            prato.innerHTML = item.prato;
            linha.appendChild(prato);

            var preco = document.createElement('td');
            preco.innerHTML = item.preco;
            linha.appendChild(preco);

            lista.appendChild(linha);
        });
    } catch (error) {
        console.error("Error:", error);
    }


    document.getElementById('filter').value = '';


}

var indx = 0;

async function somarindx() {

    indx = indx + 1;

    createPedido();

    soma = 0;

}

async function listaritensdeumpedido() {
    

    var lista = document.getElementById('listas');

    var filtro = document.getElementById('filter').value;

    try {
        const response = await fetch(`http://localhost:8080/menu/item?numpe=${filtro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        for (let index = 0; index < result.length; index++) {

            if (result[index].numpe == filtro) {

                item = result[index];

                var linha = document.createElement('tr');

                var id = document.createElement('td');
                id.innerHTML = result[index].id;
                linha.appendChild(id);

                var numpe = document.createElement('td');
                numpe.innerHTML = result[index].numpe;
                linha.appendChild(numpe);

                var prato = document.createElement('td');
                prato.innerHTML = result[index].prato;
                linha.appendChild(prato);

                var preco = document.createElement('td');
                preco.innerHTML = result[index].preco;
                linha.appendChild(preco);

                lista.appendChild(linha);


            }



        }


    } catch (error) {
        console.error("Error:", error);
    }



}


