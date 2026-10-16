# Tecgáz Aquecedores - Website Institucional

Estrutura web moderna, responsiva e de alta conversão desenvolvida em **HTML5**, **Tailwind CSS** e **JavaScript vanilla** para a empresa **Tecgáz Aquecedores**, com foco no mercado de São Paulo e Grande SP.

---

## 🎨 Identidade Visual Aplicada
- **Vermelho Principal:** `#E52421` (destaque para botões de conversão, detalhes, ícones e chamadas).
- **Fundo Limpo:** `#FFFFFF` com variações neutras (`#F8F9FA` e `#151515`).
- **Texto Principal:** `#222222` (alta legibilidade e contraste profissional).
- **Tipografia:** Google Fonts *Plus Jakarta Sans* (textos e leitura) e *Montserrat* (títulos de impacto e branding).

---

## 🚀 Estrutura de Arquivos

```text
tecgaz-aquecedores/
├── index.html        # Estrutura HTML semântica completa com Tailwind CSS e Lucide Icons
├── style.css         # Estilizações customizadas, animações e efeitos de elevação
├── script.js         # Lógica do carrossel (5 banners), seletor de unidades e modais
└── README.md         # Documentação completa do projeto
```

---

## 📋 Funcionalidades Implementadas

### 1. Cabeçalho (Header)
- Logotipo estilizado da **Tecgáz Aquecedores** com ícone em vetor.
- Menu de navegação rápido: **Início | Produtos | Marcas | Unidades | Contato**.
- Botão em destaque de **"Orçamento Rápido"** com disparo para o modal interativo.
- Topbar informativa com indicação de atendimento em São Paulo e telefones de suporte rápido.
- Menu responsivo para dispositivos móveis (*mobile-friendly* com botão hambúrguer).

### 2. Hero Section com Carrossel Rotativo (5 Banners)
- **Banner 1 (Institucional & Emocional):** Foco em família, aconchego e água quente em São Paulo com botões dinâmicos de atendimento para Mooca e Guarulhos.
- **Banner 2 (Aquecedores a Gás):** Destaque para as gigantes do mercado (*Rinnai, Rheem, Komeco e Lorenzetti*).
- **Banner 3 (Sistemas Conjugados):** Solução de alta vazão para múltiplos banheiros e duchas simultâneas.
- **Banner 4 (Sistema Solar Térmico):** Sustentabilidade e economia de até 70% na conta de energia.
- **Banner 5 (Aquecimento de Piscinas):** Lazer o ano todo com bombas de calor e aquecedores a gás.
- **Recursos do Carrossel:** Rotação automática suave a cada 6 segundos, pausa ao passar o mouse, setas de navegação, barras indicadoras de progresso e suporte a toque (*swipe* mobile).

### 3. Seletor Dinâmico de Unidades (Em Destaque Obrigatório)
- Seletor fixado logo abaixo do Hero para escolha imediata da região do cliente:
  * **Unidade Mooca:** Dispara para o WhatsApp `(11) 99134-6356` com mensagem personalizada para São Paulo Capital, Zona Leste, Centro e Zona Sul.
  * **Unidade Guarulhos:** Dispara para o WhatsApp `(11) 94030-0560` com mensagem personalizada para Guarulhos, Zona Norte e Alto Tietê.

### 4. Seção de Marcas em Grade Limpa
- Destaque em cartões modernos para as 4 marcas parceiras:
  * **Rinnai** (Tecnologia Japonesa e controle digital)
  * **Rheem** (Engenharia Norte-Americana e robustez)
  * **Komeco** (Inovação, design e economia)
  * **Lorenzetti** (Tradição brasileira e confiabilidade)
- Selo de instalação certificada de acordo com a norma **ABNT NBR 13103**.

### 5. Seção de Contato e Unidades (Lado a Lado)
- Exibição paralela e completa dos dados das duas lojas físicas:
  * **Unidade Mooca:** Rua da Mooca, 2850 - Mooca, São Paulo - SP | WhatsApp: (11) 99134-6356 | Horários | Link do Google Maps.
  * **Unidade Guarulhos:** Av. Paulo Faccini, 1420 - Centro / Maia, Guarulhos - SP | WhatsApp: (11) 94030-0560 | Horários | Link do Google Maps.

### 6. Extras de Alta Conversão
- **Modal de Orçamento Rápido:** O usuário escolhe nome, unidade (Mooca ou Guarulhos) e o produto de interesse, sendo direcionado diretamente para o WhatsApp com a mensagem formatada.
- **Botão Flutuante de WhatsApp:** Canto inferior direito com menu interativo de seleção de unidade e efeito pulsante.

---

## 💻 Como Visualizar Localmente

Basta abrir o arquivo `index.html` em qualquer navegador moderno (Google Chrome, Edge, Safari, Firefox).

Você também pode iniciar um servidor local simples via terminal:
```bash
# Com Python 3:
python -m http.server 8080

# Ou com Node.js (npx serve):
npx serve .
```
E acessar no navegador: `http://localhost:8080`.
