import React, { CSSProperties } from 'react';
import { Form, Input, Button, Checkbox, Card, message, Flex, Typography, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const Login: React.FC = () => {
    const screens = useBreakpoint();

    const { t } = useTranslation('common');
    const onFinish = (values: any) => {
        console.log('Login Info:', values);
        // Aqui você pode fazer a requisição para autenticação
        message.success('Login efetuado com sucesso!');
    };

    const loginContainerStyle: CSSProperties =
        screens.md ? {
            display: 'flex',
            backgroundColor: '#fff',
            borderRadius: '1rem',
            boxShadow: '-5px 5px 15px -10px #000000'
        } : {
            width: '100%',
            height: '100dvh'
        }

    const loginCardStyle: CSSProperties =
        screens.md ? {
            backgroundColor: '#1677ff',
            padding: '5rem',
            borderRadius: screens.md ? '0 1rem 1rem 0' : '0px',
        } : {
            backgroundColor: '#1677ff',
            width: '100%',
            height: '100dvh',
        }

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
            <div style={loginContainerStyle}>
                {
                    screens.md &&
                    <Flex style={{
                        padding: '5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography
                            style={{
                                display: 'inline-block',
                                maxWidth: '200px',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                fontSize: '24px',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: '#1677ff'
                            }}>
                            Tudo que você precisa em um <span style={{ fontWeight: '800', color: '#0a2549' }}>lugar só</span>
                        </Typography>
                        <Image
                            width={250}
                            src='login-page-image.png'
                            alt='login image'
                            preview={false}
                        />
                    </Flex>
                }
                <Flex style={loginCardStyle} align='center' justify='center'>
                    <Card title="Login" style={{ width: 250 }}>
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
                </Flex>
            </div>
        </div >
    );
};

export async function getStaticProps({ locale }: LanguageController) {

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
        },
    };
}

export default Login;
