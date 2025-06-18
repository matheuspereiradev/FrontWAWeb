import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { AutoComplete, AutoCompleteProps, Button, Card, Col, DatePicker, Flex, Form, InputNumber, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';

const centers = [
  { name: "São Paulo", id: "1", code: "SP" },
  { name: "Salvador", id: "2", code: "BA" },
  { name: "Fortaleza", id: "3", code: "CE" },
  { name: "Brasília", id: "4", code: "DF" },
  { name: "Rio de Janeiro", id: "5", code: "RJ" },
];

const { RangePicker } = DatePicker;

const OrdersPage = () => {
  const { t } = useTranslation('common');

  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [radioValue, setRadioValue] = useState(1);

  const handleSearch = (value: string) => {
    setOptions(() => {
      return [{
        label: 'a',
        value: 'a',
      }, {
        label: 'b',
        value: 'b',
      }, {
        label: 'c',
        value: 'c',
      }];
    });
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Dashboard title={'Pedidos Fictícios'}>
      <Card>
        <Form layout='vertical'>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Centro">
                <Select
                  showSearch
                  placeholder="Selecione um centro"
                  optionFilterProp="label"
                  onChange={onChange}
                  onSearch={onSearch}
                  options={
                    centers.map((center) => {
                      return {
                        value: center.code,
                        label: center.name
                      }
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Pedido">
                <AutoComplete
                  onSearch={handleSearch}
                  options={options}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Referência">
                <AutoComplete
                  onSearch={handleSearch}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Descrição">
                <AutoComplete
                  onSearch={handleSearch}
                  options={options}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item style={{ display: 'flex', alignItems: 'center' }} label="Quantidade">
                <InputNumber style={{width: '100%'}} min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                  console.log('changed', value);
                }} />
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
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Observação">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Flex justify='flex-end'>
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
