import ButtonGroup from '@/components/core/ButtonGroup';
import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import LoadingWrapper from '@/components/core/LoadingWrapper';
import Modal from '@/components/core/Modal';
import PresentinContributors from '@/components/features/PresentinContributors';
import PresentinMessages from '@/components/features/PresentinMessages';
import FormPresentin from '@/components/forms/FormPresentin';
import paths from '@/constants/paths';
import { useAuth } from '@/contexts/auth';
import usePresentin from '@/data/usePresentin';
import usePresentinMessages from '@/data/usePresentinMessages';
import { EyeIcon, GiftIcon, MailIcon, ShareIcon } from '@heroicons/react/solid';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PresentinById: NextPage = () => {
  const router = useRouter();
  const { userAuth } = useAuth();
  const presentinId = router.query.presentinId as string;
  const {
    presentin,
    loading: loadingPresentin,
    mutate: mutatePresentin,
  } = usePresentin(presentinId);
  const { messages, loading: loadingMessages } =
    usePresentinMessages(presentinId);
  const [editOpen, setEditOpen] = useState(false);
  const [contributorsOpen, setContributorsOpen] = useState(false);

  const isOwner = presentin?.uid === userAuth?.uid;

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
      href: paths.presentinRecipient(presentinId),
      icon: EyeIcon,
    },
    {
      text: 'Pagar e Enviar',
      href: paths.presentinSend(presentinId),
      icon: MailIcon,
    },
  ];

  return (
    <>
      <Header />
      <LoadingWrapper loading={loadingPresentin || loadingMessages}>
        <Container>
          {isOwner && <ButtonGroup className="mb-4" buttons={buttons} />}
          <PresentinMessages presentin={presentin} messages={messages} />
        </Container>
      </LoadingWrapper>
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)}>
        <FormPresentin
          presentin={presentin}
          onClose={() => {
            setEditOpen(false);
            mutatePresentin();
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
