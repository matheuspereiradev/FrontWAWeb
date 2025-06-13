import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { AutoComplete, AutoCompleteProps, Button, Card, Checkbox, Col, DatePicker, Flex, Form, InputNumber, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import centers from '../../../data/centers.json'

const { RangePicker } = DatePicker;

const BafPage = () => {
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
    <Dashboard title={'BAF'}>
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
            <Col span={18}>
              <Form.Item label="Intervalo">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Checkbox onChange={(e) => {
                console.log(`checked = ${e.target.checked}`);
              }}>Descartar consumos</Checkbox>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ajuste">
                <Select
                  showSearch
                  placeholder="Selecione um ajuste"
                  optionFilterProp="label"
                  onChange={onChange}
                  onSearch={onSearch}
                  options={[
                    {
                      label: 'Normal',
                      value: 1
                    }, {
                      label: 'Especial',
                      value: 2
                    }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Card title='Buffers' style={{ marginBottom: 24 }}>
            <Flex gap='middle'>
              <Card title='Sugestões de Buffer' style={{ width: '100%' }}>
                <Flex gap='middle' vertical>
                  <Checkbox onChange={(e) => {
                    console.log(`checked = ${e.target.checked}`);
                  }}>Usar demanda mensal</Checkbox>
                  <Row>
                    <Col span={12}>
                      <label>Demanda mensal</label>
                    </Col>
                    <Col span={12}>
                      <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                        console.log('changed', value);
                      }} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <label>ADU</label>
                    </Col>
                    <Col span={12}>
                      <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                        console.log('changed', value);
                      }} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button type='primary' htmlType="submit" block>Sugerir</Button>
                    </Col>
                  </Row>
                </Flex>
              </Card>
              <Card title='Zonas de Buffer' style={{ width: '100%' }}>
                <Flex gap='middle' vertical>
                  <Checkbox onChange={(e) => {
                    console.log(`checked = ${e.target.checked}`);
                  }}>Editar topos das zonas do Buffer</Checkbox>
                  <Row>
                    <Col span={8}>
                      <label>Zonas</label>
                    </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                      Topos
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <label>Green</label>
                    </Col>
                    <Col span={8}>
                      <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                        console.log('changed', value);
                      }} />
                    </Col>
                    <Col span={8}>
                      <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                        console.log('changed', value);
                      }} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <label>Yellow</label>
                    </Col>
                    <Col span={8}>
                      <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                        console.log('changed', value);
                      }} />
                    </Col>
                    <Col span={8}>
                      <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                        console.log('changed', value);
                      }} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <label>Red</label>
                    </Col>
                    <Col span={8}>
                      <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                        console.log('changed', value);
                      }} />
                    </Col>
                    <Col span={8}>
                      <InputNumber min={0} max={1000000000} defaultValue={0} step={0.1} onChange={(value) => {
                        console.log('changed', value);
                      }} />
                    </Col>
                  </Row>
                </Flex>
              </Card>
            </Flex>
          </Card>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Razão de ajuste">
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

export default BafPage;
