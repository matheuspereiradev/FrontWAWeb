import LanguageSwitcher from '@/components/fragments/LanguageSwitcher';
import {
  ApartmentOutlined,
  CloudUploadOutlined,
  DatabaseOutlined,
  DownOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';


import { Props } from '@/types/components/layouts/dashboard/props'
import Link from 'next/link';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ children, title }: Props) => {
  const [collapsed, setCollapsed] = useState(true);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" width={250} style={{ height: '100vh', overflowY: 'auto' }} collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 64,
            margin: 1,
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
        <div
          style={{
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LanguageSwitcher />
        </div>
        <Menu
          mode="inline"
          theme='dark'
          defaultOpenKeys={['inventory-management']}
          style={{ borderRight: 0 }}
        >
          <Menu.Item key="inventory-management" icon={<ApartmentOutlined />}>
            <Link href="/">Gerenciamento de estoques</Link>
          </Menu.Item>

          <SubMenu key="stocks" icon={<DatabaseOutlined />} title={'Estoques'}>
            <Menu.Item key="stocks-zaf"><Link href="/stock/zaf">ZAF</Link></Menu.Item>
            <Menu.Item key="stocks-baf"><Link href="/stock/baf">BAF</Link></Menu.Item>
            <Menu.Item key="stocks-daf"><Link href="/stock/daf">DAF</Link></Menu.Item>
            <Menu.Item key="substitutions">Substituições</Menu.Item>
            <Menu.Item key="stocks-sequence-by-center">Sequência por centro</Menu.Item>
          </SubMenu>

          <SubMenu key="masters" icon={<SettingOutlined />} title="Mestres">
            <Menu.Item key="masters-calculated-columns">Colunas calculadas</Menu.Item>
            <Menu.Item key="masters-production-calendar">Calendário Produtivo</Menu.Item>
            <Menu.Item key="masters-variability-factor">Fator de variabilidade (CV)</Menu.Item>
            <Menu.Item key="masters-leadtime-factor">Fator de leadtime</Menu.Item>
            <Menu.Item key="masters-buffer-profile">Perfil Buffer</Menu.Item>
            <Menu.Item key="masters-buffer-type">Tipo Buffer</Menu.Item>
            <Menu.Item key="masters-allocation-group"><Link href="/masters/alocation-groups">Grupo de Alocação</Link></Menu.Item>
            <Menu.Item key="masters-centers"><Link href="/masters/centers">Centros</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="orders" icon={<ShoppingCartOutlined />} title="Pedidos">
            <Menu.Item key="orders-fake"><Link href="/orders/orders-fake">Pedidos Fictícios</Link></Menu.Item>
            <Menu.Item key="orders-transfer-tracking">Acompanhamento de transferências</Menu.Item>
            <Menu.Item key="orders-production-orders">Ordens de produção</Menu.Item>
            <Menu.Item key="orders-purchase-orders">Ordens de compra</Menu.Item>
          </SubMenu>

          <SubMenu key="continuous-improvement" icon={<SyncOutlined />} title="Melhoria Contínua">
            <Menu.Item key="improvement-reasons-list">Lista Motivos</Menu.Item>
            <Menu.Item key="improvement-pending-reasons">Motivos Pendentes</Menu.Item>
            <Menu.Item key="improvement-stock-reasons-chart">Gráfico Motivos Estoques</Menu.Item>
            <Menu.Item key="improvement-ddmrp-stock-management">Gestão de Estoque DDMRP</Menu.Item>
            <Menu.Item key="improvement-ddmrp-buffer-accumulated">Acumulado de Buffer DDMRP</Menu.Item>
            <Menu.Item key="improvement-buffer-penetration-management">Gestão de Penetração Buffer</Menu.Item>
            <Menu.Item key="improvement-ddmrp-buffer-accumulated-analytics">Acumulado Buffers DDMRP Analítica</Menu.Item>
          </SubMenu>


          <SubMenu key="security" icon={<SafetyCertificateOutlined />} title="Segurança">
            <Menu.Item key="security-profile"><Link href="/security/user-profiles">Perfil</Link></Menu.Item>
            <Menu.Item key="security-users"><Link href="/security/users">Usuários</Link></Menu.Item>
            <Menu.Item key="security-change-password">Alterar Senha</Menu.Item>
            <Menu.Item key="security-centers">Segurança Centros</Menu.Item>
            <Menu.Item key="security-importers">Segurança Importadores</Menu.Item>
          </SubMenu>


          <SubMenu key="import" icon={<CloudUploadOutlined />} title="Importação">
            <Menu.Item key="import-forecast">
              <Link href="/import/forecast">Importar forecast</Link>
            </Menu.Item>
            <Menu.Item key="import-allocation-groups">Importar Grupos de Alocação</Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>

      <div style={{ height: '100vh', overflowY: 'auto', width: '100%' }}>
        <Header style={{
          position: 'sticky', top: '0', zIndex: '999',
          background: '#fff', padding: 0, paddingLeft: 35,
          display: 'flex', alignItems: 'center',
          boxShadow: '0px 5px 10px -10px #000000'
        }}>
          {collapsed ? (
            <MenuUnfoldOutlined
              className="trigger"
              onClick={() => setCollapsed(false)}
              style={{ fontSize: '20px', cursor: 'pointer', marginRight: 16 }}
            />
          ) : (
            <MenuFoldOutlined
              className="trigger"
              onClick={() => setCollapsed(true)}
              style={{ fontSize: '20px', cursor: 'pointer', marginRight: 16 }}
            />
          )}
          <h2 style={{ flex: 1 }}>{title}</h2>

        </Header>
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2025 Criado com Ant Design
          </Footer>
        </Layout>
      </div>
    </Layout>
  );
};

export default Dashboard;
