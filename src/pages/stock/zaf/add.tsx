import { GetServerSideProps, GetServerSidePropsResult, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { AutoComplete, AutoCompleteProps, Button, Card, Col, DatePicker, Flex, Form, InputNumber, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useState } from 'react';
import centers from '../../../data/centers.json'
import MakeZaf from '@/fragments/makeZaf';
import { ICenter, ICenterListResponse } from '@/interfaces/ICenters';
import { serverApiFetch } from '@/services/api_request';

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