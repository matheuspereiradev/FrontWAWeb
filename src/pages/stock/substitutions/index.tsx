import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Dashboard from '@/components/layouts/dashboard';
import { Button, Card, Checkbox, Col, DatePicker, Flex, Form, Input, InputNumber, Row, Table } from 'antd';
import { useState } from 'react';

const centers = [
  { name: "São Paulo", id: "1", code: "SP" },
  { name: "Salvador", id: "2", code: "BA" },
  { name: "Fortaleza", id: "3", code: "CE" },
  { name: "Brasília", id: "4", code: "DF" },
  { name: "Rio de Janeiro", id: "5", code: "RJ" },
];

const { RangePicker } = DatePicker;

const SubstituitionsPage = () => {
  const [selectedCentersKeys, setSelectedCentersKeys] = useState<React.Key[]>([]);

  const rowSelectionCenters = {
    selectedRowKeys: selectedCentersKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedCentersKeys(selectedKeys);
    },
  };

  const centerColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
    },
  ];

  return (
    <Dashboard title={'Substituições'}>
      <Card>
        <Row gutter={16}>
          <Col span={16}>
            <Form layout='vertical'>
              <Flex style={{ gap: '12px', width: '100%', marginBottom: '24px' }}>
                <Card>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Dias de hostórico">
                        <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                          console.log('changed', value);
                        }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Referência atual">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Descrição">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Referência nova">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Descrição">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Intervalo">
                        <RangePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Flex>
              <Flex gap='middle' style={{ marginBottom: '24px' }}>
                <Card title="Campos Históricos" style={{ width: '100%' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item>
                        <Checkbox>Estoque</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Checkbox>Entradas</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item>
                        <Checkbox>Trânsito</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Checkbox>Saídas</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item>
                        <Checkbox>Reservado</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Checkbox>Quantidade PD</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item>
                        <Checkbox>Demanda Qualificada</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Flex vertical gap='middle' style={{ width: '100%' }}>
                  <Card title="Copiar Diariamente">
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item>
                          <Checkbox>Estoque antigo ao novo</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item>
                          <Checkbox>Trânsito antigo ao novo</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item>
                          <Checkbox>Consumo antigo ao novo</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                  <Card title="Pedidos">
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item>
                          <Checkbox>Reatribuir pedidos</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Flex>
              </Flex>
              <Card title='DAF'>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Intervalo">
                      <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                      <Checkbox>Descartar consumo</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Flex gap='middle'>
                  <Form.Item label="DAF referência atual (%)">
                    <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                      console.log('changed', value);
                    }} />
                  </Form.Item>
                  <Form.Item label="DAF referência nova (%)">
                    <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                      console.log('changed', value);
                    }} />
                  </Form.Item>
                </Flex>
                <Card title='DAF'>
                  <Flex gap='middle'>
                    <Card title='Atual' style={{width: '100%'}}>
                      <Table
                        dataSource={[]}
                        columns={[]}
                        size='small'
                        rowKey="id"
                        pagination={false}
                      />
                    </Card>
                    <Card title='Novo' style={{width: '100%'}}>
                      <Table
                        dataSource={[]}
                        columns={[]}
                        size='small'
                        rowKey="id"
                        pagination={false}
                      />
                    </Card>
                  </Flex>
                </Card>
              </Card>
            </Form>
          </Col>
          <Col span={8}>
            <Card>
              <Table
                dataSource={centers}
                rowSelection={rowSelectionCenters}
                columns={centerColumns}
                size='small'
                rowKey="id"
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </Dashboard >
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
  };
}

export default SubstituitionsPage;
