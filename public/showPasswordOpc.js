function showPasswordReg() {
    var passInput = document.getElementById("passReg");

    if (passInput.type === "password") {
        passInput.type = "text";
    }

    else {
        passInput.type = "password";
    }
}

function showPasswordLog() {
    var passInput = document.getElementById("passLog");

    if (passInput.type === "password") {
        passInput.type = "text";
    }

    else {
        passInput.type = "password";
    }
}