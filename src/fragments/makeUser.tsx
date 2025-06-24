import { useNotification } from '@/hooks/notification';
import { IResponse } from '@/interfaces/IResponse';
import { IUser, IUserResponse } from '@/interfaces/IUser';
import { IUserProfile } from '@/interfaces/IUserProfile';
import { apiPost, apiPut } from '@/services/api_request';
import { Button, Card, Col, Flex, Form, Input, Row, Select, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
    user?: IUser;
    profiles: IUserProfile[];
}

const MakeUser = ({ user, profiles }: Props) => {
    const { openNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();

    const onSubmit = async (values: any) => {
        const body = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            password: values.password,
            email: values.email,
            profileId: values.profileId
        };

        setLoading(true);

        const request = user
            ? apiPut<IResponse<any>>(`/User/${user.id}`, body)
            : apiPost<IResponse<any>>('/User', body);

        request
            .then((res) => {
                openNotification('success', {
                    message: `user ${user ? 'atualizada' : 'criada'} com sucesso`,
                    description: `ID: ${res.data.id}`
                });
                router.push('/security/users');
            })
            .catch((err) => {
                openNotification('error', {
                    message: 'Erro ao salvar user',
                    description: `${err}`
                });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user]);

    return (
        <Card>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="firstName" label="Nome" rules={[{ required: true }]}>
                            <Input placeholder="Nome" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="lastName" label="Sobrenome" rules={[{ required: true }]}>
                            <Input placeholder="Sobrenome" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="username" label="Usuário" rules={[{ required: true }]}>
                            <Input placeholder="Usuário" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>

                {!user && (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="password" label="Senha" rules={[{ required: true }]}>
                                <Input.Password placeholder="Senha" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="confirmPassword" label="Confirmar Senha" rules={[{ required: true }]}>
                                <Input.Password placeholder="Confirmar Senha" />
                            </Form.Item>
                        </Col>
                    </Row>
                )}

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="profileId" label="Perfil" rules={[{ required: true }]}>
                            <Select
                                showSearch
                                placeholder="Selecione um perfil"
                                optionFilterProp="label"
                                options={profiles.map(p => ({
                                    value: p.id,
                                    label: p.profileName
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Flex justify="flex-end">
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Salvar
                    </Button>
                </Flex>
            </Form>
        </Card>
    );
};

export default MakeUser;
