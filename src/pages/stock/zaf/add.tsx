import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import Dashboard from '@/components/layouts/dashboard';
import MakeZaf from '@/fragments/makeZaf';
import { ICenter, ICenterListResponse } from '@/interfaces/ICenters';
import { serverApiFetch } from '@/services/api_request';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface Props {
    centers: ICenter[];
};

const ZafPage = ({ centers }: Props) => {


    return (
        <Dashboard title={'ZAF'}>
            <MakeZaf
                centers={centers}
            />
        </Dashboard >
    );
};

export const getServerSideProps: GetServerSideProps<Props> =
    async (ctx): Promise<GetServerSidePropsResult<Props>> => {
        const { data: centers } = await serverApiFetch<ICenterListResponse>(ctx, '/Centers');

        return {
            props: {
                centers
            }
        };
    }


export default ZafPage;