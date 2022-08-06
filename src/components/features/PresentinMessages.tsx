import Text from '@/components/core/Text';
import paths from '@/constants/paths';
import {
  Presentin,
  PresentinMessage,
  PresentinStatus,
} from '@/types/presentin';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import ButtonLink from '../core/ButtonLink';
import Card from '../core/Card';
import MyImage from '../core/MyImage';

interface Props {
  presentin?: Partial<Presentin>;
  messages: Partial<PresentinMessage>[];
}

const PresentinMessages = ({ presentin, messages }: Props) => {
  const router = useRouter();

  const showMessages = useMemo(
    () =>
      messages?.map((item) => (
        <Card
          shadow
          key={item.id}
          className="w-full first:mt-0 my-6 break-inside-avoid-column overflow-hidden"
        >
          {!!item.image && <MyImage src={item.image} layout="fill" />}

          <div className="p-4">
            {!!item.message && <Text>{item.message}</Text>}
            <Text h6 className="justify-end">
              {item.senderName}
            </Text>
          </div>
        </Card>
      )),
    [messages]
  );

  return (
    <>
      <div className="pb-6">
        <Text className="text-2xl">{presentin?.recipientName}</Text>
        <Text h1>{presentin?.title}</Text>
        <Text h4>{presentin?.groupName}</Text>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4">
        {presentin?.status === PresentinStatus.Open && (
          <ButtonLink
            href={paths.presentinMessage(router.query.presentinId as string)}
            iconRight={PlusCircleIcon}
            className="w-full justify-center"
            variant="primary"
          >
            Nova Mensagem
          </ButtonLink>
        )}
        {showMessages}
      </div>
    </>
  );
};

export default PresentinMessages;
