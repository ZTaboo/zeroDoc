import React, { useDebugValue, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Button, Spin, Row, Col, Card } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import { get } from '../utils/api';

export default function gist() {
  const [gistData, setGistData] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);
  const [fileList, setFileList] = useState({});
  const router = useHistory();
  useEffect(() => {
    get('https://api.github.com/users/ZTaboo/gists', {
      per_page: 10,
      page: 1,
    }).then((r) => {
      console.log(r);
      let tmpList = [];
      for (let i = 0; i < r.length; i++) {
        tmpList.push(r[i]);
      }
      setGistData(tmpList);
      setApiStatus(true);
    });
  }, []);
  const openFile = (fileName, id) => {
    console.log(fileName, id);
  };
  return (
    <Layout title={`Zero Doc`} description="Zero Doc">
      {!apiStatus ? (
        <Spin
          tip="疯狂请求gist中......"
          size="large"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Row
            style={{
              width: '1500px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
            gutter={16}
          >
            {gistData.map((item) => {
              let tmpName = '';
              if (
                item.description === undefined ||
                item.description === null ||
                item.description === ''
              ) {
                tmpName = '未命名';
              } else {
                tmpName = item.description;
              }

              return (
                <Col key={item.id} xxl={6} xl={6} lg={8}>
                  <Card
                    title={tmpName}
                    extra={
                      <a href={item.html_url} target="_blank">
                        进入Gist
                      </a>
                    }
                    style={{ width: 300, marginBottom: '2rem' }}
                  >
                    <span>
                      文件列表 <br />
                    </span>
                    {Object.keys(item.files).map((f, i) => (
                      <Button
                        type="link"
                        key={i}
                        onClick={() => {
                          openFile(f, item.id);
                        }}
                      >
                        {f}
                      </Button>
                    ))}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </Layout>
  );
}
