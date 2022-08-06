import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import PresentinMessages from '@/components/features/PresentinMessages';
import { Page } from '@/types/auth';
import { PresentinStatus } from '@/types/presentin';

const PresentinExample: Page = () => {
  const dogMessages = [
    {
      senderName: 'Calado',
      image: '/dogs/1.jpg',
    },
    {
      senderName: 'Desconfiada',
      image: '/dogs/2.jpg',
      message: 'Você é legal',
    },
    {
      senderName: 'Sumido',
      message:
        'Faaaala Feijão, bora marcar qualquer dia pra dar um rolê daqueles. Valeu irmão',
    },
    {
      senderName: 'Brad Pitt',
      image: '/dogs/3.jpg',
      message: 'Feijão tu eh show',
    },
    {
      senderName: 'Safado',
      image: '/dogs/4.jpg',
      message:
        'Eae mano, qualquer dia vamos tocar o terror nas gatinhas de novo, valeu',
    },
    {
      senderName: 'Nerd',
      image: '/dogs/5.jpg',
      message: 'Vamos jogar aquele LOL quando hein?',
    },
    {
      senderName: 'Linda',
      image: '/dogs/6.jpg',
      message: 'Beijos gatinho',
    },
    {
      senderName: 'Lady',
      image: '/dogs/7.jpg',
    },
    {
      senderName: 'Roedor',
      image: '/dogs/8.jpg',
      message: 'Desencosta do meu osso malandro. Zoas, tu eh show',
    },
    {
      senderName: 'Confusenta',
      image: '/dogs/9.jpg',
      message:
        'Qualquer dia vou voltar naquele bar e falar umas poucas e boas para aquele garçom ladrão. Abração pro meu best',
    },
  ];

  return (
    <>
      <Header />
      <Container>
        <PresentinMessages
          presentin={{
            groupName: 'Dos seus dog amigos',
            recipientName: 'Feijão',
            title: 'Feliz aniversário',
            status: PresentinStatus.Sent,
          }}
          messages={dogMessages}
        />
      </Container>
    </>
  );
};

export default PresentinExample;
