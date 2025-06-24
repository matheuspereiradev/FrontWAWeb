import { GetServerSideProps } from 'next';
import Dashboard from '@/components/layouts/dashboard';
import { serverApiFetch } from '@/services/api_request';
import { IUserProfile, IUserProfileListResponse } from '@/interfaces/IUserProfile';
import MakeUser from '@/fragments/makeUser';

interface Props {
  profiles: IUserProfile[];
}

const AddUserPage = ({ profiles }: Props) => (
  <Dashboard title="Adicionar Usuário">
    <MakeUser profiles={profiles} />
  </Dashboard>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: profiles } = await serverApiFetch<IUserProfileListResponse>(ctx, '/UserProfile');
  return { props: { profiles } };
};

export default AddUserPage;
