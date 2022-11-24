import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

// function HomepageHeader() {
//   const { siteConfig } = useDocusaurusContext();
//   return (
//     <header className={clsx('hero--primary', styles.heroBanner, styles.hero)}>
//       <div className="container">
//         <h1 className="hero__title" style={{ color: 'white' }}>
//           {siteConfig.title}
//         </h1>
//         <p className="hero__subtitle" style={{ color: 'white' }}>
//           {siteConfig.tagline}
//         </p>
//         <div className={styles.buttons}>
//           <Link className="button button--secondary button--lg" to="/docs">
//             立即开始
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

function HomepageFeatures() {
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
          <Link className="button button--secondary button--lg" to="/docs">
            立即开始
          </Link>
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
