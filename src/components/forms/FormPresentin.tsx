import { getHint } from '@/helpers/validations';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '../core/Button';
import FormikInput from './FormikInput';
import FormikSwitch from './FormikSwitch';

const FormPresentin = () => {
  const initialValues = {
    recipientName: '',
    title: '',
    allowCash: false,
    groupName: '',
  };

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    setSubmitting(true);
    alert(JSON.stringify(values));
  };

  const validationSchema = Yup.object({});

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-y-5">
          <FormikInput
            name="recipientName"
            label="Como se chama o recebedor?"
            hint={getHint('required')}
          />
          <FormikInput
            name="title"
            label="Título do Presentin"
            hint={getHint('required')}
          />
          <FormikSwitch
            name="allowCash"
            label="Deseja coletar dinheiro no Presentin?"
          />
          <FormikInput
            name="groupName"
            label="Nome do grupo que está enviando"
            hint={getHint('required')}
          />
          <div className="flex justify-end">
            <Button variant="primary" type="submit" loading={isSubmitting}>
              Enviar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPresentin;
