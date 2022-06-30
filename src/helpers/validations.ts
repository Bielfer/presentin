const validationMessages = {
  email: 'Insira um email válido',
  required: 'Campo obrigatório',
};

export const getValidation = (type: keyof typeof validationMessages) =>
  validationMessages[type];

const hints = {
  required: 'Obrigatório',
};

export const getHint = (type: keyof typeof hints) => hints[type];
