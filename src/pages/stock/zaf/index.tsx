import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Layout, Progress, Upload, UploadProps, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

const ZafPage = () => {
  const { t } = useTranslation('common');

  return (
    <Dashboard title={t('import-forecast')}>
      <Card style={{ minHeight: '75dvh' }}>
        <Flex gap='middle' vertical wrap>
            <h1>{t('import-forecast')}</h1>
        </Flex>
      </Card>
    </Dashboard>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
  };
}

export default ZafPage;
