import { GetServerSideProps } from 'next';
import Dashboard from '@/components/layouts/dashboard';
import { serverApiFetch } from '@/services/api_request';
import { ICenter, ICenterListResponse } from '@/interfaces/ICenters';
import MakeDaf from '@/fragments/makeDaf';

interface Props {
  centers: ICenter[];
}

const DafAddPage = ({ centers }: Props) => (
  <Dashboard title="Adicionar DAF">
    <MakeDaf centers={centers} />
  </Dashboard>
);

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { data: centers } = await serverApiFetch<ICenterListResponse>(
    ctx,
    '/Centers'
  );

  return { props: { centers } };
};

export default DafAddPage;
