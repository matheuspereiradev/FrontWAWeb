import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { AutoComplete, AutoCompleteProps, Button, Card, Checkbox, Col, DatePicker, Flex, Form, Input, InputNumber, Radio, RadioChangeEvent, Row, Select } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import profiles from '../../../data/roles.json'

const UsersPage = () => {


  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Dashboard title={'Usuários'}>
      <Card>
        <Form layout='vertical'>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item label="Usuário">
                <Input placeholder="Usuário" />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Checkbox onChange={(e) => {
                console.log(`checked = ${e.target.checked}`);
              }}>Ativo</Checkbox>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Nome">
                <Input placeholder="Nome" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sobrenome">
                <Input placeholder="Sobrenome" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Cargo">
                <Select
                  showSearch
                  placeholder="Selecione um cargo"
                  optionFilterProp="label"
                  onChange={onChange}
                  onSearch={onSearch}
                  options={
                    profiles.map((profile) => {
                      return {
                        value: profile.id,
                        label: profile.name
                      }
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email">
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Senha">
                <Input type='password' />
              </Form.Item>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Form.Item label="Repita a Senha">
                <Input type='password' />
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

export default UsersPage;
