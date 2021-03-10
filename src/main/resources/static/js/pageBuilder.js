// поиск кнопок
const updBtn = document.getElementById('button-update');
let app = 'gate';

function updateTable(app) {
    let req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', "/ws/loggers/" + app, true);
    req.onload = function () {
        let jsonResponse = req.response;
        buildHtmlTable(jsonResponse);
    };
    req.send(null);
}

function changeLogLevel(selectObject) {
    let value = selectObject.value;
    let parent = selectObject.parentNode.parentNode;
    let logger = parent.firstChild.textContent;


    let req = new XMLHttpRequest();

    let body = JSON.stringify({
        "loggerName": logger,
        "configuredLevel": value,
        "app": app
    });

    req.open("POST", '/ws/changeLogger/' + app, true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.send(body);
    clearTable(app);
    updateTable(app);
}

function buildHtmlTable(info) {
    let loggers = info.loggers;
    let levels = info.levels;
    for (let logger in loggers) {
        let row = document.createElement('div');
        row.className = "rTableRow";

        let col = document.createElement('div');
        col.className = "rTableCell logger";
        col.innerText = logger;
        row.appendChild(col);

        col = document.createElement('div');
        col.className = "rTableCell level";
        col.innerText = loggers[logger].configuredLevel == null ? "null" : loggers[logger].configuredLevel;
        row.appendChild(col);

        col = document.createElement('div');
        col.className = "rTableCell";

        let sel = document.createElement('select');
        sel.id = "select-log-level";
        sel.onchange = function () {
            changeLogLevel(this);
        }
        for (let level in levels) {
            let opt = document.createElement('option')
            opt.value = levels[level];
            opt.innerText = levels[level];
            if (levels[level] === loggers[logger].effectiveLevel) {
                opt.selected = true;
            }
            sel.appendChild(opt)
        }
        col.appendChild(sel);
        row.appendChild(col);
        document.getElementById(app + "-table-content").appendChild(row);

    }

}

function clearTable(app) {
    document.getElementById(app + "-table-content").innerHTML = "";
}

// Обработка событий
updBtn.addEventListener('click', function () {
    clearTable(app);
    updateTable(app);
})


function openTab(appName) {
    app = appName;
    let i, tabcontent;
    tabcontent = document.getElementsByClassName("table-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(app + "-table-content").style.display = "block";
}