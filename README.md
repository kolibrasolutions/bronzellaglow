# Bronzella Website

Este é o código-fonte do site da Bronzella, desenvolvido com React e Tailwind CSS, com suporte a múltiplos idiomas (Português, Inglês, Espanhol) e funcionalidade de orçamento via WhatsApp.

## Estrutura do Projeto

- `/public`: Contém arquivos estáticos, como imagens.
  - `/images`: Imagens dos produtos e layout.
- `/src`: Contém o código-fonte da aplicação React.
  - `/components/ui`: Componentes da interface do usuário (gerados pelo shadcn/ui).
  - `/data`: Arquivos de dados, como a lista de produtos.
    - `products.json`: Contém a lista de produtos e categorias. **É aqui que você deve adicionar os preços.**
  - `/locales`: Arquivos de tradução para cada idioma suportado.
    - `/en/translation.json`: Textos em Inglês.
    - `/es/translation.json`: Textos em Espanhol.
    - `/pt/translation.json`: Textos em Português.
  - `App.jsx`: Componente principal da aplicação.
  - `i18n.js`: Configuração da biblioteca de internacionalização (i18next).
  - `index.css`: Estilos globais (gerenciados pelo Tailwind CSS).
  - `main.jsx`: Ponto de entrada da aplicação React.

## Como Adicionar Preços aos Produtos

1.  Abra o arquivo `/src/data/products.json`.
2.  Localize o produto ao qual deseja adicionar o preço.
3.  Encontre a linha `
