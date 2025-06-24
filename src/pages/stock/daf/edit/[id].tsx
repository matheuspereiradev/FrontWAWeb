import { GetServerSideProps } from 'next';
import Dashboard from '@/components/layouts/dashboard';
import { serverApiFetch } from '@/services/api_request';
import { ICenter, ICenterListResponse } from '@/interfaces/ICenters';
import { IDaf, IDafResponse } from '@/interfaces/IDaf';
import MakeDaf from '@/fragments/makeDaf';

interface Props {
    centers: ICenter[];
    daf: IDaf;
}

const DafEditPage = ({ centers, daf }: Props) => (
    <Dashboard title="Editar DAF">
        <MakeDaf centers={centers} daf={daf} />
    </Dashboard>
);

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const id = ctx.params?.id;
    const { data: centers } = await serverApiFetch<ICenterListResponse>(
        ctx,
        '/Centers'
    );
    const { data: daf } = await serverApiFetch<IDafResponse>(
        ctx,
        `/Daf/${id}`
    );

    return { props: { centers, daf } };
};

export default DafEditPage;
