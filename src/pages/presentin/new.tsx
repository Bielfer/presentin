import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import FormPresentin from '@/components/forms/FormPresentin';
import type { NextPage } from 'next';

const PresentinNew: NextPage = () => (
  <>
    <Header />
    <Container>
      <FormPresentin />
    </Container>
  </>
);

export default PresentinNew;
