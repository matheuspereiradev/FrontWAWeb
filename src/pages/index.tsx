import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  ApartmentOutlined,
  CloudUploadOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { Bar } from '@ant-design/plots';
import { Card, Col, Layout, Menu, Row, Statistic } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const { Header, Content, Footer, Sider } = Layout;

const DashboardPage = () => {

  const { t } = useTranslation('common');

  const barConfig = {
    data: [
      { category: 'Jan', value: 38 },
      { category: 'Feb', value: 52 },
      { category: 'Mar', value: 61 },
      { category: 'Apr', value: 145 },
      { category: 'May', value: 48 },
      { category: 'Jun', value: 38 },
    ],
    xField: 'value',
    yField: 'category',
    seriesField: 'category',
    legend: { position: 'top-left' },
    colorField: 'category',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" width={250}>
        <div
          style={{
            height: 64,
            margin: 0,
            padding: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/wa-logo.png"
            alt="Logo"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        <Menu
          mode="inline"
          theme='dark'
          defaultOpenKeys={['inventory-management']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="inventory-management" icon={<ApartmentOutlined />}>
            {t('inventoryManagement')}
          </Menu.Item>

          <SubMenu key="stocks" icon={<DatabaseOutlined />} title={t('stocks')}>
            <Menu.Item key="stocks-zaf">{t('stocks-zaf')}</Menu.Item>
            <Menu.Item key="stocks-baf">{t('stocks-baf')}</Menu.Item>
            <Menu.Item key="stocks-daf">{t('stocks-daf')}</Menu.Item>
            <Menu.Item key="substitutions">{t('substitutions')}</Menu.Item>
            <Menu.Item key="stocks-sequence-by-center">{t('stocks-sequence-by-center')}</Menu.Item>
          </SubMenu>

          <SubMenu key="masters" icon={<SettingOutlined />} title={t('masters')}>
            <Menu.Item key="masters-calculated-columns">{t('masters-calculated-columns')}</Menu.Item>
            <Menu.Item key="masters-production-calendar">{t('masters-production-calendar')}</Menu.Item>
            <Menu.Item key="masters-variability-factor">{t('masters-variability-factor')}</Menu.Item>
            <Menu.Item key="masters-leadtime-factor">{t('masters-leadtime-factor')}</Menu.Item>
            <Menu.Item key="masters-buffer-profile">{t('masters-buffer-profile')}</Menu.Item>
            <Menu.Item key="masters-buffer-type">{t('masters-buffer-type')}</Menu.Item>
            <Menu.Item key="masters-allocation-group">{t('masters-allocation-group')}</Menu.Item>
            <Menu.Item key="masters-centers">{t('masters-centers')}</Menu.Item>
          </SubMenu>


          <SubMenu key="masters-orders" icon={<ShoppingCartOutlined />} title={t("orders")}>
            <Menu.Item key="orders-fake">{t("orders-fake")}</Menu.Item>
            <Menu.Item key="orders-transfer-tracking">{t("orders-transfer-tracking")}</Menu.Item>
            <Menu.Item key="orders-production-orders">{t("orders-production-orders")}</Menu.Item>
            <Menu.Item key="orders-purchase-orders">{t("orders-purchase-orders")}</Menu.Item>
            <Menu.Item key="orders-buffer-profile">{t("orders-buffer-profile")}</Menu.Item>
            <Menu.Item key="orders-buffer-type">{t("orders-buffer-type")}</Menu.Item>
            <Menu.Item key="orders-allocation-group">{t("orders-allocation-group")}</Menu.Item>
            <Menu.Item key="orders-centers">{t("orders-centers")}</Menu.Item>
          </SubMenu>

          <SubMenu key="continuous-improvement" icon={<SyncOutlined />} title={t("mastersContinuousImprovement")}>
            <Menu.Item key="improvement-reasons-list">{t("improvement-reasons-list")}</Menu.Item>
            <Menu.Item key="improvement-pending-reasons">{t("improvement-pending-reasons")}</Menu.Item>
            <Menu.Item key="improvement-stock-reasons-chart">{t("improvement-stock-reasons-chart")}</Menu.Item>
            <Menu.Item key="improvement-ddmrp-stock-management">{t("improvement-ddmrp-stock-management")}</Menu.Item>
            <Menu.Item key="improvement-ddmrp-buffer-accumulated">{t("improvement-ddmrp-buffer-accumulated")}</Menu.Item>
            <Menu.Item key="improvement-buffer-penetration-management">{t("improvement-buffer-penetration-management")}</Menu.Item>
            <Menu.Item key="improvement-ddmrp-buffer-accumulated-analytics">{t("improvement-ddmrp-buffer-accumulated-analytics")}</Menu.Item>
          </SubMenu>

          <SubMenu key="security" icon={<SafetyCertificateOutlined />} title={t("mastersSecurity")}>
            <Menu.Item key="security-profile">{t("security-profile")}</Menu.Item>
            <Menu.Item key="security-users">{t("security-users")}</Menu.Item>
            <Menu.Item key="security-change-password">{t("security-change-password")}</Menu.Item>
            <Menu.Item key="security-centers">{t("security-centers")}</Menu.Item>
            <Menu.Item key="security-importers">{t("security-importers")}</Menu.Item>
          </SubMenu>

          <SubMenu key="import" icon={<CloudUploadOutlined />} title={t("mastersImport")}>
            <Menu.Item key="import-forecast">{t("import-forecast")}</Menu.Item>
            <Menu.Item key="import-allocation-groups">{t("import-allocation-groups")}</Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0, paddingLeft: 24, display: 'flex', alignItems: 'center' }}>
          <h2 style={{ flex: 1 }}>Dashboard</h2>
          <LanguageSwitcher />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="Usuários Ativos" value={1128} />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="Vendas Hoje" value={934} suffix="R$" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="Visitas" value={7854} />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="Conversões" value={73} suffix="%" />
              </Card>
            </Col>
          </Row>

          <Card title="Desempenho Mensal" style={{ marginTop: 24 }}>
            <Bar {...barConfig} />
          </Card>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2025 Criado com Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'pt')),
    },
  };
}

export default DashboardPage;
