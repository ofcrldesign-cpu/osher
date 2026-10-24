# OSHER Açaí Shop — Plataforma Delivery

> *"Açaí + Sorvete. Do seu jeito."*

Plataforma delivery web e catálogo interativo da **OSHER Açaí Shop**, desenvolvida com fidelidade estrita à identidade visual da marca (Brandkit Oficial). Substitui os tons tradicionais roxos e verdes saturados por uma paleta sofisticada em **Ouro, Grafite e Off-White**, proporcionando acolhimento com sofisticação.

---

## 🍨 Principais Funcionalidades

- **Hero Slider Chamativo**: Carrossel dinâmico em slides destacando receitas assinadas, o combo *Duo Fusion* e a experiência delivery térmica.
- **Alternância de Tema (Light & Dark Mode)**:
  - **Modo Noturno**: Fundo grafite profundo (`#121212`) com detalhes dourados luminosos (`#EA9F1D` a `#D27F02`).
  - **Modo Claro**: Fundo *off-white* cremoso (`#FAF8F5`) com tipografia em grafite (`#222222`) e detalhes em ouro.
  - Persistência automática no `localStorage`.
- **Seção Interativa "Monte do Seu Jeito"**:
  - Personalizador em 5 etapas: tamanho, base, frutas frescas, crocantes e caldas artesanais.
  - Cálculo instantâneo do valor com resumo em tempo real e adição direta à sacola.
- **Cardápio Completo com Filtros e Busca**:
  - Filtro por abas (*Copos*, *Bowls Gourmet*, *Duo Fusion*, *Gelatos Artesanais*, *Shakes*, *Combos*).
  - Busca em tempo real por nome do produto ou ingredientes.
- **Sacola de Compras Delivery (Drawer Lateral)**:
  - Adição rápida, controle de quantidades, observações por item.
  - Sistema de cupons com validação dinâmica (`OSHER10`, `DOSEUJEITO`, `FRETEGRATIS`).
  - Cálculo automático de subtotal, frete e total final.
- **Checkout Delivery & Integração WhatsApp**:
  - Coleta de dados de entrega e forma de pagamento (PIX, Cartão na maquininha ou Dinheiro com troco).
  - Geração de mensagem formatada profissional enviada diretamente para o WhatsApp do atendimento.
  - Tela de rastreamento de pedido (*Tracking*) visual.
- **Botão Flutuante "Voltar ao Topo"**:
  - Apresenta anel circular de progresso SVG conforme o scroll da página e rolagem suave ao topo.

---

## 🎨 Identidade Visual (Brandkit)

- **Cores Primárias**:
  - Ouro Degradê: `#EA9F1D` ➔ `#D27F02`
  - Grafite Oficial: `#222222` (Texto / Modo Escuro: `#121212`)
  - Off-White Oficial: `#FAF8F5`
- **Tipografia**:
  - Títulos e assinaturas: `Cormorant Garamond` (Google Fonts)
  - Textos e UI: `Montserrat` (Google Fonts)
- **Elementos Gráficos**: Filetes afilados dourados, monograma de acolhimento e cantos com linhas finas.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** Semântico com foco em acessibilidade e SEO.
- **CSS3** nativo moderno (CSS Variables, Flexbox, Grid, Animações e Transições suaves).
- **JavaScript (ES6+)** modular e autônomo (sem dependências pesadas de frameworks).
- **Google Fonts** (*Cormorant Garamond* e *Montserrat*).
- **SVG** para o logotipo vetorial oficial e elementos dinâmicos.

---

## 📋 Pré-requisitos

Para executar o projeto localmente, basta qualquer navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

Caso deseje executar com um servidor local:
- Python 3 instalado **OU**
- Node.js instalado (opcional, para utilitários de servidor)

---

## 🚀 Como Executar Localmente

### Opção 1: Servidor Python (Recomendado)
Execute na raiz do projeto:

```bash
python -m http.server 3333
```
Acesse no seu navegador: **`http://localhost:3333`**

### Opção 2: Node.js (npx serve)
```bash
npx serve .
```

### Opção 3: Direto no Navegador
Dê um duplo clique no arquivo `index.html` para abri-lo diretamente no seu navegador.

---

## ⚙️ Variáveis de Ambiente

Consulte o arquivo `.env.example` para referências de configuração caso deseje integrar com um servidor de produção ou configurar o número de WhatsApp padrão para recebimento dos pedidos.

---

## 📁 Estrutura do Projeto

```
OSHER/
├── index.html                   # Estrutura HTML principal
├── README.md                    # Documentação do projeto
├── .gitignore                   # Arquivos ignorados pelo Git
├── .env.example                 # Exemplo de configurações
├── css/
│   └── style.css                # Estilos e temas claro/noturno
├── js/
│   ├── products.js              # Base de dados de produtos e cupons
│   └── app.js                   # Lógica da aplicação e checkout
├── assets/
│   └── images/                  # Imagens fotográficas dos produtos
└── .docs/
    ├── OSHER Açaí Shop — Brandkit.md  # Manual de identidade visual
    └── Prompt_Github.txt               # Instruções de DevOps e versionamento
```

---

## 📄 Licença e Créditos

© 2026 OSHER Açaí Shop. Todos os direitos reservados.
