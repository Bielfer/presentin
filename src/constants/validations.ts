const validations = {
  email: 'Insira um email válido',
  required: 'Campo obrigatório',
  valueGreaterThanZero: 'Insira um valor maior que 0',
  isNumberValid: 'Use ponto em vez de vírgula',
  length: (fieldLength: number) =>
    `Campo deve possuir ${fieldLength} caracteres`,
};

export default validations;
