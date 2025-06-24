import { GetServerSideProps } from 'next';
import Dashboard from '@/components/layouts/dashboard';
import { serverApiFetch } from '@/services/api_request';
import { IUser, IUserResponse } from '@/interfaces/IUser';
import { IUserProfile, IUserProfileListResponse } from '@/interfaces/IUserProfile';
import MakeUser from '@/fragments/makeUser';

interface Props {
    user: IUser;
    profiles: IUserProfile[];
}

const EditUserPage = ({ user, profiles }: Props) => (
    <Dashboard title="Editar Usuário">
        <MakeUser user={user} profiles={profiles} />
    </Dashboard>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.params!;
    const { data: user } = await serverApiFetch<IUserResponse>(ctx, `/User/${id}`);
    const { data: profiles } = await serverApiFetch<IUserProfileListResponse>(ctx, '/UserProfile');

    return {
        props: { user, profiles }
    };
};

export default EditUserPage;
