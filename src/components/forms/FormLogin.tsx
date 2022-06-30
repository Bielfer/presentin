import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';
import { useEffect } from 'react';
import Card from '@/components/core/Card';
import { actionCodeSettings } from '@/firebase/auth';
import { auth } from '@/firebase';
import tryCatch from '@/helpers/tryCatch';
import Text from '@/components/core/Text';
import FormikInput from '@/components/forms/FormikInput';
import Button from '@/components/core/Button';
import { getValidation } from '@/helpers/validations';

interface Props {
  title?: string;
}

const FormLogin = ({ title }: Props) => {
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(getValidation('email'))
      .required(getValidation('required')),
  });

  const handleSubmit = async ({ email }: typeof initialValues) => {
    const [, error] = await tryCatch(
      sendSignInLinkToEmail(auth, email, actionCodeSettings)
    );
    console.log(actionCodeSettings);
    if (error) {
      alert('Falha ao enviar email. Favor tente fazer o login novamente');
    }

    window.localStorage.setItem('comerciio-sign-in-email', email);
  };

  const verifyIfEmailWasSent = () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('comerciio-sign-in-email');

      if (!email) {
        email = window.prompt(
          'Insira o email novamente para confirmarmos sua identidade'
        );
      }

      signInWithEmailLink(auth, email || '', window.location.href)
        .then(() => {
          window.localStorage.removeItem('comerciio-sign-in-email');
        })
        .catch(() => {
          alert(
            'Seu email pode estar diferente do email digitado anteriormente ou seu link expirou. Favor tente fazer o login novamente'
          );
        });
    }
  };

  useEffect(() => {
    verifyIfEmailWasSent();
  }, []);

  return (
    <Card shadow className="w-5/6 max-w-sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Text h3 className="mb-4">
            {title || 'Faça seu Login'}
          </Text>
          <FormikInput
            name="email"
            label="Email"
            placeholder="exemplo@exemplo.com"
          />
          <Button type="submit" className="w-full mt-4">
            Enviar
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default FormLogin;
