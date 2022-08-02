import { useToast } from '@/components/core/Toast';
import { auth } from '@/services/firebase';
import { actionCodeSettings } from '@/services/firebase/auth';
import tryCatch from '@/helpers/tryCatch';
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserAuth } from '@/types/user';

interface Context {
  userAuth: UserAuth | null;
  sendEmailLink: (email: string, url?: string) => void;
  signInEmailLink: () => void;
}

const AuthContext = createContext({} as Context);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToast();
  const [userAuth, setUserAuth] = useState<UserAuth | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAuth(currentUser as UserAuth | null);
    });

    return () => unsubscribe();
  }, []);

  const sendEmailLink = useCallback(
    async (email: string, url = '') => {
      const [, error] = await tryCatch(
        sendSignInLinkToEmail(auth, email, {
          ...actionCodeSettings,
          url: actionCodeSettings.url + url,
        })
      );

      if (error) {
        addToast({
          type: 'error',
          content: 'Erro ao enviar link para email',
        });
      }

      window.localStorage.setItem('presentin-sign-in-email', email);
    },
    [addToast]
  );

  const signInEmailLink = useCallback(async () => {
    if (!isSignInWithEmailLink(auth, window.location.href)) return;

    let email = window.localStorage.getItem('presentin-sign-in-email');

    if (!email) {
      email = window.prompt(
        'Insira o email novamente para confirmarmos sua identidade'
      );
    }

    const [, error] = await tryCatch(
      signInWithEmailLink(auth, email ?? '', window.location.href)
    );

    if (error)
      addToast({
        type: 'error',
        content:
          'Seu email pode estar diferente do email digitado anteriormente ou seu link expirou. Favor tente fazer o login novamente',
      });

    window.localStorage.removeItem('presentin-sign-in-email');
  }, [addToast]);

  const value = useMemo(
    () => ({ userAuth, sendEmailLink, signInEmailLink }),
    [signInEmailLink, userAuth, sendEmailLink]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
