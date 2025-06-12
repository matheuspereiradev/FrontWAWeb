import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';

const BafPage = () => {
  const { t } = useTranslation('common');

  return (
    <Dashboard title={t('stocks-baf')}>
        <h1>Bem-vinde</h1>
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

export default BafPage;
