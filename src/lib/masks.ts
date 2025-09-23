export function maskPhone(value: string): string {
  const numbers = value.replace(/\D/g, "");
  const match = numbers.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

  if (!match) return value;

  return !match[2]
    ? match[1]
    : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
}

export function maskCPF(value: string): string {
  const numbers = value.replace(/\D/g, "");
  const match = numbers.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

  if (!match) return value;

  const parts = [];
  if (match[1]) parts.push(match[1]);
  if (match[2]) parts.push(match[2]);
  if (match[3]) parts.push(match[3]);

  const cpf = parts.join(".");
  return match[4] ? `${cpf}-${match[4]}` : cpf;
}

export function unmaskValue(value: string): string {
  return value.replace(/\D/g, "");
}
