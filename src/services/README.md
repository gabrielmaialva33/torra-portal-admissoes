# API Integration Services

This directory contains all API integration services for the Torra Portal Admissões project.

## Files Overview

### `api.ts`
Core Axios configuration with interceptors for:
- Request/response logging
- Authentication token injection
- Global error handling
- Portuguese error messages

### `api.types.ts`
TypeScript type definitions for:
- All API DTOs (Data Transfer Objects)
- API responses and error structures
- Request/response interfaces

### `admissao.service.ts`
Service class containing all admission API endpoints:
- 10 step submission methods
- Document upload/management
- Colaborador data retrieval
- CEP validation

### `admissao.mappers.ts`
Data transformation utilities:
- Convert between Zustand store format and API DTOs
- Field name translations (English to Portuguese)
- Date formatting helpers
- Brazilian document formatting (CPF, CEP, phone)

### `useAdmissao.ts` (in hooks/)
Custom React hook using TanStack Query:
- Automatic Zustand store synchronization
- Query caching and refetching
- Loading and error states
- Optimistic updates

## Usage Examples

### Basic Step Submission

```typescript
import { useAdmissao } from '@/hooks/useAdmissao';
import { mapPersonalDataToDto } from '@/services/admissao.mappers';

function PersonalDataForm() {
  const colaboradorId = "uuid-here";
  const { submitDadosGerais, submitDadosGeraisLoading } = useAdmissao(colaboradorId);

  const handleSubmit = async (data: PersonalData) => {
    try {
      const dto = mapPersonalDataToDto(data);
      const response = await submitDadosGerais(dto);
      console.log('Success:', response.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={submitDadosGeraisLoading}>
        {submitDadosGeraisLoading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}
```

### Using the Simplified Step Hook

```typescript
import { useStepSubmission } from '@/hooks/useAdmissao';
import { mapAddressToDto } from '@/services/admissao.mappers';

function AddressForm() {
  const colaboradorId = "uuid-here";
  const { submit, isLoading, error } = useStepSubmission(3, colaboradorId);

  const handleSubmit = async (data: Address) => {
    const dto = mapAddressToDto(data);
    await submit(dto);
    // Step automatically advances on success
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error.message}</p>}
      <button disabled={isLoading}>Continuar</button>
    </form>
  );
}
```

### Document Upload

```typescript
import { useAdmissao } from '@/hooks/useAdmissao';

function DocumentUpload() {
  const colaboradorId = "uuid-here";
  const { uploadDocumento, uploadDocumentoLoading } = useAdmissao(colaboradorId);

  const handleFileUpload = async (file: File) => {
    try {
      const response = await uploadDocumento({
        file,
        tipoDocumento: 'RG',
        stepId: 10,
      });
      console.log('Uploaded:', response.data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
      disabled={uploadDocumentoLoading}
    />
  );
}
```

### Multiple Documents Upload

```typescript
import { useAdmissao } from '@/hooks/useAdmissao';

function MultipleDocumentUpload() {
  const colaboradorId = "uuid-here";
  const { uploadMultipleDocumentos } = useAdmissao(colaboradorId);

  const handleMultipleUpload = async (files: File[]) => {
    const documents = files.map((file, index) => ({
      file,
      tipoDocumento: `DOC_${index}`,
      stepId: 10,
    }));

    try {
      const response = await uploadMultipleDocumentos(documents);
      console.log(`${response.data.length} documentos enviados`);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <input
      type="file"
      multiple
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        handleMultipleUpload(files);
      }}
    />
  );
}
```

### Fetching Colaborador Data

```typescript
import { useAdmissao } from '@/hooks/useAdmissao';

function ColaboradorProfile() {
  const colaboradorId = "uuid-here";
  const {
    colaborador,
    colaboradorLoading,
    colaboradorError,
    refetchColaborador,
  } = useAdmissao(colaboradorId);

  if (colaboradorLoading) return <div>Carregando...</div>;
  if (colaboradorError) return <div>Erro: {colaboradorError.message}</div>;

  return (
    <div>
      <h1>{colaborador?.nomeCompleto}</h1>
      <p>CPF: {colaborador?.cpf}</p>
      <p>Step atual: {colaborador?.stepAtual}</p>
      <button onClick={() => refetchColaborador()}>Atualizar</button>
    </div>
  );
}
```

### Direct Service Usage (without hook)

```typescript
import { AdmissaoService } from '@/services/admissao.service';
import { mapBankDataToDto } from '@/services/admissao.mappers';

async function submitBankData(colaboradorId: string, data: BankData) {
  const dto = mapBankDataToDto(data);

  try {
    const response = await AdmissaoService.submitDadosBancarios(colaboradorId, dto);

    if (response.success) {
      console.log('Dados bancários salvos:', response.message);
      return response.data;
    }
  } catch (error) {
    console.error('Erro ao salvar:', error);
    throw error;
  }
}
```

### CEP Validation

```typescript
import { useAdmissao } from '@/hooks/useAdmissao';

function AddressFormWithCEP() {
  const { validateCEP, validateCEPLoading } = useAdmissao('colaborador-id');

  const handleCEPBlur = async (cep: string) => {
    try {
      const response = await validateCEP(cep);
      const address = response.data;

      // Auto-fill address fields
      setStreet(address.logradouro);
      setNeighborhood(address.bairro);
      setCity(address.cidade);
      setState(address.estado);
    } catch (error) {
      console.error('CEP inválido');
    }
  };

  return (
    <input
      type="text"
      placeholder="CEP"
      onBlur={(e) => handleCEPBlur(e.target.value)}
      disabled={validateCEPLoading}
    />
  );
}
```

### Error Handling

```typescript
import { useAdmissao } from '@/hooks/useAdmissao';
import type { ApiErrorResponse } from '@/types/api.types';

function FormWithErrorHandling() {
  const { submitDadosGerais } = useAdmissao('colaborador-id');

  const handleSubmit = async (data: DadosGeraisDto) => {
    try {
      await submitDadosGerais(data);
    } catch (error) {
      const apiError = error as ApiErrorResponse;

      // Show error message
      console.error(apiError.message);

      // Show field-specific errors
      if (apiError.errors) {
        apiError.errors.forEach(err => console.error(err));
      }

      // Handle specific status codes
      if (apiError.statusCode === 422) {
        // Show validation errors
      }
    }
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

## Integration with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAdmissao } from '@/hooks/useAdmissao';
import { mapPersonalDataToDto } from '@/services/admissao.mappers';

const personalDataSchema = z.object({
  fullName: z.string().min(3),
  cpf: z.string().length(11),
  email: z.string().email(),
  // ... other fields
});

type PersonalDataForm = z.infer<typeof personalDataSchema>;

function PersonalDataStep() {
  const { submitDadosGerais, submitDadosGeraisLoading } = useAdmissao('id');

  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDataForm>({
    resolver: zodResolver(personalDataSchema),
  });

  const onSubmit = async (data: PersonalDataForm) => {
    const dto = mapPersonalDataToDto(data);
    await submitDadosGerais(dto);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('fullName')} />
      {errors.fullName && <span>{errors.fullName.message}</span>}

      <button type="submit" disabled={submitDadosGeraisLoading}>
        Salvar
      </button>
    </form>
  );
}
```

## Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://torra-admissoes.mahina.cloud
```

Then update `api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://torra-admissoes.mahina.cloud";
```

## Authentication

When authentication is implemented, store the token:

```typescript
// After login
localStorage.setItem('auth_token', token);

// The api.ts interceptor will automatically add it to requests
```

## Notes

- All mutations automatically update the Zustand store
- TanStack Query handles caching and refetching
- Error messages are in Portuguese for user-facing display
- Date fields expect ISO 8601 format (YYYY-MM-DD)
- Use mapper functions to ensure correct field names
- Document uploads use FormData with multipart/form-data
- Network errors are handled gracefully with fallback messages
