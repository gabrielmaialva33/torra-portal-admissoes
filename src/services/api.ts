import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";

// Base API configuration
const API_BASE_URL = "https://torra-admissoes.mahina.cloud";
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor - add authentication token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get token from localStorage or cookie if authentication is implemented
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (process.env.NODE_ENV === "development") {
      console.error("[API Request Error]", error);
    }
    return Promise.reject(error);
  },
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.status,
      );
    }

    return response;
  },
  (error: AxiosError<ApiErrorResponse>): Promise<ApiErrorResponse> => {
    // Handle network errors
    if (!error.response) {
      const networkError: ApiErrorResponse = {
        success: false,
        message: "Erro de conexão. Verifique sua internet e tente novamente.",
        errors: ["NETWORK_ERROR"],
      };

      if (process.env.NODE_ENV === "development") {
        console.error("[API Network Error]", error.message);
      }

      return Promise.reject(networkError);
    }

    // Handle HTTP errors
    const status = error.response.status;
    const responseData = error.response.data;

    const errorResponse: ApiErrorResponse = {
      success: false,
      message: responseData?.message || "Ocorreu um erro inesperado.",
      errors: responseData?.errors || [],
      statusCode: status,
    };

    // Customize error messages based on status code
    switch (status) {
      case 400:
        errorResponse.message =
          responseData?.message || "Dados inválidos. Verifique as informações.";
        break;
      case 401:
        errorResponse.message = "Sessão expirada. Faça login novamente.";
        // Optionally redirect to login or clear auth token
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
        }
        break;
      case 403:
        errorResponse.message = "Você não tem permissão para esta ação.";
        break;
      case 404:
        errorResponse.message =
          responseData?.message || "Recurso não encontrado.";
        break;
      case 409:
        errorResponse.message =
          responseData?.message || "Conflito de dados. O recurso já existe.";
        break;
      case 422:
        errorResponse.message =
          responseData?.message || "Dados inválidos. Verifique os campos.";
        break;
      case 429:
        errorResponse.message =
          "Muitas requisições. Aguarde um momento e tente novamente.";
        break;
      case 500:
        errorResponse.message = "Erro no servidor. Tente novamente mais tarde.";
        break;
      case 503:
        errorResponse.message =
          "Serviço temporariamente indisponível. Tente novamente em alguns minutos.";
        break;
      default:
        errorResponse.message = responseData?.message || "Erro inesperado.";
    }

    if (process.env.NODE_ENV === "development") {
      console.error(
        `[API Error] ${status} - ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        errorResponse,
      );
    }

    return Promise.reject(errorResponse);
  },
);

// Generic API methods
export const api = {
  /**
   * GET request
   */
  get: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data;
  },

  /**
   * POST request
   */
  post: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * PUT request
   */
  put: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * PATCH request
   */
  patch: async <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * DELETE request
   */
  delete: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data;
  },

  /**
   * Upload file with FormData
   */
  upload: async <T = unknown>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return response.data;
  },
};

// Export the axios instance for advanced use cases
export { apiClient };

// Export base URL for reference
export const API_URL = API_BASE_URL;
