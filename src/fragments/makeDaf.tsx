// @/fragments/MakeDaf.tsx
import { useNotification } from '@/hooks/notification';
import { ICenter } from '@/interfaces/ICenters';
import { IDaf, IDafResponse } from '@/interfaces/IDaf';
import { IProduct, IProductListResponse } from '@/interfaces/IProducts';
import { apiFetch, apiPost, apiPut } from '@/services/api_request';
import {
  Button, Card, Col, DatePicker, Flex, Form,
  Input, InputNumber, Radio, Row, Select, Switch
} from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface Props {
  centers: ICenter[];
  daf?: IDaf;
}

const MakeDaf = ({ centers, daf }: Props) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<IProduct[]>([]);
  const router = useRouter();
  const { openNotification } = useNotification();

  const onSubmit = async (values: any) => {
    const body = {
      productId: values.productId,
      centerId: values.centerId,
      adjustmentType: values.adjustmentType,
      adjustmentValue: values.adjustmentValue,
      description: values.description,
      effectiveFrom: values.interval[0].toISOString(),
      effectiveTo: values.interval[1].toISOString(),
      isActive: values.isActive
    };

    const promise = daf
      ? apiPut<IDafResponse>(`/Daf/${daf.id}`, body)
      : apiPost<IDafResponse>('/Daf', body);

    promise
      .then((res) => {
        openNotification('success', {
          message: 'DAF salvo com sucesso',
          description: `ID: ${res.data.id}`
        });
        router.push('/stock/daf');
      })
      .catch((err) => {
        openNotification('error', {
          message: 'Erro ao salvar DAF',
          description: `${err}`
        });
      });
  };

  const fetchProducts = async (centerId: number) => {
    try {
      const { data } = await apiFetch<IProductListResponse>(
        `/Centers/${centerId}/Products`
      );
      setProducts(data);
    } catch (err) {
      openNotification('error', {
        message: 'Erro ao buscar produtos',
        description: `${err}`
      });
      setProducts([]);
    }
  };

  const handleCenterChange = (value: number) => {
    form.setFieldsValue({ productId: undefined });
    fetchProducts(value);
  };

  useEffect(() => {
    if (daf) {
      form.setFieldsValue({
        centerId: daf.centerId,
        productId: daf.productId,
        interval: [dayjs(daf.effectiveFrom), dayjs(daf.effectiveTo)],
        adjustmentType: daf.adjustmentType,
        adjustmentValue: daf.adjustmentValue,
        description: daf.description,
        isActive: daf.isActive
      });
      fetchProducts(daf.centerId);
    }
  }, [daf]);

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="centerId" label="Centro" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Selecione o centro"
                onChange={handleCenterChange}
                disabled={!!daf}
                options={centers.map((c) => ({
                  value: c.id,
                  label: `${c.code} - ${c.description}`
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="productId" label="Produto" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Selecione o produto"
                disabled={!!daf}
                options={products.map((p) => ({
                  value: p.id,
                  label: `${p.reference} - ${p.description}`
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="interval" label="Período" rules={[{ required: true }]}>
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="adjustmentType"
              label="Tipo de Ajuste"
              rules={[{ required: true }]}
              initialValue="FlatValue"
            >
              <Radio.Group
                options={[
                  { label: 'Valor', value: 'FlatValue' },
                  { label: 'Porcentagem (%)', value: 'Percentage' }
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="adjustmentValue"
              label="Valor do Ajuste"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="isActive" label="Ativo" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Descrição">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};

export default MakeDaf;
