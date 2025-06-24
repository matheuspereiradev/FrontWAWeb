import { useNotification } from '@/hooks/notification';
import { ICenter } from '@/interfaces/ICenters';
import { IProduct, IProductListResponse } from '@/interfaces/IProducts';
import { IZaf, IZafResponse } from '@/interfaces/IZaf';
import { apiFetch, apiPost, apiPut } from '@/services/api_request';
import {
  Button, Card, Col, DatePicker, Flex, Form,
  Input, InputNumber, Radio, Row, Select
} from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface Props {
  centers: ICenter[];
  zaf?: IZaf;
}

const MakeZaf = ({ centers, zaf }: Props) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { openNotification } = useNotification();

  const onSubmit = async (values: any) => {
    const body = {
      productId: values.productId,
      centerId: values.centerId,
      adjustmentType: values.adjustmentType,
      adjustmentValue: values.adjustmentValue,
      targetZone: values.targetZone,
      description: values.description,
      effectiveFrom: values.interval[0].toISOString(),
      effectiveTo: values.interval[1].toISOString()
    };

    setLoading(true);

    const request = zaf
      ? apiPut<IZafResponse>(`/Zaf/${zaf.id}`, body)
      : apiPost<IZafResponse>('/Zaf', body);

    request
      .then((res) => {
        openNotification('success', {
          message: `ZAF ${zaf ? 'atualizada' : 'criada'} com sucesso`,
          description: `ID: ${res.data.id}`
        });
        router.push('/stock/zaf');
      })
      .catch((err) => {
        openNotification('error', {
          message: 'Erro ao salvar ZAF',
          description: `${err}`
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchProducts = async (centerId: number) => {
    try {
      const { data } = await apiFetch<IProductListResponse>(`/Centers/${centerId}/Products`);
      setProducts(data);
    } catch (err) {
      openNotification('error', {
        message: 'Erro ao buscar produtos',
        description: `${err}`
      });
      setProducts([]);
    }
  };

  const handleCenterChange = (centerId: number) => {
    form.setFieldsValue({ productId: undefined });
    fetchProducts(centerId);
  };

  useEffect(() => {
    if (zaf) {
      form.setFieldsValue({
        centerId: zaf.centerId,
        productId: zaf.productId,
        interval: [dayjs(zaf.effectiveFrom), dayjs(zaf.effectiveTo)],
        adjustmentType: zaf.adjustmentType,
        adjustmentValue: zaf.adjustmentValue,
        targetZone: zaf.targetZone,
        description: zaf.description
      });
      fetchProducts(zaf.centerId);
    }
  }, [zaf]);

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="centerId" label="Centro" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Selecione um centro"
                disabled={!!zaf}
                onChange={handleCenterChange}
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
                placeholder="Selecione um produto"
                disabled={!!zaf}
                options={products.map((p) => ({
                  value: p.id,
                  label: `${p.reference} - ${p.description}`
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="interval" label="Intervalo" rules={[{ required: true }]}>
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Card title="ZAF">
              <Form.Item
                name="adjustmentType"
                label="Tipo de Ajuste"
                rules={[{ required: true }]}
              >
                <Radio.Group
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                  options={[
                    { value: 'Percentage', label: 'Porcentagem (%)' },
                    { value: 'FlatValue', label: 'Valor' }
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="adjustmentValue"
                label="Valor do Ajuste"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={1000000000} step={0.1} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="targetZone"
                label="Zona"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  placeholder="Selecione uma zona"
                  options={[
                    { value: 'Red', label: 'Vermelho' },
                    { value: 'Yellow', label: 'Amarelo' },
                    { value: 'Green', label: 'Verde' }
                  ]}
                />
              </Form.Item>
            </Card>
          </Col>

          <Col span={12}>
            <Form.Item name="description" label="Observações">
              <Input.TextArea rows={6} placeholder="Adicione uma descrição" />
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

export default MakeZaf;
