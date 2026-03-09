# 🛒 Street Lab - Custom Product Card Section

Este projeto é uma seção customizada para Shopify construída como parte do desafio técnico da **Shakers / Street Lab**. O objetivo principal foi criar um _Product Card_ interativo, com seleção dinâmica de variantes e integração via AJAX com o carrinho da Shopify, sem a necessidade de recarregar a página.

## ✨ Funcionalidades Implementadas

- **Renderização Dinâmica (Liquid):** As opções de produtos (Cores e Tamanhos) são renderizadas dinamicamente utilizando o objeto `product.options_with_values`, garantindo que a seção funcione para qualquer produto cadastrado no admin da Shopify.
- **Seleção de Variantes (JavaScript):** Lógica customizada em Vanilla JS para encontrar a variante correta com base nas opções selecionadas pelo usuário, atualizando instantaneamente o **preço** e a **imagem em destaque**.
- **Integração com Cart API:**
  - Adição de produtos ao carrinho (`/cart/add.js`).
  - Busca e renderização dos itens do carrinho em um _Side Cart_ (`/cart.js`).
  - Limpeza total do carrinho (`/cart/clear.js`).
- **Tratamento de Estado Visual:** Sincronização entre o estado inicial do Liquid e o estado do JavaScript para garantir que as opções padrão (ex: Tamanho P) já carreguem ativas na interface.

## 🛠️ Tecnologias e Ferramentas

- **Shopify Liquid:** Para estruturação e injeção de dados do backend (Schema, atributos de data, filtros de imagem).
- **Vanilla JavaScript (ES6+):** Para manipulação do DOM, gerenciamento de estado das opções e requisições assíncronas (`fetch` API).
- **CSS3 (BEM Methodology):** Para estilização modular e classes de estado dinâmicas (`.selected`).
- **Git & GitHub:** Versionamento de código seguindo o padrão **Conventional Commits** (`feat:`, `fix:`, `refactor:`).

## 🧠 Decisões Técnicas e Boas Práticas

1.  **Prevenção de Erros (Null Checks):** Foram adicionadas verificações no Liquid (`{% if product_selected != blank %}`) e no JS para garantir que o código não quebre caso o lojista não selecione um produto no _Theme Editor_.
2.  **Variantes Flexíveis:** O método `.find()` no JavaScript foi estruturado para ser _case-insensitive_ e independente da ordem das opções no título da variante.
3.  **Delegação de Eventos:** O JS utiliza usa `data-attributes` (`data-option-name`, `data-value`) em vez de seletores fixos.

## 🎥 Demonstração e Vídeo
Conforme solicitado nos requisitos do desafio, gravei um vídeo demostrando o funcionamento do projeto e explicando o código.

> **Assista ao vídeo aqui:** [Video no Youtube](https://youtu.be/6PFjf_7Qg58)

> **Link do PR:** [feat/product-card-variantes](https://github.com/DaniloSreis/shakers-desafio-product-card-variantes/tree/feat/product-card-variantes)
## 🚀 Como Instalar no Tema Shopify

**1. Clone o repositório**
  ```bash
    git clone https://github.com/DaniloSreis/shakers-desafio-product-card-variantes.git
  ```

**2. Entre no repositório**
  ```bash
    cd shakers-desafio-product-card-variantes
  ```

**3. Inicie o servidor de desenvolvimento**
  ```bash
  shopify theme dev --store=nome-da-sua-loja.myshopify.com
  ```