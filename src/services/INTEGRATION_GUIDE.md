# API Integration Quick Start Guide

## Step-by-Step Integration

### 1. Get the Colaborador ID

The `colaboradorId` is required for all API calls. This should come from:
- URL parameters (e.g., `/onboarding/[colaboradorId]`)
- Authentication context after login
- Initial registration flow

Example:
```typescript
// In a Next.js page or component
import { useParams } from 'next/navigation';

function OnboardingPage() {
  const params = useParams();
  const colaboradorId = params.colaboradorId as string;

  // Use the colaboradorId in your hook
  const admissao = useAdmissao(colaboradorId);
}
```

### 2. Using the Hook in a Step Component

Example for Step 1 (Personal Data):

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAdmissao } from "@/hooks/useAdmissao";
import { mapPersonalDataToDto } from "@/services/admissao.mappers";
import { useOnboardingStore } from "@/stores/onboarding-store";
import type { PersonalData } from "@/stores/onboarding-store";

// Define Zod schema
const personalDataSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  rg: z.string().min(1, "RG é obrigatório"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  maritalStatus: z.string().min(1, "Estado civil é obrigatório"),
  gender: z.string().min(1, "Gênero é obrigatório"),
  nationality: z.string().min(1, "Nacionalidade é obrigatória"),
});

export function PersonalDataStep({ colaboradorId }: { colaboradorId: string }) {
  // Get data from Zustand store (for pre-filling)
  const { formData } = useOnboardingStore();

  // Get API mutation from custom hook
  const { submitDadosGerais, submitDadosGeraisLoading, submitDadosGeraisError } =
    useAdmissao(colaboradorId);

  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: formData.personalData, // Pre-fill from store
  });

  const onSubmit = async (data: PersonalData) => {
    try {
      // Transform to DTO format
      const dto = mapPersonalDataToDto(data);

      // Submit to API
      const response = await submitDadosGerais(dto);

      // Success handling (store update is automatic)
      console.log("Dados salvos:", response.message);

      // Navigate to next step (current step is auto-incremented)
      // router.push('/onboarding/step-2');
    } catch (error) {
      // Error is already handled by the hook and available in submitDadosGeraisError
      console.error("Erro ao salvar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fullName">Nome Completo</label>
        <input
          {...register("fullName")}
          type="text"
          id="fullName"
          className="w-full border rounded px-3 py-2"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="cpf">CPF</label>
        <input
          {...register("cpf")}
          type="text"
          id="cpf"
          placeholder="00000000000"
          className="w-full border rounded px-3 py-2"
        />
        {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Add other fields... */}

      {/* Show API error if exists */}
      {submitDadosGeraisError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {submitDadosGeraisError.message}
        </div>
      )}

      <button
        type="submit"
        disabled={submitDadosGeraisLoading}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {submitDadosGeraisLoading ? "Salvando..." : "Continuar"}
      </button>
    </form>
  );
}
```

### 3. Handling Dependents (Array of Items)

Example for Step 2 (Dependents):

```typescript
"use client";

import { useState } from "react";
import { useAdmissao } from "@/hooks/useAdmissao";
import { mapDependentsToDto } from "@/services/admissao.mappers";
import { useOnboardingStore } from "@/stores/onboarding-store";
import type { Dependent } from "@/stores/onboarding-store";

export function DependentsStep({ colaboradorId }: { colaboradorId: string }) {
  const { formData, addDependent, removeDependent } = useOnboardingStore();
  const { submitDependentes, submitDependentesLoading } = useAdmissao(colaboradorId);

  const [newDependent, setNewDependent] = useState<Partial<Dependent>>({});

  const handleAddDependent = () => {
    if (newDependent.name && newDependent.cpf && newDependent.birthDate) {
      const dependent: Dependent = {
        id: crypto.randomUUID(),
        name: newDependent.name,
        cpf: newDependent.cpf,
        birthDate: newDependent.birthDate,
        relationship: newDependent.relationship || "",
      };

      addDependent(dependent);
      setNewDependent({}); // Reset form
    }
  };

  const handleSubmit = async () => {
    try {
      const dto = mapDependentsToDto(formData.dependents);
      await submitDependentes(dto);
      // Automatically advances to next step
    } catch (error) {
      console.error("Erro ao salvar dependentes:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form to add new dependent */}
      <div className="border rounded p-4 space-y-4">
        <h3>Adicionar Dependente</h3>
        <input
          type="text"
          placeholder="Nome"
          value={newDependent.name || ""}
          onChange={(e) => setNewDependent({ ...newDependent, name: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="CPF"
          value={newDependent.cpf || ""}
          onChange={(e) => setNewDependent({ ...newDependent, cpf: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="button"
          onClick={handleAddDependent}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      {/* List of added dependents */}
      <div className="space-y-2">
        {formData.dependents.map((dep) => (
          <div key={dep.id} className="flex items-center justify-between border rounded p-3">
            <div>
              <p className="font-medium">{dep.name}</p>
              <p className="text-sm text-gray-600">CPF: {dep.cpf}</p>
            </div>
            <button
              onClick={() => removeDependent(dep.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitDependentesLoading || formData.dependents.length === 0}
        className="w-full bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {submitDependentesLoading ? "Salvando..." : "Continuar"}
      </button>
    </div>
  );
}
```

### 4. Document Upload (Step 10)

```typescript
"use client";

import { useState } from "react";
import { useAdmissao } from "@/hooks/useAdmissao";

export function DocumentUploadStep({ colaboradorId }: { colaboradorId: string }) {
  const {
    uploadDocumento,
    uploadDocumentoLoading,
    documentos,
    documentosLoading,
  } = useAdmissao(colaboradorId);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = async (tipoDocumento: string) => {
    if (!selectedFile) return;

    try {
      await uploadDocumento({
        file: selectedFile,
        tipoDocumento,
        stepId: 10,
      });

      setSelectedFile(null);
      alert("Documento enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar documento:", error);
    }
  };

  if (documentosLoading) {
    return <div>Carregando documentos...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2">Selecione o documento</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      {selectedFile && (
        <div className="space-y-2">
          <p>Arquivo selecionado: {selectedFile.name}</p>

          <div className="space-x-2">
            <button
              onClick={() => handleFileUpload("RG")}
              disabled={uploadDocumentoLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enviar como RG
            </button>

            <button
              onClick={() => handleFileUpload("CPF")}
              disabled={uploadDocumentoLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enviar como CPF
            </button>
          </div>
        </div>
      )}

      {/* List uploaded documents */}
      <div className="mt-6">
        <h3 className="font-bold mb-4">Documentos Enviados</h3>
        <div className="space-y-2">
          {documentos?.map((doc) => (
            <div key={doc.id} className="border rounded p-3">
              <p className="font-medium">{doc.nome}</p>
              <p className="text-sm text-gray-600">Tipo: {doc.tipo}</p>
              <p className="text-sm text-gray-600">Status: {doc.status}</p>
              {doc.url && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Ver documento
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 5. Using the Simplified Hook (Alternative)

For simpler use cases, use `useStepSubmission`:

```typescript
import { useStepSubmission } from "@/hooks/useAdmissao";
import { mapAddressToDto } from "@/services/admissao.mappers";

export function AddressStep({ colaboradorId }: { colaboradorId: string }) {
  const { submit, isLoading, error } = useStepSubmission(3, colaboradorId);

  const handleSubmit = async (data: Address) => {
    const dto = mapAddressToDto(data);
    await submit(dto);
    // Automatically advances to step 4
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <p className="text-red-500">{error.message}</p>}
      <button disabled={isLoading}>
        {isLoading ? "Salvando..." : "Continuar"}
      </button>
    </form>
  );
}
```

## Important Notes

### Date Formatting
The API expects dates in ISO 8601 format (YYYY-MM-DD). Use the mapper utilities:

```typescript
import { formatDateToISO, formatDateFromISO } from "@/services/admissao.mappers";

// When sending to API
const isoDate = formatDateToISO("31/12/1990"); // "1990-12-31"

// When displaying to user
const brDate = formatDateFromISO("1990-12-31"); // "31/12/1990"
```

### Brazilian Document Formatting
Use the provided utilities for CPF, CEP, and phone formatting:

```typescript
import { cleanCPF, formatCPF, cleanCEP, formatCEP } from "@/services/admissao.mappers";

// Clean before sending to API
const cleanedCPF = cleanCPF("123.456.789-00"); // "12345678900"

// Format for display
const formattedCPF = formatCPF("12345678900"); // "123.456.789-00"
```

### Error Handling
All errors are typed as `ApiErrorResponse`:

```typescript
try {
  await submitDadosGerais(dto);
} catch (error) {
  const apiError = error as ApiErrorResponse;

  // Show main error message
  console.error(apiError.message);

  // Show field-specific errors
  apiError.errors?.forEach(err => console.error(err));

  // Check status code
  if (apiError.statusCode === 422) {
    // Handle validation errors
  }
}
```

### Authentication
When authentication is implemented:

```typescript
// After successful login
localStorage.setItem('auth_token', token);

// The API will automatically include the token in all requests
// To logout:
localStorage.removeItem('auth_token');
```

### TanStack Query Devtools
The devtools are already configured. Press the TanStack Query icon in the bottom-left corner of your browser to debug queries and mutations.

## Testing the Integration

### 1. Check Network Requests
Open browser DevTools → Network tab to see API requests and responses

### 2. Monitor TanStack Query
Use the TanStack Query Devtools to see cache state and mutations

### 3. Check Zustand Store
Add this to your component for debugging:

```typescript
const store = useOnboardingStore();
console.log('Current store state:', store);
```

## Common Patterns

### Loading States
```typescript
const { submitDadosGerais, submitDadosGeraisLoading } = useAdmissao(colaboradorId);

return (
  <button disabled={submitDadosGeraisLoading}>
    {submitDadosGeraisLoading ? "Salvando..." : "Salvar"}
  </button>
);
```

### Error Display
```typescript
const { submitDadosGerais, submitDadosGeraisError } = useAdmissao(colaboradorId);

return (
  <>
    {submitDadosGeraisError && (
      <div className="alert alert-error">
        {submitDadosGeraisError.message}
      </div>
    )}
  </>
);
```

### Refetching Data
```typescript
const { refetchColaborador, refetchDocumentos } = useAdmissao(colaboradorId);

// Manually refetch
<button onClick={() => refetchColaborador()}>Atualizar</button>
```

## Next Steps

1. Create a layout component that wraps all steps with the colaboradorId
2. Implement navigation between steps based on `completedSteps`
3. Add form validation schemas for each step
4. Implement progress tracking UI
5. Add success/error toast notifications
6. Handle authentication and session management
