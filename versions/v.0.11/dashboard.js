

let cols = ["Search","LAST","CHG%","CHG","HIGH","LOW","VOL","TECHNICAL RATING","EXCHANGE"];
let tableSettings = {
    "Search": "random all caps letters around 6 up to 20 with underscores.",
    "LAST": {"min": -1, "max": 12, "decimals": 2, "type": "large", "scale": 9},
    "CHG%": {"min": -13000, "max": 2000, "decimals": 2, "type": "percentage"},
    "CHG": {"min": -200, "max": 1300, "decimals": 2, "type": "large", "scale": 3},
    "HIGH": {"min": 0, "max": 13, "decimals": 2, "type": "large", "scale": 9},
    "LOW": {"min": -1, "max": 12, "decimals": 2, "type": "large", "scale": 9},
    "VOL": {"min": 0, "max": 688.879, "decimals": 3, "type": "T"},
    "TECHNICAL RATING": ["Strong Buy", "Buy", "Neutral", "Sell", "Strong Sell"],
    "EXCHANGE": ["BINANCE", "POLONIEX", "THEROCKTRADING", "TIMEX", "TRADESTATION"]
};
var data = [];
function MakeDataRow(){
    let row = {};
    Object.keys(tableSettings).forEach(col=>{
        let randn = Math.floor(Math.random() * 5);
        let style = "dark";
        switch(col){
            case "Search":
                let len = Math.floor(Math.random() * 6) + 6;
                let name = '';
                for (let i = 0; i < len; i++) {
                    name += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                }
                if(getIDs().includes(name)){
                    name += ("_copy");
                }
                row['id'] = name;
                row[col] = name;
                break;
            case "TECHNICAL RATING":
                if(randn < 2){
                    style = "primary";
                } else if(randn > 2) {
                    style = "danger";
                }
                row[`${col}_class`] = `text-${style}`;
                row[col] = tableSettings[col][randn];
                break;
            case "EXCHANGE":
                row[col] = tableSettings[col][randn];
                break;
            case "LAST":
            case "HIGH":
            case "LOW":
                row[col] = 1 * ((Math.pow(10,Math.floor(Math.random() * tableSettings[col]["scale"]))*Math.random()*tableSettings[col]["max"]) + tableSettings[col]["min"]).toFixed(tableSettings[col]["decimals"]);
                break;
            case "VOL":
                row[`${col}_class`] = `n-T`;
                row[col] = 1 * ((Math.random() * tableSettings[col]["max"])).toFixed(tableSettings[col]["decimals"]);
                break;
            case "CHG":
                let numb_range = tableSettings[col]["max"] - tableSettings[col]["min"];
                let scale_power = Math.pow(10,Math.floor(Math.random() * tableSettings[col]["scale"]));
                row[col] = 1 * ((Math.random()*numb_range*scale_power) + (tableSettings[col]["min"]*scale_power)).toFixed(tableSettings[col]["decimals"]);
                break;
            case "CHG%":
                let positive_negative = Math.floor(Math.random()*2);
                let nn = 0;
                if(positive_negative){
                    style = "success";
                    nn = tableSettings[col]["max"];
                } else {
                    style = "danger";
                    nn = tableSettings[col]["min"];
                }
                row[`${col}_class`] = `text-${style} n-percent`;
                row[col] = 1 * (Math.random()*nn).toFixed(tableSettings[col]["decimals"]);
                break;
            default: 
                break;
        }
    });
    return row;
}
function MakeTable(rowCount){
    for (let index = 0; index < rowCount; index++) {
        data.push(MakeDataRow());
    }
    console.log(data);
}
function DisplayTable(){
    let SampleTable = document.getElementById('SampleTable');

    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let trh = document.createElement('tr');
    trh.id = "headRow";
    // trh.classList.add("btn-group");
    /* -- Table header -- */
    Object.keys(tableSettings).forEach(col => {
        let th = document.createElement('th');
        let button = document.createElement('button');
        button.classList.add("btn","btn-outline-dark");
        button.dataset.sort = col;
        button.dataset.activeToggle = "false";
        button.addEventListener("click", (ev)=>{
            if(ev.target.dataset.activeToggle == "false") {
                ReToggleBtns();
                ev.target.dataset.activeToggle = "true";
                Sort(ev.target.dataset.sort);
                ev.target.classList.toggle('btn-outline-dark');
                ev.target.classList.toggle('btn-dark');

                ev.target.children[0].classList.toggle('fa-sort');
                ev.target.children[0].classList.toggle('fa-sort-down');

            } else if(ev.target.dataset.activeToggle == "true"){
                ev.target.dataset.activeToggle = "resorted";
                reSort(ev.target.dataset.sort);
                
                // ev.target.classList.toggle('fa-sort-down');
                // ev.target.classList.toggle('fa-sort-up');
                ev.target.children[0].classList.toggle('fa-sort-down');
                ev.target.children[0].classList.toggle('fa-sort-up');
            } else {
                ev.target.dataset.activeToggle = "true";
                Sort(ev.target.dataset.sort);

                // ev.target.classList.toggle('fa-sort');
                // ev.target.classList.toggle('fa-sort-up');
                ev.target.children[0].classList.toggle('fa-sort-down');
                ev.target.children[0].classList.toggle('fa-sort-up');
            }
        });
        button.innerHTML = col;
        button.innerHTML = `${col}<div class="fa-icon fa-i-after fa-sort"></div>`;
        th.appendChild(button);
        trh.appendChild(th);
    });
    thead.appendChild(trh);

    data.forEach(row =>{
        let tr = document.createElement('tr');
        tr.id = row.id;
        Object.keys(tableSettings).forEach(col => {
            let td = document.createElement('td');
            if(row[`${col}_class`]) {
                let classes = row[`${col}_class`];
                td.innerHTML = `<span class="${classes}">${row[col]}</span>`;
            } else {
                td.innerHTML = row[col];
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    SampleTable.appendChild(thead);
    SampleTable.appendChild(tbody);
}

function getIDs(){
    let id_list = data.map(row=>{return row.Search;});
    return id_list;
}
function Sort(col){
    var datasort = [];
    datasort = [...data];

    switch(col) {
        case "Search":
            datasort.sort(function(a, b){return a[col].localeCompare(b[col])});
            break;
        case "TECHNICAL RATING":
        case "EXCHANGE":
            datasort.sort(function(a, b){return tableSettings[col].indexOf(b[col])-tableSettings[col].indexOf(a[col])});
            break;
        default:
            datasort.sort(function(a, b){return a[col] - b[col]});
            break;
    }
    Repopulate(datasort, col);   
}
function reSort(col){
    var datasort = [];
    datasort = [...data];

    switch(col) {
        case "Search":
            datasort.sort(function(a, b){return b[col].localeCompare(a[col])});
            break;
        case "TECHNICAL RATING":
        case "EXCHANGE":
            datasort.sort(function(a, b){return tableSettings[col].indexOf(a[col])-tableSettings[col].indexOf(b[col])});
            break;
        default:
            datasort.sort(function(a, b){return b[col] - a[col]});
            break;
    }
    Repopulate(datasort, col);   
}
function Repopulate(datasort, col){
    let SampleTable = document.getElementById('SampleTable');
    let tbody = SampleTable.children[1];
    datasort.forEach(row =>{
        var rowDOM = document.getElementById(row.id);
        if(col == "Search"){
            tbody.appendChild(rowDOM);
        } else
            tbody.insertBefore(rowDOM, tbody.childNodes[0]);
    });            
}


function ReToggleBtns(){
    let btnList = document.querySelectorAll('[data-active-toggle]');
    btnList.forEach(element =>{
        if(element.dataset.activeToggle != "false"){
            element.classList.toggle('btn-dark');
            element.classList.toggle('btn-outline-dark');
            element.dataset.activeToggle = "false";

            if(element.children[0].classList.includes('fa-sort-up')){
                ev.target.classList.toggle('fa-sort-up');
                ev.target.classList.toggle('fa-sort');
            }
            if(element.children[0].classList.includes('fa-sort-down')){
                ev.target.classList.toggle('fa-sort-down');
                ev.target.classList.toggle('fa-sort');
            }
        }
    });
}





window.addEventListener('load', (ev)=>{
    // MakeTable(5);
    MakeTable(20);
    DisplayTable();
    console.log(getIDs());
});