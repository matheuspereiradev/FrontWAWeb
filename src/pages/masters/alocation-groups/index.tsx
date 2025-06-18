import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Dashboard from '@/components/layouts/dashboard';
import { Button, Card, Col, Flex, Form, Input, InputNumber, Row } from 'antd';

const AlocationGroups = () => {
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

export default AlocationGroups;
