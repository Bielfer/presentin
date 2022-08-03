import ButtonGroup from '@/components/core/ButtonGroup';
import ButtonLink from '@/components/core/ButtonLink';
import Card from '@/components/core/Card';
import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import Modal from '@/components/core/Modal';
import MyImage from '@/components/core/MyImage';
import Text from '@/components/core/Text';
import PresentinContributors from '@/components/features/PresentinContributors';
import FormPresentin from '@/components/forms/FormPresentin';
import paths from '@/constants/paths';
import useDogs from '@/data/useDogs';
import {
  EyeIcon,
  GiftIcon,
  MailIcon,
  PlusCircleIcon,
  ShareIcon,
} from '@heroicons/react/solid';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PresentinById: NextPage = () => {
  const router = useRouter();
  const { dogs } = useDogs();
  const [editOpen, setEditOpen] = useState(false);
  const [contributorsOpen, setContributorsOpen] = useState(false);
  const title = 'Presentin Title';
  const recipientName = 'Presentin Recipient';
  const groupName = 'Seus amigos';

  const buttons = [
    {
      text: 'Convidar Colaboradores',
      icon: ShareIcon,
      onClick: () => setContributorsOpen(true),
    },
    {
      text: 'Editar Presentin',
      icon: GiftIcon,
      onClick: () => setEditOpen(true),
    },
    {
      text: 'Ver Como Recebedor',
      href: `${router.asPath}/recipient-view`,
      icon: EyeIcon,
    },
    {
      text: 'Pagar e Enviar',
      href: `${router.asPath}/send`,
      icon: MailIcon,
    },
  ];

  const showDogs = dogs?.map((item) => (
    <Card
      shadow
      key={item.id}
      className="w-full first:mt-0 my-6 break-inside-avoid-column overflow-hidden"
    >
      <MyImage src={item.url} layout="fill" />

      <div className="p-4">
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
          voluptate quidem.
        </Text>
        <Text h6 className="justify-end">
          {item.id}
        </Text>
      </div>
    </Card>
  ));

  return (
    <>
      <Header />

      <Container>
        <ButtonGroup className="mb-4" buttons={buttons} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6">
          <div>
            <Text h6>{recipientName}</Text>
            <Text h3>{title}</Text>
          </div>
          <Text h6>{groupName}</Text>
        </div>
        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4">
          <ButtonLink
            href={paths.presentinMessage(router.asPath)}
            iconRight={PlusCircleIcon}
            className="w-full justify-center"
            variant="primary"
          >
            Nova Mensagem
          </ButtonLink>
          {showDogs}
        </div>
      </Container>
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)}>
        <FormPresentin
          presentin={{
            id: 'afsd',
            collectCash: true,
            groupName: 'cu',
            recipientName: 'cuzin',
            title: 'cus',
          }}
        />
      </Modal>
      <Modal
        isOpen={contributorsOpen}
        onClose={() => setContributorsOpen(false)}
      >
        <PresentinContributors />
      </Modal>
    </>
  );
};

export default PresentinById;
