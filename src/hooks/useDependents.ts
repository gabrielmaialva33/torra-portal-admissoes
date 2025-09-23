"use client";

import { useCallback, useState } from "react";
import type { Dependent, DependentFormData } from "@/types/dependent";

export function useDependents() {
  const [dependents, setDependents] = useState<Dependent[]>([]);

  const addDependent = useCallback((formData: DependentFormData) => {
    const newDependent: Dependent = {
      id: crypto.randomUUID(),
      ...formData,
    };
    setDependents((prev) => [...prev, newDependent]);
    return newDependent.id;
  }, []);

  const updateDependent = useCallback(
    (id: string, formData: Partial<DependentFormData>) => {
      setDependents((prev) =>
        prev.map((dep) => (dep.id === id ? { ...dep, ...formData } : dep)),
      );
    },
    [],
  );

  const removeDependent = useCallback((id: string) => {
    setDependents((prev) => prev.filter((dep) => dep.id !== id));
  }, []);

  const clearDependents = useCallback(() => {
    setDependents([]);
  }, []);

  const validateDependent = useCallback((dependent: Dependent): boolean => {
    return !!(
      (
        dependent.nomeCompleto.trim() &&
        dependent.grauParentesco &&
        dependent.dataNascimento &&
        dependent.cpf.trim() &&
        dependent.documentos.cpfFile
      ) // CPF é obrigatório
    );
  }, []);

  const isAllValid = useCallback(() => {
    return dependents.length > 0 && dependents.every(validateDependent);
  }, [dependents, validateDependent]);

  const getEmptyDependent = useCallback(
    (): DependentFormData => ({
      nomeCompleto: "",
      grauParentesco: "",
      dataNascimento: "",
      cpf: "",
      documentos: {
        cpfFile: null,
        certidaoNascimento: null,
        documentoGuarda: null,
      },
    }),
    [],
  );

  return {
    dependents,
    addDependent,
    updateDependent,
    removeDependent,
    clearDependents,
    validateDependent,
    isAllValid,
    getEmptyDependent,
    count: dependents.length,
  };
}
