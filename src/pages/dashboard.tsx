import ButtonLink from '@/components/core/ButtonLink';
import Container from '@/components/core/Container';
import Header from '@/components/core/Header';
import LoadingWrapper from '@/components/core/LoadingWrapper';
import MyLink from '@/components/core/MyLink';
import Table from '@/components/core/Table';
import Tabs from '@/components/core/Tabs';
import Text from '@/components/core/Text';
import paths, { pathsLoggedIn } from '@/constants/paths';
import usePresentins from '@/data/usePresentins';
import { Page } from '@/types/auth';

const Dashboard: Page = () => {
  const { presentins, loading } = usePresentins();

  return (
    <>
      <Header />
      <Container>
        <Tabs tabs={pathsLoggedIn} />
        <div className="flex items-center justify-between pt-6">
          <Text h1>Seus Presentins</Text>
          <ButtonLink href={paths.createPresentin} variant="primary">
            Criar
          </ButtonLink>
        </div>
        <LoadingWrapper loading={loading}>
          {presentins?.length === 0 ? (
            <Text className="justify-center text-xl my-8">
              Você ainda não tem nenhum presentin, aproveite para criar agora!
            </Text>
          ) : (
            <Table className="my-8">
              <Table.Head>
                <Table.Header>Título</Table.Header>
                <Table.Header>Recebedor</Table.Header>
                <Table.Header hidden>Editar</Table.Header>
              </Table.Head>
              <Table.Body>
                {presentins?.map((presentin) => (
                  <Table.Row key={presentin.id}>
                    <Table.Data>
                      <MyLink href={paths.presentinById(presentin.id)}>
                        {presentin.title}
                      </MyLink>
                    </Table.Data>
                    <Table.Data>{presentin.recipientName}</Table.Data>
                    <Table.Data className="flex items-center justify-end">
                      <ButtonLink
                        href={paths.presentinById(presentin.id)}
                        size="xs"
                      >
                        Editar
                      </ButtonLink>
                    </Table.Data>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </LoadingWrapper>
      </Container>
    </>
  );
};

Dashboard.auth = 'block';

export default Dashboard;
