import { APP_URL } from '@/constants/app';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { DocumentDuplicateIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Button from '../core/Button';
import Text from '../core/Text';

const PresentinContributors = () => {
  const { asPath } = useRouter();
  const { copy, copySucceeded } = useCopyToClipboard();
  const presentinLink = APP_URL + asPath;

  return (
    <div className="flex flex-col items-center gap-y-5">
      <Text h3 className="justify-start w-full">
        Convidar Colaboradores
      </Text>

      <Text className="bg-slate-100 p-2 w-full justify-center rounded-lg border border-slate-200">
        {presentinLink}
      </Text>
      <Text className="text-center text-sm">
        Basta enviar o link para os seus amigos e eles ja podem ajudar a encher
        o Presentin
      </Text>
      <Button
        iconLeft={DocumentDuplicateIcon}
        variant="primary"
        onClick={() => copy(presentinLink)}
      >
        {copySucceeded ? 'Copiado!' : 'Copiar Link'}
      </Button>
    </div>
  );
};

export default PresentinContributors;
