# Torra Portal Admissões - Especificações do Figma

**Design File**: PORTAL TORRA [ADMISSÕES]
**Mobile Node**: 2119-20
**Desktop Node**: 2096-20
**Data de Análise**: 2025-10-14

---

## 📱 Especificações Mobile (412px)

### Viewport
- **Largura**: 412px
- **Altura**: 892px
- **Border Radius**: 18px (simulação device)
- **Background**: #F8F8F8

### Componentes Reutilizáveis

#### Status Bar (.Building Blocks/status-bar)
- **Altura**: 52px
- **Padding**: 10px 24px
- **Elementos**:
  - Time: "9:30" (Roboto 500, 14px)
  - Wifi icon (17x17px)
  - Signal icon (17x17px)
  - Battery icon (8x15px)
  - Camera Cutout (24x24px, centered)

#### Navigation (.Building Blocks/navigation)
- **Posição**: Bottom (y=868)
- **Largura**: 412px
- **Altura**: 24px
- **Cor**: #FFFFFF

---

## 🎨 Paleta de Cores

### Cores Primárias
```css
--primary-01: #FF5101;      /* Torra Orange */
--primary-02: #37375B;      /* Torra Dark Blue */
```

### Cores Neutras
```css
--neutral-01: #FFFFFF;      /* White */
--neutral-05: #5F5F5F;      /* Gray Text */
```

### Cores de Background
```css
--bg-main: #F8F8F8;         /* Light Gray */
--bg-accent: #FBE2D7;       /* Light Orange */
--bg-decoration: #FFCCB6;   /* Light Peach */
```

### Cores do Sistema (Material 3)
```css
--m3-on-surface: #1D1B20;   /* Dark Text */
```

---

## 📝 Tipografia

### Font Family
**Principal**: Sofia Pro

### Heading Styles

#### Heading 1
```css
font-family: Sofia Pro;
font-weight: 400;
font-size: 32px;
line-height: 38px; /* 1.1875em */
text-align: center;
color: #37375B;
```

#### Heading 4
```css
font-family: Sofia Pro;
font-weight: 400;
font-size: 16px;
line-height: 24px; /* 1.5em */
text-align: left;
color: #5F5F5F;
```

#### Heading 5
```css
font-family: Sofia Pro;
font-weight: 400;
font-size: 14px;
line-height: 16px; /* 1.1428em */
text-align: center;
color: #FFFFFF; /* in buttons */
```

### Roboto (Sistema)
```css
font-family: Roboto;
font-weight: 500;
font-size: 14px;
line-height: 20px; /* 1.4285em */
letter-spacing: 1%;
```

---

## 📐 Layout & Spacing

### Mobile Container
```css
width: 412px;
padding: 0 16px;
gap: 24px;
```

### Desktop Container
```css
width: 1440px;
padding: 0 135px;
gap: 48px;
```

### Section Gaps
- **Small**: 24px
- **Medium**: 48px
- **Large**: 96px

---

## 🖼️ Tela: 00.00.00 - Bem-vindo

### Layout
- **Posição do conteúdo**: x=16, y=200
- **Largura do conteúdo**: 380px
- **Gap entre elementos**: 24px

### Elementos

#### Ícone de Foguete
```css
width: 100px;
height: 100px;

/* Outer circle */
border: 5px solid #FF5101;
background: transparent;

/* Inner circle */
background: #FBE2D7;
width: 86.21px;
height: 86.21px;

/* Icon */
width: 50px;
height: 50px;
position: center;
```

#### Título
**Texto**: "Bem vindo(a)! É muito bom ter você com a gente."
```css
font: Heading 1;
width: 100%;
align: center;
color: #37375B;
```

#### Mensagem de Boas-Vindas
**Texto**: "Parabéns pela sua seleção para a vaga! 🎉\n\nPara darmos os próximos passos..."
```css
font: Heading 4;
width: 100%;
align: left;
color: #5F5F5F;
```

#### Botão "Começar"
```css
background: #FF5101;
color: #FFFFFF;
padding: 16px 24px;
gap: 8px;
width: 100%; /* stretch */
border-radius: 4px; /* inferido */
text: Heading 5;
```

### Decoração de Background
- **Elemento**: Curva/arco decorativo
- **Cor**: #FFCCB6
- **Opacidade**: 0.5
- **Posição**: x=-344, y=234
- **Dimensões**: 1260.63 x 318px

---

## 🧾 Tela: Step 1 - Dados Gerais

### Header
- **Altura**: 116px (topo)
- **Background**: Imagem de gradiente
- **Logo**: 227x27px (posição: x=54, y=18)
- **Filtro**: blur(7.5px) em alguns elementos

### Form Layout
```css
display: column;
align-items: center;
gap: 40px;
padding: 0 0 24px;
width: 412px;
```

### Campos de Input (Inferido do padrão)
```css
width: 100%;
padding: 12px 16px;
border: 1px solid #E0E0E0;
border-radius: 4px;
font: Sofia Pro 16px;
color: #1D1B20;

/* Focus state */
border-color: #FF5101;
outline: none;
```

### Campos Obrigatórios (Step 1)
1. Nome Completo (`nomeCompleto`)
2. CPF (`cpf`)
3. RG (`numeroRG`)
4. Data de Nascimento (`dataNascimento`)
5. Celular (`celular`)
6. Email (`email`)

### Campos Opcionais
1. Nome Social (`nomeSocial`)
2. Nome do Pai (`nomePai`)
3. Nome da Mãe (`nomeMae`)
4. Data de Emissão RG (`dataEmissaoRG`)
5. Órgão Emissor (`orgaoEmissor`)
6. Estado Civil (`estadoCivil`)
7. Grau de Escolaridade (`grauEscolaridade`)

---

## 🔢 Todas as Telas Mobile (Resumo)

| Tela | Código | Altura | Scroll |
|------|--------|--------|--------|
| Bem-vindo | 00.00.00 | 892px | Não |
| Step 1 - Dados Gerais | 00.01.01 | 2300px | Sim |
| Step 1 - Upload | 00.01.02 | 892px | Sim |
| Step 2 - Dependentes | 00.02.01 | 892px | Sim |
| Step 2 - Dependentes (Preenchido) | 00.02.02 | 892px | Sim |
| Step 2 - Dependentes (3) | 00.02.03 | 1408px | Sim |
| Step 3 - Endereço | 00.03.01 | 1520px | Sim |
| Step 4 - Dados Contratuais | 00.04.01 | 1664px | Sim |
| Step 5 - PCD | 00.05.01 | 892px | Sim |
| Step 5 - PCD (Condicional) | 00.05.02 | 1416px | Sim |
| Step 5 - PCD (Final) | 00.05.03 | 892px | Sim |
| Step 6 - Vale-Transporte | 00.06.01 | 892px | Sim |
| Step 6 - Vale-Transporte (Linhas) | 00.06.02 | 1038px | Sim |
| Step 6 - Vale-Transporte (Final) | 00.06.03 | 892px | Sim |
| Step 7 - Dados Estrangeiro | 00.07.01 | 892px | Sim |
| Step 7 - Estrangeiro (Sim) | 00.07.02 | 1616px | Sim |
| Step 7 - Estrangeiro (Final) | 00.07.03 | 892px | Sim |
| Step 8 - Dados Aprendiz | 00.08.01 | 892px | Sim |
| Step 8 - Aprendiz (Sim) | 00.08.02 | 1200px | Sim |
| Step 8 - Aprendiz (Final) | 00.08.03 | 892px | Sim |
| Step 9 - Dados Bancários | 00.09.01 | 892px | Sim |
| Step 9 - Bancários (Preenchendo) | 00.09.02 | 974px | Sim |
| Step 9 - Bancários (Final) | 00.09.03 | 892px | Sim |
| Step 10 - Finalização | 00.10.01 | 892px | Sim |

---

## 🖥️ Assets Desktop (Componentes)

### Botões
- Primário (Grande)
- Secundário
- Terciário
- Estados: Normal, Hover, Disabled

### Inputs
- Text Input
- Number Input
- Date Picker
- Select/Dropdown
- Checkbox
- Radio Button

### TAGs
- Status tags
- Category tags

### Menu
- Sidebar navigation
- Header navigation

### Paginação
- Números de página
- Anterior/Próximo
- Primeira/Última

### Tabela
- Header
- Rows
- Ações
- Sorting

### Progress
- Progress bar
- Step indicator
- Loading spinner

### Toggle
- Switch on/off
- Estados

### Modal
- Overlay
- Content container
- Close button
- Actions

### Upload de Arquivos
- Drag & drop zone
- File list
- Progress indicators

### Step Indicator
- Current step highlight
- Completed steps
- Pending steps
- Progress line

---

## 📋 Checklist de Implementação

### ✅ Já Implementado
- [x] Tela de boas-vindas (parcial)
- [x] Step 1 - Formulário de dados gerais
- [x] Header com logo
- [x] Cores primárias (orange, dark blue)
- [x] Fonte Sofia Pro

### ⏳ Pendente - Mobile
- [ ] Status bar do mobile
- [ ] Navegação inferior (24px bar)
- [ ] Decoração de background (curvas)
- [ ] Ícone de foguete animado
- [ ] Border radius de 18px no container
- [ ] Scroll vertical adequado
- [ ] Step indicator completo
- [ ] Steps 2-10 formulários

### ⏳ Pendente - Desktop
- [ ] Layout de 1440px com padding de 135px
- [ ] Grid layout para formulários
- [ ] Componentes reutilizáveis do design system
- [ ] Responsividade entre 412px e 1440px

### ⏳ Pendente - Componentes
- [ ] Sistema de design completo
- [ ] Biblioteca de componentes
- [ ] Estados de hover/focus/disabled
- [ ] Animações e transições
- [ ] Upload de arquivos com drag & drop
- [ ] Modal system
- [ ] Toast notifications

---

## 🎯 Próximas Ações Prioritárias

1. **Implementar responsividade mobile-first**
   - Adicionar breakpoints em 412px, 768px, 1024px, 1440px
   - Ajustar padding e gaps

2. **Completar Steps 2-10**
   - Criar formulários seguindo design Figma
   - Implementar lógica condicional (PCD, Estrangeiro, Aprendiz)
   - Adicionar validações

3. **Criar sistema de componentes**
   - Extrair botões, inputs, cards para componentes reutilizáveis
   - Documentar props e variantes

4. **Adicionar elementos visuais**
   - Status bar mobile
   - Navegação inferior
   - Decorações de background
   - Ícones e ilustrações

5. **Testes visuais**
   - Screenshot tests com Playwright
   - Validação de cores e tipografia
   - Testes de responsividade

---

**Nota**: Este documento serve como referência para garantir que a implementação está alinhada com o design aprovado no Figma.
