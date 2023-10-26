//<!-- Script do Menu -->

$(function () {
  $("#navbar").load("../navbar.html");
});

//<!-- Script do header -->

$(function () {
  $("#header").load("../header.html");
});

//<!-- Script do footer -->

$(function () {
  $("#footer").load("../footer.html");
});

//<!-- Script do Gerador -->

function gerarEsquema() {
  var numLinhas = parseInt(document.getElementById("numLinhas").value);
  var numMaximo = parseInt(document.getElementById("numMaximo").value);
  var divisao = Math.floor(numMaximo / numLinhas);
  var resto = numMaximo % numLinhas;
  var valorAtual = 0;
  var texto = "Header:\n  Type: STATPOINT_DB\n  Version: 2\n\nBody:\n";

  for (var i = 0; i < numLinhas; i++) {
    var linha = divisao + (resto > 0 ? 1 : 0);
    valorAtual += linha;
    texto += `  - Level: ${i + 1}\n    Points: ${valorAtual}\n`;
    resto--;
  }

  var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "statpoint.yml");
}

function saveAs(blob, filename) {
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}
//<!-- Script do CashShop -->

function addBlock() {
  var container = document.getElementById("cashshop");
  var block = document.createElement("div");
  block.className = "block";
  block.innerHTML = '<select class="tab form-select menu-cash"><option value="New">New</option><option value="Hot">Hot</option><option value="Limited">Limited</option><option value="Rental">Rental</option><option value="Permanent">Permanent</option><option value="Scrolls">Scrolls</option><option value="Consumables">Consumables</option><option value="Other">Other</option></select><input type="text" placeholder="Item" class="item form-control"><input type="text" placeholder="Price" class="price form-control">';
  container.appendChild(block);
}

function generateTxt() {
  var blocks = document.getElementsByClassName("block");
  var data = {};

  for (var i = 0; i < blocks.length; i++) {
    var tab = blocks[i].getElementsByClassName("tab")[0].value;
    var item = blocks[i].getElementsByClassName("item")[0].value;
    var price = blocks[i].getElementsByClassName("price")[0].value;

    if (!data[tab]) {
      data[tab] = [];
    }

    data[tab].push({
      item: item,
      price: price
    });
  }

  var txt = 'Body:\n';

  // Sort tabs
  var tabs = Object.keys(data).sort();

  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    txt += '  - Tab: ' + tab + '\n    Items:\n';

    for (var j = 0; j < data[tab].length; j++) {
      txt += '     - Item: ' + data[tab][j].item + '\n       Price: ' + data[tab][j].price + '\n';
    }
  }

  var blob = new Blob([txt], { type: 'text/plain' });
  var url = URL.createObjectURL(blob);

  var a = document.createElement('a');
  a.href = url;
  a.download = 'informacoes.txt';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

// Função para criar backgrounds

document.getElementById('imageInput').addEventListener('change', handleImageSelect, false);

let selectedImage = null;

function handleImageSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const img = new Image();
        img.src = reader.result;
        img.onload = function() {
            selectedImage = img;
        };
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

function processImage() {
    if (!selectedImage) {
        alert('Por favor, selecione uma imagem.');
        return;
    }

    const loginImageNumber = ''; // Número da imagem de login (deixe em branco para o padrão)
    const tileSize = 256;
    const tiles = [];

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            const canvas = document.createElement('canvas');
            canvas.width = tileSize;
            canvas.height = tileSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(selectedImage, col * tileSize, row * tileSize, tileSize, tileSize);
            tiles.push(canvas.toDataURL('image/jpeg'));
        }
    }

    // Agora você tem as imagens em base64 na array 'tiles'.
    // Você pode enviá-las para o servidor ou fazer qualquer outra operação necessária.
    console.log(tiles);
}
