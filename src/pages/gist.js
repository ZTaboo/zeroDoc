import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Link from '@docusaurus/Link';

export default function gist() {
  return (
    <Layout title={`Zero Doc`} description="Zero Doc">
      <Result
        icon={<SmileOutlined />}
        title="此页面开发中"
        extra={<Link to={'/docs'}>返回首页</Link>}
      />
    </Layout>
  );
}
