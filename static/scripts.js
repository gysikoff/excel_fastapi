const handleButtonClick = () => {
    let inpContainer = document.querySelector('.column-container');
    inpContainer.innerHTML += "<div class='column'><span class='text-col'>Column: </span> <input type='text' class='column-inp'></div>";
}

const handleSendReq = async (data) => {

    const FD = new FormData();

    for(const [name, value] of Object.entries(data)){
        FD.append(name, value);
    }

    const res = await fetch('http://127.0.0.1:8000/upload/' , {
        method: 'POST',
        body: FD
    });

    res.json().then(data => {
        let outputText = document.querySelector('.output-text');
        outputText.value = JSON.stringify(data, null, 4);
    })
}

window.onload = () => {
    const sendReqBtn = document.querySelector('.send-req-inp');

    sendReqBtn.addEventListener('click', () => {
        let excel = document.querySelector('.excel-inp').files[0];
        let columns = document.getElementsByClassName('column-inp');

        let cols = [];
        let colsTmp = [];
    
        for(let i=0; i<columns.length; i++){
            colsTmp.push(columns[i].value);
        }
    
        colsTmp = colsTmp.join(',');
        cols.push(colsTmp);
    
        handleSendReq({excel: excel, columns: cols});
    })
}
