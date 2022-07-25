import { getHint, getValidation } from '@/helpers/validations';
import { Presentin } from '@/types/presentin';
import clsx from 'clsx';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '../core/Button';
import FormikInput from './FormikInput';
import FormikSwitch from './FormikSwitch';

interface Props {
  className?: string;
  presentin?: Presentin;
}

const FormPresentin = ({ className, presentin }: Props) => {
  const isPresentinCreated = presentin?.id;

  const initialValues = {
    recipientName: presentin?.recipientName ?? '',
    title: presentin?.title ?? '',
    collectCash: presentin?.collectCash ?? false,
    groupName: presentin?.groupName ?? '',
    loggedIn: true,
  };

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    setSubmitting(true);
    alert(JSON.stringify(values));
  };

  const validationSchema = Yup.object({
    recipientName: Yup.string().required(getValidation('required')),
    title: Yup.string().required(getValidation('required')),
    collectCash: Yup.boolean(),
    groupName: Yup.string().required(getValidation('required')),
    senderName: Yup.string().when('loggedIn', {
      is: false,
      then: Yup.string().required(getValidation('required')),
    }),
    senderEmail: Yup.string().when('loggedIn', {
      is: false,
      then: Yup.string().required(getValidation('required')),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, values }) => (
        <Form className={clsx('flex flex-col gap-y-5', className)}>
          <FormikInput
            name="recipientName"
            label="Como se chama o recebedor?"
            hint={getHint('required')}
            placeholder="Ex: João Silva"
          />
          <FormikInput
            name="title"
            label="Título do Presentin"
            hint={getHint('required')}
            placeholder="Ex: Feliz aniversário João"
          />
          {!isPresentinCreated && (
            <FormikSwitch
              name="collectCash"
              label="Deseja coletar dinheiro no Presentin?"
            />
          )}

          <FormikInput
            name="groupName"
            label="Nome do grupo que está enviando"
            hint={getHint('required')}
            placeholder="Ex: Seus queridos amigos de escola"
          />
          {!values.loggedIn ? (
            <>
              <FormikInput
                name="senderName"
                label="Seu Nome"
                hint={getHint('required')}
                placeholder="Ex: José"
              />
              <FormikInput
                name="senderEmail"
                label="Seu Email"
                placeholder="Ex: jose@gmail.com"
                hint={getHint('required')}
              />
            </>
          ) : null}
          <div className="flex justify-end">
            <Button
              variant="primary"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Enviar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPresentin;
