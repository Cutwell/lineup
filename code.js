if (typeof(Storage) !== "undefined") {
    var local = localStorage.todo;
    if(local == undefined || local == "") {
        localStorage.todo = "Add an item!,";
        local = "Add an item!,"
    }
    var todo = local.split(",");
} else {
    alert("No support for local storage! Try checking your settings or using a more updated browser.");
}

function load() {
    document.getElementById("new").addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            add();
        }
    });
    var list = document.getElementById("active");
    var input = document.getElementById("new");
    todo.forEach(function(item) {
        list.insertAdjacentHTML('beforeend', "<p onclick=complete(event) class=strikethrough>"+item+"</p>");
    });
}
function save() {
    var save = todo.toString();
    localStorage.todo = save;
}
function complete(el) {
    var item = el.target;
    var done = document.getElementById("completed");
    var index = todo.indexOf(item.innerText)

    todo.splice(index, 1);
    done.insertAdjacentHTML('beforeend', "<p class=strikethroughalways>"+item.innerText+"</p>");

    item.parentNode.removeChild(item);
    save();
}
function add() {
    var list = document.getElementById("active");
    var input = document.getElementById("new");
    if(/\S/.test(input.value)) {
        todo.push(input.value);
        list.insertAdjacentHTML('beforeend', "<p onclick=complete(event) class=strikethrough>"+input.value+"</p>");
        input.value = "";
    }
    save();
}