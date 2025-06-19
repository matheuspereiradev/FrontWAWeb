import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import Dashboard from '@/components/layouts/dashboard';
import MakeZaf from '@/fragments/makeZaf';
import { ICenter, ICenterListResponse } from '@/interfaces/ICenters';
import { IZaf, IZafResponse } from '@/interfaces/IZaf';
import { serverApiFetch } from '@/services/api_request';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface Props {
    centers: ICenter[];
    zaf: IZaf
};

const ZafPage = ({ centers, zaf }: Props) => {

    return (
        <Dashboard title={'ZAF'}>
            <MakeZaf
                centers={centers}
                zaf={zaf}
            />
        </Dashboard >
    );
};

export const getServerSideProps: GetServerSideProps<Props> =
    async (ctx): Promise<GetServerSidePropsResult<Props>> => {

        const id = ctx?.params?.id

        const { data: centers } = await serverApiFetch<ICenterListResponse>(ctx, '/Centers');
        const { data: zaf } = await serverApiFetch<IZafResponse>(ctx, `/Zaf/${id}`);

        return {
            props: {
                centers,
                zaf
            }
        };
    }


export default ZafPage;