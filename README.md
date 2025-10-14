# 🎯 Torra Portal Admissões

Portal de admissão de colaboradores da Torra, um sistema completo de onboarding com 10 etapas de cadastro, integrado com backend .NET e armazenamento de documentos.

[![Deploy](https://github.com/hidedevelopment/torra-portal-admissoes/actions/workflows/vercel-deploy.yml/badge.svg)](https://github.com/hidedevelopment/torra-portal-admissoes/actions/workflows/vercel-deploy.yml)
[![CI](https://github.com/hidedevelopment/torra-portal-admissoes/actions/workflows/ci.yml/badge.svg)](https://github.com/hidedevelopment/torra-portal-admissoes/actions/workflows/ci.yml)
[![E2E Tests](https://img.shields.io/badge/E2E%20Tests-70%2B-green)](./e2e)

## 🚀 Stack Tecnológica

### Frontend
- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.1
- **TypeScript**: 5.9.2
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: Zustand 5.0.8 + localStorage persistence
- **Forms**: React Hook Form 7.63.0 + Zod 4.1.11
- **HTTP Client**: Axios 1.12.2
- **Data Fetching**: TanStack Query 5.90.2
- **Testing**: Playwright 1.56.0 (70+ E2E tests)
- **Code Quality**: Biome 2.2.4 (linting + formatting)

### Backend (API)
- **.NET**: 9.0
- **Database**: SQL Server (via Entity Framework Core)
- **Storage**: Cloudflare R2 (S3-compatible)
- **URL**: https://torra-admissoes.mahina.cloud
- **Repository**: https://github.com/hidedevelopment/TorraAdmissoes

## 📋 Funcionalidades

### 10 Etapas de Admissão

1. **Dados Pessoais** - Nome, CPF, RG, data de nascimento, contato
2. **Dependentes** - Cadastro de dependentes (nome, CPF, relação)
3. **Endereço** - CEP, logradouro, número, complemento, cidade, estado
4. **Dados Contratuais** - Cargo, departamento, data de admissão, salário
5. **Dados PCD** - Informações sobre pessoa com deficiência
6. **Vale Transporte** - Linhas de transporte utilizadas
7. **Dados Estrangeiro** - Passaporte, visto (se aplicável)
8. **Dados Aprendiz** - Instituição de ensino, curso (se aplicável)
9. **Dados Bancários** - Banco, agência, conta, tipo de conta
10. **Documentos** - Upload de documentos obrigatórios (RG, CPF, etc.)

### Recursos Técnicos

- ✅ **Validação Brasileira**: CPF, RG, CEP, telefone
- ✅ **Persistência**: Dados salvos automaticamente no localStorage
- ✅ **Navegação Inteligente**: Controle de progresso e acesso a etapas
- ✅ **Upload de Arquivos**: Suporte a múltiplos formatos (PDF, JPG, PNG)
- ✅ **Integração com API**: Comunicação assíncrona com backend
- ✅ **Tratamento de Erros**: Mensagens em português e retry automático
- ✅ **Responsivo**: Mobile-first design
- ✅ **Acessibilidade**: Navegação por teclado e screen readers
- ✅ **Testes E2E**: 70+ testes automatizados com Playwright

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 20.x ou superior
- pnpm 9.x
- Git

### Setup Inicial

```bash
# Clone o repositório
git clone git@github.com:hidedevelopment/torra-portal-admissoes.git
cd torra-portal-admissoes

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações

# Inicie o servidor de desenvolvimento
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Variáveis de Ambiente

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://torra-admissoes.mahina.cloud
```

## 🧪 Testes

### Executar Testes E2E

```bash
# Instalar browsers do Playwright (primeira vez)
pnpm exec playwright install

# Executar todos os testes
pnpm exec playwright test

# Executar em modo UI (recomendado)
pnpm exec playwright test --ui

# Executar teste específico
pnpm exec playwright test e2e/onboarding-flow.spec.ts

# Ver relatório
pnpm exec playwright show-report
```

### Cobertura de Testes

- **Total**: 70+ testes E2E
- **Happy Path**: Fluxo completo de 10 etapas
- **Validação**: Todos os campos com formatos brasileiros
- **API**: Testes de integração com backend
- **Edge Cases**: Mobile, acessibilidade, navegação
- **Individual**: Testes específicos para cada etapa

Ver mais em: [e2e/README.md](./e2e/README.md)

## 📦 Build e Deploy

### Build Local

```bash
# Build de produção
pnpm build

# Executar build localmente
pnpm start
```

### Deploy Automático (CI/CD)

**Vercel** (Produção):
- Push para `main` → Deploy automático para produção
- Pull Requests → Deploy de preview com URL único

**GitHub Pages** (Preview estático):
- Push para `main` → Deploy para GitHub Pages

Ver guia completo: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Deploy Manual

```bash
# Instalar Vercel CLI
pnpm add -g vercel

# Deploy para produção
vercel --prod
```

## 📚 Documentação

### Guias Principais

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guia completo de deployment
- **[INTEGRATION-COMPLETE.md](./INTEGRATION-COMPLETE.md)** - Status da integração
- **[src/services/README.md](./src/services/README.md)** - Uso da API
- **[src/services/INTEGRATION_GUIDE.md](./src/services/INTEGRATION_GUIDE.md)** - Integração passo a passo
- **[e2e/README.md](./e2e/README.md)** - Documentação dos testes

### Estrutura do Projeto

```
torra-portal-admissoes/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   ├── hooks/            # Custom hooks (useAdmissao)
│   ├── services/         # Serviços de API
│   │   ├── api.ts        # Configuração Axios
│   │   ├── admissao.service.ts
│   │   └── admissao.mappers.ts
│   ├── stores/           # Zustand stores
│   └── types/            # TypeScript types
├── e2e/                  # Testes E2E Playwright
│   ├── fixtures/         # Dados de teste
│   ├── helpers/          # Helper classes (POM)
│   └── individual-steps/ # Testes por etapa
├── .github/workflows/    # CI/CD pipelines
└── public/               # Assets estáticos
```

## 🔗 Integração com Backend

### Endpoints da API

Todas as requisições são feitas para: `https://torra-admissoes.mahina.cloud`

**Admissão (10 etapas):**
```
POST /api/admissao/{colaboradorId}/step1/dados-gerais
POST /api/admissao/{colaboradorId}/step2/dependentes
POST /api/admissao/{colaboradorId}/step3/endereco
POST /api/admissao/{colaboradorId}/step4/dados-contratuais
POST /api/admissao/{colaboradorId}/step5/dados-pcd
POST /api/admissao/{colaboradorId}/step6/vale-transporte
POST /api/admissao/{colaboradorId}/step7/dados-estrangeiro
POST /api/admissao/{colaboradorId}/step8/dados-aprendiz
POST /api/admissao/{colaboradorId}/step9/dados-bancarios
POST /api/documentos/upload/{colaboradorId}
```

**Consultas:**
```
GET /api/admissao/{colaboradorId}
GET /api/documentos/{colaboradorId}
GET /health
```

### Uso dos Hooks

```typescript
import { useAdmissao } from '@/hooks/useAdmissao';

function Step1Form() {
  const colaboradorId = 'user-123'; // De autenticação

  const {
    submitDadosGerais,
    submitDadosGeraisLoading,
    submitDadosGeraisError,
    colaborador
  } = useAdmissao(colaboradorId);

  const onSubmit = async (data) => {
    await submitDadosGerais(data);
    // Automático: store atualizado, navegação para próxima etapa
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

Ver exemplos completos em: [src/services/INTEGRATION_GUIDE.md](./src/services/INTEGRATION_GUIDE.md)

## 🎨 Formatação e Linting

```bash
# Verificar problemas
pnpm lint

# Corrigir automaticamente
pnpm format

# Verificar tipos TypeScript
pnpm tsc --noEmit
```

## 🚦 Status do Projeto

### ✅ Completo

- [x] Estrutura base do projeto Next.js
- [x] Configuração de Tailwind CSS e componentes UI
- [x] Zustand store com persistência
- [x] Serviço de integração com API (10 etapas)
- [x] Hooks React com TanStack Query
- [x] Mapeadores de dados (brasileiro ↔ API)
- [x] Suite de testes E2E (70+ testes)
- [x] CI/CD (GitHub Actions + Vercel)
- [x] Documentação completa
- [x] Form Step 1 (Dados Pessoais) implementado

### ⏳ Em Desenvolvimento

- [ ] Forms Steps 2-10 (usar Step 1 como referência)
- [ ] Sistema de autenticação
- [ ] Notificações toast
- [ ] Lookup de CEP (ViaCEP API)
- [ ] Validação de uploads
- [ ] Testes visuais (screenshots)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Projeto privado - Torra Company

## 👥 Time

- **Desenvolvimento**: Hide Development
- **Backend**: .NET 9 API com Clean Architecture
- **Frontend**: Next.js 15 com TypeScript

## 🔗 Links Úteis

- **Frontend Production**: https://torra-portal-admissoes.vercel.app (após deploy)
- **Backend API**: https://torra-admissoes.mahina.cloud
- **GitHub Frontend**: https://github.com/hidedevelopment/torra-portal-admissoes
- **GitHub Backend**: https://github.com/hidedevelopment/TorraAdmissoes
- **Playwright Docs**: https://playwright.dev
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique a documentação em `DEPLOYMENT.md`
2. Revise os logs de CI/CD no GitHub Actions
3. Consulte os guias em `src/services/` e `e2e/`

---

**Última Atualização**: 14 de outubro de 2025
**Versão**: 1.0.0

🚀 Generated with [Claude Code](https://claude.com/claude-code)
