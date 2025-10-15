# Torra Portal Admissões - Relatório de Alinhamento com Figma

**Data**: 2025-10-14
**Testes Executados**: 29 testes E2E visuais
**Resultado**: 22 ✅ Passando | 7 ❌ Falhando

---

## 📊 Resumo Executivo

O projeto está **76% alinhado** com o design do Figma. Os principais gaps estão em:
1. Cores de background (CSS color-space)
2. Dimensões do logo
3. Campos de formulário faltantes
4. Botões de ação
5. Tamanhos de fonte específicos

---

## ✅ O Que Está Correto (22 testes passando)

### Layout e Estrutura
- ✅ Navegação para Step 1 funciona
- ✅ Layout spacing correto (16px horizontal padding)
- ✅ Step indicator presente
- ✅ Inputs têm styling adequado (border-radius, padding)
- ✅ Página é scrollável no viewport mobile
- ✅ Bottom navigation bar presente
- ✅ Breadcrumb navigation funcionando

### Responsividade
- ✅ Adapta corretamente a 412px (mobile)
- ✅ Container mais largo em desktop (1440px)
- ✅ Header com altura adequada (60-100px)
- ✅ Sem scroll horizontal em mobile
- ✅ Form spacing adequado em mobile

### Acessibilidade
- ✅ Hierarquia de headings correta (h1 presente)
- ✅ Botões têm labels acessíveis
- ✅ Inputs têm labels associados (for/id)
- ✅ Contraste de cores adequado

### Funcionalidade
- ✅ Transições suaves em botões
- ✅ Hover effects funcionando
- ✅ Logo carrega corretamente
- ✅ Ícone de foguete presente
- ✅ Cross-browser consistency (Chromium)

### Tipografia
- ✅ Font family Sofia Pro sendo usada
- ✅ Form fields usam grid/flex layout no desktop

---

## ❌ O Que Precisa Ajustar (7 testes falhando)

### 1. Background Color (#F8F8F8)
**Status**: ❌ Falhando
**Esperado**: `rgb(248, 248, 248)`
**Atual**: `lab(100 0 0)` (white)

**Problema**: O body não está usando a cor de background correta do Figma.

**Solução**:
```css
/* tailwind.config.ts ou globals.css */
body {
  background-color: #F8F8F8;
}
```

**Arquivo**: `src/app/globals.css` ou `src/app/layout.tsx`

---

### 2. Logo Dimensions
**Status**: ❌ Falhando
**Esperado**: 84px de largura mínima
**Atual**: 64.5px

**Problema**: Logo está menor que o especificado no Figma.

**Solução**:
```tsx
<img
  alt="Torra"
  width={84}
  height={38}
  className="h-[38px] w-[84px]" // ou w-auto
  src="/logo.png"
/>
```

**Arquivo**: `src/components/header.tsx` ou similar

---

### 3. Campos de Formulário Faltando
**Status**: ❌ Falhando
**Esperado**: Campo `rg` (e outros)
**Atual**: Campo não encontrado

**Problema**: Step 1 não tem todos os campos do Figma.

**Campos Faltando**:
- `rg` → `numeroRG` (RG number)
- Possivelmente outros campos opcionais

**Solução**: Adicionar todos os campos do design Step 1:
```tsx
<Input name="numeroRG" label="RG" required />
<Input name="dataEmissaoRG" label="Data de Emissão RG" />
<Input name="orgaoEmissor" label="Órgão Emissor" />
<Input name="estadoCivil" label="Estado Civil" type="select" />
<Input name="grauEscolaridade" label="Escolaridade" type="select" />
```

**Arquivo**: Formulário do Step 1

---

### 4. Botão de Ação Principal
**Status**: ❌ Falhando
**Esperado**: Botão com texto "Próximo", "Continuar" ou "Salvar"
**Atual**: Botão não encontrado (timeout)

**Problema**: Botão de ação pode estar com nome diferente ou não visível.

**Solução**: Verificar se o botão existe e tem o texto correto:
```tsx
<Button
  type="submit"
  className="bg-[#FF5101] text-white"
>
  Próximo
</Button>
```

**Arquivo**: Formulário do Step 1

---

### 5. Cores dos Elementos (Torra Orange)
**Status**: ❌ Falhando
**Esperado**: `rgb(255, 81, 1)` #FF5101
**Atual**: Cor não encontrada ou diferente

**Problema**: Botão "Começar" não tem a cor laranja correta.

**Solução**:
```tsx
// Verificar em tailwind.config.ts
colors: {
  'torra-orange': '#FF5101',
  'torra-dark-blue': '#37375B',
}

// Usar nas classes
<Button className="bg-torra-orange hover:bg-torra-orange/90">
  Começar
</Button>
```

**Arquivo**: `tailwind.config.ts` e componentes de botão

---

### 6. Heading Font Size
**Status**: ❌ Falhando
**Esperado**: 32px (Heading 1 do Figma)
**Atual**: Tamanho diferente

**Problema**: H1 não está com o tamanho exato do Figma.

**Solução**:
```tsx
<h1 className="text-[32px] leading-[38px] font-sofia">
  Bem vindo(a)!
</h1>
```

Ou no Tailwind config:
```ts
fontSize: {
  'heading-1': ['32px', '38px'], // [size, line-height]
}
```

**Arquivo**: Heading components

---

### 7. Desktop Padding
**Status**: ❌ Falhando
**Esperado**: 135px de padding lateral (desktop)
**Atual**: Padding menor que 50px

**Problema**: Container desktop não tem padding suficiente.

**Solução**:
```tsx
<main className="px-4 md:px-8 lg:px-[135px]">
  {children}
</main>
```

**Arquivo**: Layout principal

---

## 🎯 Priorização de Correções

### Alta Prioridade (Impacto Visual Alto)
1. ✅ **Background color** (#F8F8F8) - Quick fix
2. ✅ **Torra Orange button** (#FF5101) - Quick fix
3. ✅ **Logo dimensions** (84x38) - Quick fix
4. ⚠️ **Campos faltando no formulário** - Medium effort

### Média Prioridade
5. ⚠️ **Botão de ação principal** - Verificar se existe
6. ⚠️ **Heading 1 font size** (32px) - Quick fix
7. ⚠️ **Desktop padding** (135px) - Quick fix

---

## 📝 Plano de Ação

### Fase 1: Cores e Tipografia (30 min)
```bash
# Arquivos a modificar:
- src/app/globals.css         # Body background
- tailwind.config.ts           # Cores Torra
- src/components/Button.tsx    # Botão laranja
- src/app/page.tsx            # Heading sizes
```

### Fase 2: Layout e Spacing (30 min)
```bash
# Arquivos a modificar:
- src/app/layout.tsx          # Desktop padding
- src/components/Header.tsx   # Logo dimensions
```

### Fase 3: Formulário Step 1 Completo (2h)
```bash
# Arquivos a modificar:
- src/app/onboarding/1/page.tsx    # Adicionar campos
- src/stores/onboarding-store.ts   # Adicionar fields ao state
- Criar validators para novos campos
```

### Fase 4: Validação (30 min)
```bash
# Rodar testes novamente
pnpm playwright test e2e/figma-visual-tests.spec.ts
```

---

## 🔧 Snippets de Código para Correções Rápidas

### 1. Background Color
```css
/* src/app/globals.css */
body {
  background-color: #F8F8F8;
}
```

### 2. Torra Colors no Tailwind
```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'torra-orange': '#FF5101',
        'torra-dark-blue': '#37375B',
        'torra-light-bg': '#F8F8F8',
        'torra-accent': '#FBE2D7',
      },
    },
  },
}
```

### 3. Logo com Dimensões Corretas
```tsx
<Image
  alt="Torra"
  src="/logo.png"
  width={84}
  height={38}
  className="h-[38px] w-auto"
/>
```

### 4. Heading 1 (32px)
```tsx
<h1 className="text-[32px] leading-[38px] font-sofia text-center text-torra-dark-blue">
  Bem vindo(a)!<br />
  É muito bom ter você com a gente.
</h1>
```

### 5. Botão Laranja
```tsx
<Button className="w-full bg-torra-orange hover:bg-torra-orange/90 text-white px-8 py-4">
  Começar
</Button>
```

### 6. Desktop Container Padding
```tsx
<div className="container px-4 md:px-8 lg:px-[135px] mx-auto">
  {children}
</div>
```

---

## 📈 Progresso Esperado Após Correções

| Categoria | Antes | Depois (Estimado) |
|-----------|-------|-------------------|
| Layout | 75% | 95% |
| Cores | 60% | 100% |
| Tipografia | 80% | 100% |
| Formulário | 40% | 100% (Step 1) |
| **TOTAL** | **76%** | **95%+** |

---

## 🎨 Checklist Final de Alinhamento

### Cores
- [ ] Background: #F8F8F8
- [ ] Primary Orange: #FF5101
- [ ] Dark Blue: #37375B
- [ ] Neutral Gray: #5F5F5F
- [ ] White: #FFFFFF

### Tipografia
- [ ] Font: Sofia Pro
- [ ] H1: 32px / 38px line-height
- [ ] H4: 16px / 24px line-height
- [ ] H5 (buttons): 14px / 16px line-height

### Layout Mobile (412px)
- [ ] Padding: 16px horizontal
- [ ] Gap: 24px entre elementos
- [ ] Logo: 84x38px
- [ ] Status bar: 52px
- [ ] Bottom nav: 24px

### Layout Desktop (1440px)
- [ ] Padding: 135px horizontal
- [ ] Gap: 48-96px entre seções
- [ ] Header: 60-80px altura

### Componentes
- [ ] Botão primário: Orange com white text
- [ ] Inputs: Border radius, padding adequado
- [ ] Step indicator: Visível e funcional
- [ ] Logo: Dimensões corretas
- [ ] Ícone foguete: Presente na home

### Formulário Step 1
- [ ] Nome Completo ✅
- [ ] CPF ✅
- [ ] RG ❌ (adicionar)
- [ ] Data de Nascimento ✅
- [ ] Celular ✅
- [ ] Email ✅
- [ ] Campos opcionais (nomeSocial, pais, etc.)

---

## 🚀 Próximos Passos

1. **Implementar correções de Fase 1** (cores e tipografia)
2. **Implementar correções de Fase 2** (layout e spacing)
3. **Completar formulário Step 1** com todos os campos
4. **Rodar testes novamente** para validar
5. **Implementar Steps 2-10** seguindo mesmo padrão
6. **Adicionar testes visuais para cada step**

---

**Estimativa Total**: 4-6 horas para 95%+ de alinhamento com Figma (Step 1 completo)

**Nota**: Este relatório foi gerado automaticamente a partir dos testes E2E que validam o design do Figma contra a implementação atual.
