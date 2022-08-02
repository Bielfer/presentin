import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import FormPresentinMessage from '@/components/forms/FormPresentinMessage';
import type { NextPage } from 'next';

const PresentinMessage: NextPage = () => (
  <>
    <Header />
    <Container>
      <FormPresentinMessage className="mx-auto max-w-xl" />
    </Container>
  </>
);

export default PresentinMessage;
