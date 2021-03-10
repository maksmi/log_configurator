
function searchTableName() {
    var input, filter, found, i, j, row, cell;
    input = document.getElementById("search_name");
    filter = input.value.toUpperCase();
    row = document.getElementById(app + "-table-content").getElementsByClassName("rTableRow");
    for (i = 0; i < row.length; i++) {
        cell = row[i].getElementsByClassName("rTableCell logger");
        for (j = 0; j < cell.length; j++) {
            if (cell[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            row[i].style.display = "";
            found = false;
        } else {
            row[i].style.display = "none";
        }
    }
}

function searchTableLevel() {
    var input, filter, found, i, j, row, cell;
    input = document.getElementById("search_level");
    filter = input.value.toUpperCase();
    row = document.getElementById(app + "-table-content").getElementsByClassName("rTableRow");
    for (i = 0; i < row.length; i++) {
        cell = row[i].getElementsByClassName("rTableCell level");
        for (j = 0; j < cell.length; j++) {
            if (cell[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            row[i].style.display = "";
            found = false;
        } else {
            row[i].style.display = "none";
        }
    }
}