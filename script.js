const body = document.body;
const themeButton = document.getElementById("toggleTema");
const menuButton = document.getElementById("menuToggle");
const menuLinks = document.getElementById("menuLinks");
const formContato = document.getElementById("formContato");
const mensagemForm = document.getElementById("mensagemForm");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a[href^='#']");
const submitButton = formContato.querySelector("button[type='submit']");

// Alterna entre tema claro e escuro usando classes CSS.
themeButton.addEventListener("click", () => {
    body.classList.toggle("dark");
    const temaEscuro = body.classList.contains("dark");

    themeButton.textContent = temaEscuro ? "Claro" : "Tema";
    themeButton.setAttribute("aria-label", temaEscuro ? "Alternar para tema claro" : "Alternar para tema escuro");
});

// Abre e fecha o menu em telas menores.
menuButton.addEventListener("click", () => {
    const menuAberto = menuLinks.classList.toggle("aberto");

    body.classList.toggle("menu-aberto", menuAberto);
    menuButton.setAttribute("aria-expanded", String(menuAberto));
    menuButton.textContent = menuAberto ? "Fechar" : "Menu";
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuLinks.classList.remove("aberto");
        body.classList.remove("menu-aberto");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "Menu";
    });
});

function mostrarMensagem(texto, tipo) {
    mensagemForm.textContent = texto;
    mensagemForm.className = `mensagem-form ${tipo}`;
}

function emailValido(email) {
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return padraoEmail.test(email);
}

// Validação obrigatória do formulário e simulação de envio.
formContato.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
        mostrarMensagem("Preencha todos os campos antes de enviar.", "erro");
        return;
    }

    if (nome.length < 3) {
        mostrarMensagem("O nome deve ter pelo menos 3 caracteres.", "erro");
        return;
    }

    if (!emailValido(email)) {
        mostrarMensagem("Informe um e-mail válido, como usuario@dominio.com.", "erro");
        return;
    }

    if (mensagem.length < 10) {
        mostrarMensagem("A mensagem deve ter pelo menos 10 caracteres.", "erro");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    mostrarMensagem("Simulando envio da mensagem...", "info");

    setTimeout(() => {
        mostrarMensagem("Mensagem enviada com sucesso!", "sucesso");
        formContato.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Enviar mensagem";
    }, 900);
});

// Destaca automaticamente no menu a seção que está sendo visualizada.
function atualizarSecaoAtiva() {
    let atual = "";

    sections.forEach((section) => {
        const topoDaSecao = section.offsetTop - 140;

        if (window.scrollY >= topoDaSecao) {
            atual = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        const ativo = link.getAttribute("href") === `#${atual}`;
        link.classList.toggle("active", ativo);
        link.setAttribute("aria-current", ativo ? "page" : "false");
    });
}

window.addEventListener("scroll", atualizarSecaoAtiva);
window.addEventListener("load", atualizarSecaoAtiva);
