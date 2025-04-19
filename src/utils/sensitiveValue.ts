export function sensibleValue(value: number, show: boolean): string {
  if(!show){
    return '••••••';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}
