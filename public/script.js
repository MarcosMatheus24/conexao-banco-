const form = document.querySelector('#formulario');
const mensagem = document.querySelector('#mensagem');
async function carregarUsuarios() {
const resposta = await fetch('/usuarios');
const usuarios = await resposta.json();
document.querySelector('#lista').innerHTML = usuarios
    .map(u => `<li>${u.nome} — ${u.email}</li>`).join('');
}
form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const resposta = await fetch('/usuarios', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ nome, email })
});
mensagem.textContent = resposta.ok ? 'Cadastro realizado!' : 'Erro ao cadastrar.';
if (resposta.ok) { form.reset(); carregarUsuarios(); }
});
carregarUsuarios();