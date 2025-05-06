// Função para montar e enviar mensagem para o WhatsApp
function montarMensagemWhatsapp() {
    const cart = JSON.parse(localStorage.getItem('bronzellaCart')) || [];
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    let mensagem = 'Olá! Gostaria de um orçamento para os seguintes produtos:%0A';
    cart.forEach(item => {
        mensagem += `- ${item.title} (Quantidade: ${item.quantity})%0A`;
    });
    // Substitua SEUNUMERO pelo número do WhatsApp desejado
    window.open(`https://wa.me/SEUNUMERO?text=${mensagem}`, '_blank');
}

// Adicionar evento ao botão de WhatsApp (ajuste o seletor conforme seu HTML)
document.addEventListener('DOMContentLoaded', () => {
    const btnWhatsapp = document.querySelector('.btn-whatsapp');
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', montarMensagemWhatsapp);
    }
}); 