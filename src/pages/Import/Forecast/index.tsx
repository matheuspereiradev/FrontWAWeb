import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Dashboard from '@/components/layouts/dashboard';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Layout, Progress, Upload, UploadProps, message, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

const uploadConfig: UploadProps = {
  name: 'file',
  multiple: false,
  action: 'https://httpbin.org/post',
  maxCount: 1,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const { Dragger } = Upload;

const ImportForecast = () => {
  const [percent, setPercent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = () => {
    if (intervalRef.current) return; // Evita múltiplos intervalos

    setIsModalVisible(true);
    setPercent(0);

    const duration = 3000; // 3 segundos
    const steps = 100;
    const intervalTime = duration / steps;

    intervalRef.current = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { t } = useTranslation('common');

  return (
    <Dashboard title={t('import-forecast')}>
      <Card style={{ minHeight: '80dvh' }}>
        <Flex gap='middle' vertical wrap>
          <span>Importador de Forecast Manual</span>
          <Dragger {...uploadConfig}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Clique ou arraste um arquivo para esta área</p>
            <p className="ant-upload-hint">
              Limite de 1 arquivo por importação
            </p>
          </Dragger>
          {percent > 0 &&
            <Modal
              title="Progresso da Importação"
              open={isModalVisible}
              onCancel={handleCancel}
              footer={null}
              centered
            >
              <Flex vertical align='center' gap='middle'>
                <Progress type="circle" percent={percent} />
                {percent == 100 && <span>Importação concluída</span>}
              </Flex>
            </Modal>
          }
        </Flex>

        <Flex gap='small' vertical
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            width: '100%'
          }}
        >
          <span style={{ fontSize: '12px' }}>Última vez executado em: 11/12/2024 5:44:37 PM</span>
          <Flex gap='middle'>
            <Button color='cyan' variant='outlined' block>Exportar modelo</Button>
            <Button type='primary' block onClick={startProgress}>Importar</Button>
          </Flex>
        </Flex>
      </Card>
    </Dashboard>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'pt', ['common'])),
    },
  };
}

export default ImportForecast;
