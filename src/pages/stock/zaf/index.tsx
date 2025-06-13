import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { AutoComplete, AutoCompleteProps, Button, Card, Col, DatePicker, Flex, Form, InputNumber, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useState } from 'react';
import centers from '../../../data/centers.json'

const { RangePicker } = DatePicker;

const ZafPage = () => {
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
    <Dashboard title={'ZAF'}>
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
              <Form.Item label="Referência">
                <AutoComplete
                  onSearch={handleSearch}
                  placeholder="input here"
                  options={options}
                />
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
          <Flex justify='center' style={{ marginBottom: 24 }}>
            <Card title={'ZAF'}>
              <Flex gap='middle'>
                <Form.Item label="Tipo">
                  <Radio.Group
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    }}
                    value={radioValue}
                    onChange={(e: RadioChangeEvent) => {
                      setRadioValue(e.target.value)
                    }}
                    options={[
                      { value: 1, label: 'Porcentagem (%)' },
                      { value: 2, label: 'Valor' }
                    ]}
                  />
                </Form.Item>
                <Form.Item style={{ display: 'flex', alignItems: 'center' }}>
                  <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                    console.log('changed', value);
                  }} />
                </Form.Item>
                <Flex gap='middle' style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                  <label>Zona</label>
                  <Select
                    showSearch
                    placeholder="Zona"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                      {
                        value: 1,
                        label: 'Red'
                      }, {
                        value: 2,
                        label: 'Yellow'
                      }, {
                        value: 3,
                        label: 'Green'
                      }
                    ]}
                  />
                </Flex>
              </Flex>
            </Card>
          </Flex>
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

export default ZafPage;
