import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { AutoComplete, AutoCompleteProps, Button, Card, Col, DatePicker, Flex, Form, Input, InputNumber, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';

const centers = [
  { name: "São Paulo", id: "1", code: "SP" },
  { name: "Salvador", id: "2", code: "BA" },
  { name: "Fortaleza", id: "3", code: "CE" },
  { name: "Brasília", id: "4", code: "DF" },
  { name: "Rio de Janeiro", id: "5", code: "RJ" },
];

const OrdersPage = () => {
  return (
    <Dashboard title={'Grupos de alocação'}>
      <Card>
        <Form layout='vertical'>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Nome">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Flex vertical gap='small'>
                <label htmlFor="">Quantidade</label>
                <InputNumber style={{ width: '100%' }} min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                  console.log('changed', value);
                }} />
              </Flex>
            </Col>
            <Col span={12}>
              <Flex vertical gap='small'>
                <label htmlFor="">Peso</label>
                <InputNumber style={{ width: '100%' }} min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                  console.log('changed', value);
                }} />
              </Flex>
            </Col>
          </Row>
          <Flex justify='flex-end' style={{marginTop: '24px'}}>
            <Button type='primary' htmlType="submit">
              Salvar
            </Button>
          </Flex>
        </Form>
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

export default OrdersPage;
