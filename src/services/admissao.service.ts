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
import { api } from "./api";

/**
 * Service for handling all admission-related API calls
 */
export class AdmissaoService {
  private static readonly BASE_PATH = "/api/admissao";

  /**
   * Step 1: Submit personal data (Dados Gerais)
   */
  static async submitDadosGerais(
    colaboradorId: string,
    data: DadosGeraisDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, DadosGeraisDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step1/dados-gerais`,
      data,
    );
  }

  /**
   * Step 2: Submit dependents data (Dependentes)
   */
  static async submitDependentes(
    colaboradorId: string,
    data: DependentesDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, DependentesDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step2/dependentes`,
      data,
    );
  }

  /**
   * Step 3: Submit address data (Endereço)
   */
  static async submitEndereco(
    colaboradorId: string,
    data: EnderecoDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, EnderecoDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step3/endereco`,
      data,
    );
  }

  /**
   * Step 4: Submit contract data (Dados Contratuais)
   */
  static async submitDadosContratuais(
    colaboradorId: string,
    data: DadosContratuaisDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, DadosContratuaisDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step4/dados-contratuais`,
      data,
    );
  }

  /**
   * Step 5: Submit disability data (Dados PCD)
   */
  static async submitDadosPcd(
    colaboradorId: string,
    data: DadosPcdDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, DadosPcdDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step5/dados-pcd`,
      data,
    );
  }

  /**
   * Step 6: Submit transport voucher data (Vale Transporte)
   */
  static async submitValeTransporte(
    colaboradorId: string,
    data: ValeTransporteDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, ValeTransporteDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step6/vale-transporte`,
      data,
    );
  }

  /**
   * Step 7: Submit foreigner data (Dados Estrangeiro)
   */
  static async submitDadosEstrangeiro(
    colaboradorId: string,
    data: DadosEstrangeiroDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, DadosEstrangeiroDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step7/dados-estrangeiro`,
      data,
    );
  }

  /**
   * Step 8: Submit apprentice data (Dados Aprendiz)
   */
  static async submitDadosAprendiz(
    colaboradorId: string,
    data: DadosAprendizDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, DadosAprendizDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step8/dados-aprendiz`,
      data,
    );
  }

  /**
   * Step 9: Submit bank data (Dados Bancários)
   */
  static async submitDadosBancarios(
    colaboradorId: string,
    data: DadosBancariosDto,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto, DadosBancariosDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step9/dados-bancarios`,
      data,
    );
  }

  /**
   * Step 10: Upload documents (Documentos)
   */
  static async uploadDocumento(
    colaboradorId: string,
    file: File,
    tipoDocumento: string,
    stepId: number,
  ): Promise<ApiResponse<DocumentoResponseDto>> {
    const formData = new FormData();
    formData.append("arquivo", file);
    formData.append("tipoDocumento", tipoDocumento);
    formData.append("stepId", stepId.toString());

    return api.upload<DocumentoResponseDto>(
      `/api/documentos/upload/${colaboradorId}`,
      formData,
    );
  }

  /**
   * Upload multiple documents at once
   */
  static async uploadMultipleDocuments(
    colaboradorId: string,
    documents: Array<{
      file: File;
      tipoDocumento: string;
      stepId: number;
    }>,
  ): Promise<ApiResponse<DocumentoResponseDto[]>> {
    const uploadPromises = documents.map((doc) =>
      AdmissaoService.uploadDocumento(
        colaboradorId,
        doc.file,
        doc.tipoDocumento,
        doc.stepId,
      ),
    );

    const results = await Promise.allSettled(uploadPromises);

    const successfulUploads = results
      .filter(
        (
          result,
        ): result is PromiseFulfilledResult<
          ApiResponse<DocumentoResponseDto>
        > => result.status === "fulfilled",
      )
      .map((result) => result.value.data);

    const failedUploads = results.filter(
      (result) => result.status === "rejected",
    );

    if (failedUploads.length > 0 && successfulUploads.length === 0) {
      throw new Error(
        `Falha ao enviar todos os documentos: ${failedUploads.length} erros`,
      );
    }

    return {
      success: failedUploads.length === 0,
      data: successfulUploads,
      message:
        failedUploads.length === 0
          ? "Todos os documentos foram enviados com sucesso"
          : `${successfulUploads.length} documentos enviados, ${failedUploads.length} falharam`,
      errors:
        failedUploads.length > 0
          ? [`${failedUploads.length} documento(s) falharam`]
          : undefined,
    };
  }

  /**
   * Get employee admission data
   */
  static async getColaborador(
    colaboradorId: string,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.get<ColaboradorDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}`,
    );
  }

  /**
   * Get all documents for an employee
   */
  static async getDocumentos(
    colaboradorId: string,
  ): Promise<ApiResponse<DocumentoResponseDto[]>> {
    return api.get<DocumentoResponseDto[]>(`/api/documentos/${colaboradorId}`);
  }

  /**
   * Delete a document
   */
  static async deleteDocumento(
    documentoId: string,
  ): Promise<ApiResponse<void>> {
    return api.delete<void>(`/api/documentos/${documentoId}`);
  }

  /**
   * Update employee current step
   */
  static async updateCurrentStep(
    colaboradorId: string,
    step: number,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.patch<ColaboradorDto, { step: number }>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/step`,
      { step },
    );
  }

  /**
   * Complete the admission process
   */
  static async completeAdmission(
    colaboradorId: string,
  ): Promise<ApiResponse<ColaboradorDto>> {
    return api.post<ColaboradorDto>(
      `${AdmissaoService.BASE_PATH}/${colaboradorId}/complete`,
    );
  }

  /**
   * Validate CEP (Brazilian postal code)
   * This might call a separate API or validation endpoint
   */
  static async validateCEP(cep: string): Promise<ApiResponse<EnderecoDto>> {
    // Remove non-numeric characters
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido");
    }

    // This could call a ViaCEP or backend validation endpoint
    return api.get<EnderecoDto>(`/api/cep/${cleanCep}`);
  }
}

// Export individual methods for easier imports
export const {
  submitDadosGerais,
  submitDependentes,
  submitEndereco,
  submitDadosContratuais,
  submitDadosPcd,
  submitValeTransporte,
  submitDadosEstrangeiro,
  submitDadosAprendiz,
  submitDadosBancarios,
  uploadDocumento,
  uploadMultipleDocuments,
  getColaborador,
  getDocumentos,
  deleteDocumento,
  updateCurrentStep,
  completeAdmission,
  validateCEP,
} = AdmissaoService;
