if (typeof(Storage) !== "undefined") {
    var local = localStorage.todo;
    if(local == undefined || local == "") {
        localStorage.todo = "Add an item!,";
        local = "Add an item!,"
    }
    var todo = local.split(",");
    todo = todo.filter(function(element) {
        return element !== "";
    });
    if(todo == []) {
        localStorage.todo = "Add an item!,";
        todo = ["Add an item!",]
    }
} else {
    alert("No support for local storage! Try checking your settings or using a more updated browser.");
}
function load() {
    var active = document.getElementById("active");
    Sortable.create(active, {});
    document.getElementById("new").addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            add();
        }
    });
    var list = document.getElementById("active");
    var input = document.getElementById("new");
    todo.forEach(function(item) {
        list.insertAdjacentHTML('beforeend', "<li onclick=complete(event) ondrag=drag(event) ondragend=release(event) class=strikethrough>"+item+"</li>");
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
    done.insertAdjacentHTML('beforeend', "<li onclick=undo(event) class=strikethroughalways>"+item.innerText+"</li>");

    item.parentNode.removeChild(item);
    save();
}
function add() {
    var list = document.getElementById("active");
    var input = document.getElementById("new");
    if(/\S/.test(input.value)) {
        todo.push(input.value);
        list.insertAdjacentHTML('beforeend', "<li onclick=complete(event) ondrag=drag(event) ondragend=release(event) class=strikethrough>"+input.value+"</li>");
        input.value = "";
    }
    save();
}
function undo(el) {
    var item = el.target;
    var active = document.getElementById("active");

    todo.push(item.innerText);
    active.insertAdjacentHTML('beforeend', "<li onclick=complete(event) ondrag=drag(event) ondragend=release(event) class=strikethrough>"+item.innerText+"</li>");

    item.parentNode.removeChild(item);
    save();
}
function drag(el) {
    // update cursor when we drag.
    el.target.style.cursor = "move";
}
function release(el) {
    el.target.style.cursor = "default";

    // get the new list order.
    var containerDiv = document.getElementById("active");
    var innerDivs = containerDiv.getElementsByTagName("li");
    var new_order = [];
    for(var i=0; i<innerDivs.length; i++) {
        new_order.push(innerDivs[i].innerText);
    }
    todo = new_order;
    save();
}
function togglemenu() {
    var menudropdown = document.getElementById("menudropdown");
    if (menudropdown.style.display === "none") {
        menudropdown.style.display = "block";
    } else {
        menudropdown.style.display = "none";
    }
} 