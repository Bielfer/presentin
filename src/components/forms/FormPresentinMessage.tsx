import hints from '@/constants/hints';
import validations from '@/constants/validations';
import { useAuth } from '@/contexts/auth';
import { CameraIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../core/Button';
import FormikFile from './FormikFile';
import FormikInput from './FormikInput';
import FormikNumber from './FormikNumber';
import FormikSwitch from './FormikSwitch';
import FormikTextarea from './FormikTextarea';

interface Props {
  className?: string;
}

const FormPresentinMessage = ({ className }: Props) => {
  const { sendEmailLink } = useAuth();

  const initialValues = {
    senderName: '',
    message: '',
    image: null,
    donateCash: false,
    cashAmount: 0,
  };

  const validationSchema = Yup.object({
    senderName: Yup.string().required(validations.required),
    message: Yup.string(),
    donateCash: Yup.bool(),
    cashAmount: Yup.number().when('donateCash', {
      is: true,
      then: Yup.number()
        .min(1, validations.valueGreaterThanZero)
        .required(validations.required),
    }),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    sendEmailLink('gfvf2001@gmail.com');
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className={clsx('flex flex-col gap-y-5', className)}>
          <FormikInput
            name="senderName"
            label="Seu Nome"
            hint={hints.required}
            placeholder="Ex: Maria"
          />
          <FormikTextarea
            name="message"
            label="Mensagem"
            placeholder="Ex: Você é show!"
          />
          <FormikFile
            name="image"
            variant="secondary"
            label="Deseja colocar uma foto?"
            iconLeft={CameraIcon}
          >
            Escolher Foto
          </FormikFile>
          <FormikSwitch
            name="donateCash"
            label="Vai presentear seu amigo com alguma quantia?"
          />

          {values.donateCash && (
            <FormikNumber
              name="cashAmount"
              label="Digite o valor"
              hint={hints.required}
              format="currency"
            />
          )}

          <div className="flex justify-end">
            <Button loading={isSubmitting} type="submit" variant="primary">
              Enviar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPresentinMessage;
