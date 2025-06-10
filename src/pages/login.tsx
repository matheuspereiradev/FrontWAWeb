import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {

    const { t } = useTranslation('common');
    const onFinish = (values: any) => {
        console.log('Login Info:', values);
        // Aqui você pode fazer a requisição para autenticação
        message.success('Login efetuado com sucesso!');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
            <Card title="Login" style={{ width: 300 }}>
                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Usuário" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Lembrar-me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export async function getStaticProps({ locale }) {

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
        },
    };
}

export default Login;
