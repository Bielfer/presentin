import validations from '@/constants/validations';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../core/Button';
import MyLink from '../core/MyLink';
import Text from '../core/Text';
import FormikInput from './FormikInput';

interface Props {
  className?: string;
}

const FormWithdraw = ({ className }: Props) => {
  const initialValues = {
    cpf: '',
    pixLink: '',
  };

  const validationSchema = Yup.object({
    cpf: Yup.string()
      .required(validations.required)
      .length(11, validations.length(11)),
    pixLink: Yup.string().required(validations.required),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={clsx('flex flex-col gap-y-5', className)}>
        <FormikInput label="Seu CPF" name="cpf" formatter="___.___.___-__" />
        <FormikInput
          label="Pix copia e cola"
          name="pixLink"
          help="Atenção! O link de cobrança não é a sua chave PIX. Você deve entrar no seu banco e gerar um QRCode de cobrança. Depois basta copiar o link que o banco vai disponibilizar."
        />
        <Text className="text-sm">
          Seu Link deve ter o seguinte formato:
          01234567891011121314br.gov.bcb.seubanco.com/...
        </Text>

        <Text className="text-sm">
          Ainda com dúvidas sobre como criar uma cobrança?{' '}
          <MyLink variant="primary">Clique Aqui!</MyLink>
        </Text>

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Sacar
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormWithdraw;
