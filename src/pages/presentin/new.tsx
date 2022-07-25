import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import Text from '@/components/core/Text';
import FormPresentin from '@/components/forms/FormPresentin';
import type { NextPage } from 'next';

const PresentinNew: NextPage = () => (
  <>
    <Header />
    <Container>
      <div className="mx-auto max-w-xl">
        <Text h1 className="my-4">
          Crie o seu presentin
        </Text>
        <FormPresentin />
      </div>
    </Container>
  </>
);

export default PresentinNew;
