"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { DocumentUpload } from "@/components/ui/document-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { personalDataSchema } from "@/lib/validations/onboarding";
import { useOnboardingStore } from "@/stores/onboarding-store";

type PersonalDataFormValues = z.infer<typeof personalDataSchema>;

export function PersonalDataForm() {
  const router = useRouter();
  const { formData, updateFormData, markStepComplete, setCurrentStep } =
    useOnboardingStore();

  const form = useForm<PersonalDataFormValues>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: formData.personalData || {
      fullName: "",
      cpf: "",
      rg: "",
      birthDate: "",
      email: "",
      phone: "",
      maritalStatus: undefined,
      gender: undefined,
      nationality: "Brasileiro",
    },
  });

  const onSubmit = (data: PersonalDataFormValues) => {
    updateFormData("personalData", data);
    markStepComplete(1);
    setCurrentStep(2);
    router.push("/onboarding/2");
  };

  const onSave = (data: PersonalDataFormValues) => {
    updateFormData("personalData", data);
    alert("Dados salvos com sucesso!");
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{2})/, "$1-$2");
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  return (
    <div className="space-y-8">
      {/* Main Form Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Photo and Main Form Row */}
              <div className="flex gap-12">
                {/* Photo Upload */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-gray-500" />
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">Foto*</span>
                </div>

                {/* Main Form Fields */}
                <div className="flex-1 grid grid-cols-2 gap-6">
                  {/* Nome completo */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Nome completo*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-gray-300"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Nome social */}
                  <FormItem>
                    <FormLabel className="text-gray-600">Nome social</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300" placeholder="" />
                    </FormControl>
                  </FormItem>

                  {/* Data de nascimento */}
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Data de nascimento*
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              className="border-gray-300"
                              {...field}
                            />
                            <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Celular com DDD */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Número de celular com DDD*
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-gray-300"
                            placeholder=""
                            {...field}
                            onChange={(e) => {
                              const formatted = formatPhone(e.target.value);
                              field.onChange(formatted);
                            }}
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Nome do pai */}
                  <FormItem>
                    <FormLabel className="text-gray-600">Nome do pai</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300" placeholder="" />
                    </FormControl>
                  </FormItem>

                  {/* Nome da mãe */}
                  <FormItem>
                    <FormLabel className="text-gray-600">Nome da mãe</FormLabel>
                    <FormControl>
                      <Input className="border-gray-300" placeholder="" />
                    </FormControl>
                  </FormItem>
                </div>
              </div>

              {/* Second Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Número do RG */}
                <FormField
                  control={form.control}
                  name="rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Número do RG*
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-gray-300"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Data de emissão */}
                <FormItem>
                  <FormLabel className="text-gray-600">
                    Data de emissão*
                  </FormLabel>
                  <FormControl>
                    <Input type="date" className="border-gray-300" />
                  </FormControl>
                </FormItem>

                {/* Órgão emissor */}
                <FormItem>
                  <FormLabel className="text-gray-600">
                    Órgão emissor*
                  </FormLabel>
                  <FormControl>
                    <Input className="border-gray-300" placeholder="" />
                  </FormControl>
                </FormItem>

                {/* CPF */}
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">CPF*</FormLabel>
                      <FormControl>
                        <Input
                          className="border-gray-300"
                          placeholder=""
                          {...field}
                          onChange={(e) => {
                            const formatted = formatCPF(e.target.value);
                            field.onChange(formatted);
                          }}
                          maxLength={14}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Estado civil */}
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Estado civil
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Solteiro(a)</SelectItem>
                          <SelectItem value="married">Casado(a)</SelectItem>
                          <SelectItem value="divorced">
                            Divorciado(a)
                          </SelectItem>
                          <SelectItem value="widowed">Viúvo(a)</SelectItem>
                          <SelectItem value="stable_union">
                            União Estável
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Grau de escolaridade */}
                <FormItem>
                  <FormLabel className="text-gray-600">
                    Grau de escolaridade
                  </FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fundamental_incomplete">
                        Fundamental Incompleto
                      </SelectItem>
                      <SelectItem value="fundamental_complete">
                        Fundamental Completo
                      </SelectItem>
                      <SelectItem value="medio_incomplete">
                        Médio Incompleto
                      </SelectItem>
                      <SelectItem value="medio_complete">
                        Médio Completo
                      </SelectItem>
                      <SelectItem value="superior_incomplete">
                        Superior Incompleto
                      </SelectItem>
                      <SelectItem value="superior_complete">
                        Superior Completo
                      </SelectItem>
                      <SelectItem value="pos_graduacao">
                        Pós-Graduação
                      </SelectItem>
                      <SelectItem value="mestrado">Mestrado</SelectItem>
                      <SelectItem value="doutorado">Doutorado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>

              {/* Divider */}
              <div className="border-t my-8"></div>

              {/* Document Upload Section */}
              <div>
                <p className="text-gray-600 text-center mb-6">
                  Agora, faça o envio dos documentos abaixo.
                </p>

                <div className="space-y-4">
                  <DocumentUpload
                    title="RG"
                    onUpload={(file) => console.log("RG uploaded:", file)}
                  />
                  <DocumentUpload
                    title="CPF"
                    onUpload={(file) => console.log("CPF uploaded:", file)}
                  />
                  <DocumentUpload
                    title="Certidão de casamento"
                    onUpload={(file) => console.log("Certidão uploaded:", file)}
                  />
                  <DocumentUpload
                    title="Reservista"
                    onUpload={(file) =>
                      console.log("Reservista uploaded:", file)
                    }
                  />
                  <DocumentUpload
                    title="Diploma ou certificado de escolaridade"
                    onUpload={(file) => console.log("Diploma uploaded:", file)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={form.handleSubmit(onSave)}
                  className="bg-torra-dark-blue text-neutral-01 hover:bg-torra-dark-blue/90 border-0 px-6 py-4 text-sm font-normal h-auto rounded-sm"
                >
                  Salvar
                </Button>
                <Button
                  type="submit"
                  disabled={!form.formState.isValid}
                  className="bg-torra-orange text-neutral-01 hover:bg-torra-orange/90 disabled:bg-neutral-04 disabled:opacity-100 px-6 py-4 text-sm font-normal h-auto rounded-sm"
                >
                  Próximo
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
