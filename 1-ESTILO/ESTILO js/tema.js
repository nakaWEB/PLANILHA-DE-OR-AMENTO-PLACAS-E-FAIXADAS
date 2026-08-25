const btn = document.getElementById("toggleTheme");

btn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = btn.querySelector("i");
    const text = btn.querySelector("span");

    if(document.body.classList.contains("light-mode")){

        icon.className = "fa-solid fa-sun";
        text.textContent = "Modo Escuro";

        localStorage.setItem("theme","light");

    }else{

        icon.className = "fa-solid fa-moon";
        text.textContent = "Modo Claro";

        localStorage.setItem("theme","dark");

    }

});

/* Salva a escolha */

if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light-mode");

    btn.querySelector("i").className = "fa-solid fa-sun";
    btn.querySelector("span").textContent = "Modo Escuro";
}