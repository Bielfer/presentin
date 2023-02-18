import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import Tabs from '@/components/core/Tabs';
import FormWithdraw from '@/components/forms/FormWithdraw';
import { pathsLoggedIn } from '@/constants/paths';
import { useAuth } from '@/contexts/auth';
import { Page } from '@/types/auth';
import Text from '@/components/core/Text';
import { formatCurrency } from '@/helpers/formatters';

const Withdraw: Page = () => {
  const { userAuth } = useAuth();
  console.log(userAuth.accessToken);
  return (
    <>
      <Header />
      <Container>
        <Tabs tabs={pathsLoggedIn} />
        <div className="mx-auto max-w-xl pt-6">
          <Text h1 className="mt-4">
            Saque o seu dinheiro
          </Text>
          <Text h3 className="my-3">
            Valor a ser transferido: {formatCurrency(0)}
          </Text>
          <FormWithdraw />
        </div>
      </Container>
    </>
  );
};

export default Withdraw;
