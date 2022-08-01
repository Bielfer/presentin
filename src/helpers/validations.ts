const validationMessages = {
  email: 'Insira um email válido',
  required: 'Campo obrigatório',
  valueGreaterThanZero: 'Insira um valor maior que 0',
  isNumberValid: 'Use ponto em vez de vírgula',
};

export const getValidation = (type: keyof typeof validationMessages) =>
  validationMessages[type];

const hints = {
  required: 'Obrigatório',
};

export const getHint = (type: keyof typeof hints) => hints[type];
