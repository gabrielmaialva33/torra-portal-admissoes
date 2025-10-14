import { useMutation, useQuery } from "@tanstack/react-query";
import { AdmissaoService } from "@/services/admissao.service";
import { useOnboardingStore } from "@/stores/onboarding-store";
import type {
  ApiResponse,
  ColaboradorDto,
  DadosAprendizDto,
  DadosBancariosDto,
  DadosContratuaisDto,
  DadosEstrangeiroDto,
  DadosGeraisDto,
  DadosPcdDto,
  DependentesDto,
  DocumentoResponseDto,
  EnderecoDto,
  ValeTransporteDto,
} from "@/types/api.types";

// Query Keys for cache management
export const admissaoKeys = {
  all: ["admissao"] as const,
  colaborador: (id: string) =>
    [...admissaoKeys.all, "colaborador", id] as const,
  documentos: (id: string) => [...admissaoKeys.all, "documentos", id] as const,
};

/**
 * Hook for managing admission API calls with TanStack Query
 * Automatically syncs with Zustand store for local state management
 */
export function useAdmissao(colaboradorId: string) {
  const { markStepComplete, setCurrentStep, updateFormData, addDocument } =
    useOnboardingStore();

  // Query: Get colaborador data
  const colaboradorQuery = useQuery<ApiResponse<ColaboradorDto>>({
    queryKey: admissaoKeys.colaborador(colaboradorId),
    queryFn: () => AdmissaoService.getColaborador(colaboradorId),
    enabled: !!colaboradorId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Query: Get documents
  const documentosQuery = useQuery<ApiResponse<DocumentoResponseDto[]>>({
    queryKey: admissaoKeys.documentos(colaboradorId),
    queryFn: () => AdmissaoService.getDocumentos(colaboradorId),
    enabled: !!colaboradorId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  // Step 1: Personal Data
  const submitDadosGeraisMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    DadosGeraisDto
  >({
    mutationFn: (data) =>
      AdmissaoService.submitDadosGerais(colaboradorId, data),
    onSuccess: (response) => {
      // Update Zustand store
      updateFormData("personalData", {
        fullName: response.data.nomeCompleto || "",
        cpf: response.data.cpf || "",
        email: response.data.email || "",
      });
      markStepComplete(1);
      setCurrentStep(2);
    },
  });

  // Step 2: Dependents
  const submitDependentesMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    DependentesDto
  >({
    mutationFn: (data) =>
      AdmissaoService.submitDependentes(colaboradorId, data),
    onSuccess: () => {
      markStepComplete(2);
      setCurrentStep(3);
    },
  });

  // Step 3: Address
  const submitEnderecoMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    EnderecoDto
  >({
    mutationFn: (data) => AdmissaoService.submitEndereco(colaboradorId, data),
    onSuccess: () => {
      markStepComplete(3);
      setCurrentStep(4);
    },
  });

  // Step 4: Contract Data
  const submitDadosContratuaisMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    DadosContratuaisDto
  >({
    mutationFn: (data) =>
      AdmissaoService.submitDadosContratuais(colaboradorId, data),
    onSuccess: () => {
      markStepComplete(4);
      setCurrentStep(5);
    },
  });

  // Step 5: Disability Data
  const submitDadosPcdMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    DadosPcdDto
  >({
    mutationFn: (data) => AdmissaoService.submitDadosPcd(colaboradorId, data),
    onSuccess: () => {
      markStepComplete(5);
      setCurrentStep(6);
    },
  });

  // Step 6: Transport Voucher
  const submitValeTransporteMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    ValeTransporteDto
  >({
    mutationFn: (data) =>
      AdmissaoService.submitValeTransporte(colaboradorId, data),
    onSuccess: () => {
      markStepComplete(6);
      setCurrentStep(7);
    },
  });

  // Step 7: Foreigner Data
  const submitDadosEstrangeiroMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    DadosEstrangeiroDto
  >({
    mutationFn: (data) =>
      AdmissaoService.submitDadosEstrangeiro(colaboradorId, data),
    onSuccess: () => {
      markStepComplete(7);
      setCurrentStep(8);
    },
  });

  // Step 8: Apprentice Data
  const submitDadosAprendizMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    DadosAprendizDto
  >({
    mutationFn: (data) =>
      AdmissaoService.submitDadosAprendiz(colaboradorId, data),
    onSuccess: () => {
      markStepComplete(8);
      setCurrentStep(9);
    },
  });

  // Step 9: Bank Data
  const submitDadosBancariosMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error,
    DadosBancariosDto
  >({
    mutationFn: (data) =>
      AdmissaoService.submitDadosBancarios(colaboradorId, data),
    onSuccess: () => {
      markStepComplete(9);
      setCurrentStep(10);
    },
  });

  // Step 10: Document Upload
  const uploadDocumentoMutation = useMutation<
    ApiResponse<DocumentoResponseDto>,
    Error,
    { file: File; tipoDocumento: string; stepId: number }
  >({
    mutationFn: ({ file, tipoDocumento, stepId }) =>
      AdmissaoService.uploadDocumento(
        colaboradorId,
        file,
        tipoDocumento,
        stepId,
      ),
    onSuccess: (response) => {
      // Update Zustand store with uploaded document
      addDocument({
        id: response.data.id,
        stepId: response.data.stepId,
        name: response.data.nome,
        type: response.data.tipo,
        url: response.data.url,
        status: response.data.status,
        uploadedAt: response.data.uploadedAt,
      });
    },
  });

  // Multiple documents upload
  const uploadMultipleDocumentosMutation = useMutation<
    ApiResponse<DocumentoResponseDto[]>,
    Error,
    Array<{ file: File; tipoDocumento: string; stepId: number }>
  >({
    mutationFn: (documents) =>
      AdmissaoService.uploadMultipleDocuments(colaboradorId, documents),
    onSuccess: (response) => {
      // Update Zustand store with all uploaded documents
      response.data.forEach((doc) => {
        addDocument({
          id: doc.id,
          stepId: doc.stepId,
          name: doc.nome,
          type: doc.tipo,
          url: doc.url,
          status: doc.status,
          uploadedAt: doc.uploadedAt,
        });
      });
      markStepComplete(10);
    },
  });

  // Delete document
  const deleteDocumentoMutation = useMutation<ApiResponse<void>, Error, string>(
    {
      mutationFn: (documentoId) => AdmissaoService.deleteDocumento(documentoId),
      onSuccess: () => {
        // Refetch documents after deletion
        documentosQuery.refetch();
      },
    },
  );

  // Complete admission
  const completeAdmissionMutation = useMutation<
    ApiResponse<ColaboradorDto>,
    Error
  >({
    mutationFn: () => AdmissaoService.completeAdmission(colaboradorId),
    onSuccess: () => {
      markStepComplete(10);
      // Optionally redirect or show success message
    },
  });

  // CEP Validation
  const validateCEPMutation = useMutation<
    ApiResponse<EnderecoDto>,
    Error,
    string
  >({
    mutationFn: (cep) => AdmissaoService.validateCEP(cep),
  });

  return {
    // Queries
    colaborador: colaboradorQuery.data?.data,
    colaboradorLoading: colaboradorQuery.isLoading,
    colaboradorError: colaboradorQuery.error,

    documentos: documentosQuery.data?.data,
    documentosLoading: documentosQuery.isLoading,
    documentosError: documentosQuery.error,

    // Mutations
    submitDadosGerais: submitDadosGeraisMutation.mutateAsync,
    submitDadosGeraisLoading: submitDadosGeraisMutation.isPending,
    submitDadosGeraisError: submitDadosGeraisMutation.error,

    submitDependentes: submitDependentesMutation.mutateAsync,
    submitDependentesLoading: submitDependentesMutation.isPending,
    submitDependentesError: submitDependentesMutation.error,

    submitEndereco: submitEnderecoMutation.mutateAsync,
    submitEnderecoLoading: submitEnderecoMutation.isPending,
    submitEnderecoError: submitEnderecoMutation.error,

    submitDadosContratuais: submitDadosContratuaisMutation.mutateAsync,
    submitDadosContratuaisLoading: submitDadosContratuaisMutation.isPending,
    submitDadosContratuaisError: submitDadosContratuaisMutation.error,

    submitDadosPcd: submitDadosPcdMutation.mutateAsync,
    submitDadosPcdLoading: submitDadosPcdMutation.isPending,
    submitDadosPcdError: submitDadosPcdMutation.error,

    submitValeTransporte: submitValeTransporteMutation.mutateAsync,
    submitValeTransporteLoading: submitValeTransporteMutation.isPending,
    submitValeTransporteError: submitValeTransporteMutation.error,

    submitDadosEstrangeiro: submitDadosEstrangeiroMutation.mutateAsync,
    submitDadosEstrangeiroLoading: submitDadosEstrangeiroMutation.isPending,
    submitDadosEstrangeiroError: submitDadosEstrangeiroMutation.error,

    submitDadosAprendiz: submitDadosAprendizMutation.mutateAsync,
    submitDadosAprendizLoading: submitDadosAprendizMutation.isPending,
    submitDadosAprendizError: submitDadosAprendizMutation.error,

    submitDadosBancarios: submitDadosBancariosMutation.mutateAsync,
    submitDadosBancariosLoading: submitDadosBancariosMutation.isPending,
    submitDadosBancariosError: submitDadosBancariosMutation.error,

    uploadDocumento: uploadDocumentoMutation.mutateAsync,
    uploadDocumentoLoading: uploadDocumentoMutation.isPending,
    uploadDocumentoError: uploadDocumentoMutation.error,

    uploadMultipleDocumentos: uploadMultipleDocumentosMutation.mutateAsync,
    uploadMultipleDocumentosLoading: uploadMultipleDocumentosMutation.isPending,
    uploadMultipleDocumentosError: uploadMultipleDocumentosMutation.error,

    deleteDocumento: deleteDocumentoMutation.mutateAsync,
    deleteDocumentoLoading: deleteDocumentoMutation.isPending,
    deleteDocumentoError: deleteDocumentoMutation.error,

    completeAdmission: completeAdmissionMutation.mutateAsync,
    completeAdmissionLoading: completeAdmissionMutation.isPending,
    completeAdmissionError: completeAdmissionMutation.error,

    validateCEP: validateCEPMutation.mutateAsync,
    validateCEPLoading: validateCEPMutation.isPending,
    validateCEPError: validateCEPMutation.error,

    // Refetch functions
    refetchColaborador: colaboradorQuery.refetch,
    refetchDocumentos: documentosQuery.refetch,
  };
}

/**
 * Simplified hook for individual step submissions
 * Use this when you only need one specific step mutation
 */
export function useStepSubmission(
  step: number,
  colaboradorId: string,
): {
  submit: (data: unknown) => Promise<ApiResponse<ColaboradorDto>>;
  isLoading: boolean;
  error: Error | null;
} {
  const { markStepComplete, setCurrentStep } = useOnboardingStore();

  const getServiceMethod = () => {
    switch (step) {
      case 1:
        return (data: unknown) =>
          AdmissaoService.submitDadosGerais(
            colaboradorId,
            data as DadosGeraisDto,
          );
      case 2:
        return (data: unknown) =>
          AdmissaoService.submitDependentes(
            colaboradorId,
            data as DependentesDto,
          );
      case 3:
        return (data: unknown) =>
          AdmissaoService.submitEndereco(colaboradorId, data as EnderecoDto);
      case 4:
        return (data: unknown) =>
          AdmissaoService.submitDadosContratuais(
            colaboradorId,
            data as DadosContratuaisDto,
          );
      case 5:
        return (data: unknown) =>
          AdmissaoService.submitDadosPcd(colaboradorId, data as DadosPcdDto);
      case 6:
        return (data: unknown) =>
          AdmissaoService.submitValeTransporte(
            colaboradorId,
            data as ValeTransporteDto,
          );
      case 7:
        return (data: unknown) =>
          AdmissaoService.submitDadosEstrangeiro(
            colaboradorId,
            data as DadosEstrangeiroDto,
          );
      case 8:
        return (data: unknown) =>
          AdmissaoService.submitDadosAprendiz(
            colaboradorId,
            data as DadosAprendizDto,
          );
      case 9:
        return (data: unknown) =>
          AdmissaoService.submitDadosBancarios(
            colaboradorId,
            data as DadosBancariosDto,
          );
      default:
        throw new Error(`Invalid step: ${step}`);
    }
  };

  const mutation = useMutation<ApiResponse<ColaboradorDto>, Error, unknown>({
    mutationFn: getServiceMethod(),
    onSuccess: () => {
      markStepComplete(step);
      setCurrentStep(step + 1);
    },
  });

  return {
    submit: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
