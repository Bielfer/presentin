import { createPresentinMessage } from '@/api/presentin';
import { createUser } from '@/api/user';
import hints from '@/constants/hints';
import paths from '@/constants/paths';
import validations from '@/constants/validations';
import { useAuth } from '@/contexts/auth';
import { uploadPresentinMessageImage } from '@/db/files';
import tryCatch from '@/helpers/tryCatch';
import { CameraIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import Button from '../core/Button';
import { useToast } from '../core/Toast';
import FormikFile from './FormikFile';
import FormikInput from './FormikInput';
import FormikNumber from './FormikNumber';
import FormikSwitch from './FormikSwitch';
import FormikTextarea from './FormikTextarea';

interface Props {
  className?: string;
}

const FormPresentinMessage = ({ className }: Props) => {
  const { addToast } = useToast();
  const { signInAnonymous, loggedIn } = useAuth();
  const router = useRouter();

  const presentinId = router.query.presentinId as string;

  const initialValues = {
    senderName: '',
    message: '',
    image: null,
    donateCash: false,
    cashAmount: 0,
    loggedIn,
    senderEmail: '',
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
    senderEmail: Yup.string().when('loggedIn', {
      is: false,
      then: Yup.string().required(validations.required),
    }),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    if (!loggedIn) {
      await signInAnonymous({ displayName: values.senderName });
      const [, error] = await tryCatch(
        createUser({ name: values.senderName, email: values.senderEmail })
      );
      if (error) {
        addToast({
          type: 'error',
          content: 'Falha ao enviar mensagem, tente recarregar a página',
        });
      }
    }

    let downloadUrl: string | null = null;

    if (values.image) {
      const [url, error] = await tryCatch(
        uploadPresentinMessageImage(values.image)
      );

      if (error)
        addToast({
          type: 'error',
          content: 'Falha ao subir imagem, tente novamente',
        });

      downloadUrl = url;
    }

    const {
      loggedIn: x,
      senderEmail,
      ...toSendValues
    } = { ...values, image: downloadUrl };

    const [presentinData, error] = await tryCatch(
      createPresentinMessage(presentinId, toSendValues)
    );

    if (error || !presentinData) {
      addToast({
        type: 'error',
        content:
          'Não foi possível enviar a sua mensagem, tente recarregar a página',
      });
      return;
    }

    router.push(paths.presentinById(presentinId));
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

          {!loggedIn && (
            <FormikInput
              name="senderEmail"
              label="Seu Email"
              hint={hints.required}
              placeholder="Ex: maria@meuemail.com"
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
