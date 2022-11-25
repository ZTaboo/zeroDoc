import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import 'antd/dist/reset.css';
import styles from './index.module.css';
import { Button } from 'antd';
import { useHistory } from '@docusaurus/router';

function HomepageFeatures() {
  const history = useHistory();
  const toDocs = () => {
    history.push('/docs');
  };
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div>
          <div className={styles.font}>Welcome to ZeroDoc</div>
          <p className={styles.leftCon}>
            一个喜欢异想天开的家伙 💨
            <br />
            在这里记录知识，希望对你也有帮助。
          </p>
          <div className={styles.buttonBox}>
            <Button onClick={toDocs}>立即开始</Button>
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Zero Doc`} description="Zero Doc">
      <HomepageFeatures />
    </Layout>
  );
}
