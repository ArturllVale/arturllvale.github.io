function addWarpPoint() {
    let table = document.getElementById('warpPointsTable');
    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" class="form-control" style="width:120px" placeholder="Warp Inicial"></td>
        <td><input type="text" class="form-control" style="width:36px" placeholder="X"></td>
        <td><input type="text" class="form-control" style="width:36px" placeholder="Y"></td>
        <td><input type="text" class="form-control" style="width:90px" placeholder="Nome do Warp"></td>
        <td><input type="text" class="form-control" style="width:36px" placeholder="X"></td>
        <td><input type="text" class="form-control" style="width:36px" placeholder="Y"></td>
        <td><input type="text" class="form-control" style="width:90px" placeholder="Warp Destino"></td>
        <td><input type="text" class="form-control" style="width:36px" placeholder="X"></td>
        <td><input type="text" class="form-control" style="width:36px" placeholder="Y"></td>
    `;
}

function generateFile() {
    let table = document.getElementById('warpPointsTable');
    let rows = table.getElementsByTagName('tr');
    let warpPoints = [];

    for (let i = 1; i < rows.length; i++) {
        let cols = rows[i].getElementsByTagName('td');
        let warpPoint = `${cols[0].getElementsByTagName('input')[0].value},${cols[1].getElementsByTagName('input')[0].value},${cols[2].getElementsByTagName('input')[0].value},0\twarp\t${cols[3].getElementsByTagName('input')[0].value}\t${cols[4].getElementsByTagName('input')[0].value},${cols[5].getElementsByTagName('input')[0].value},${cols[6].getElementsByTagName('input')[0].value},${cols[7].getElementsByTagName('input')[0].value},${cols[8].getElementsByTagName('input')[0].value}`;
        warpPoints.push(warpPoint);
    }

    let textFile = warpPoints.join('\n');
    let blob = new Blob([textFile], { type: 'text/plain' });
    let downloadLink = document.createElement("a");
    downloadLink.download = "warppoint.txt";
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}