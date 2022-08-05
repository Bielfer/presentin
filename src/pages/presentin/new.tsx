import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import Text from '@/components/core/Text';
import FormPresentin from '@/components/forms/FormPresentin';
import { Page } from '@/types/auth';

const PresentinNew: Page = () => (
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

PresentinNew.auth = 'wait';

export default PresentinNew;
