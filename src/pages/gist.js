import React, { useDebugValue, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Button, Spin, Row, Col, Card, Modal, Input, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import { get } from '../utils/api';

export default function gist() {
  const [gistData, setGistData] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);
  const [fileList, setFileList] = useState({});
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const router = useHistory();
  useEffect(() => {
    initPage();
    get('https://api.github.com/users/ZTaboo/gists', {
      per_page: 10,
      page: 1,
    }).then((r) => {
      let tmpList = [];
      for (let i = 0; i < r.length; i++) {
        tmpList.push(r[i]);
      }
      setGistData(tmpList);
      setApiStatus(true);
    });
  }, []);
  const nextPage = () => {
    let thisPage = localStorage.getItem('page');
    get('https://api.github.com/users/ZTaboo/gists', {
      per_page: 10,
      page: Number(thisPage) + 1,
    }).then((r) => {
      if (r.length <= 0) {
        message.warning('当前是最后一页数据');
      } else {
        let tmpList = [];
        for (let i = 0; i < r.length; i++) {
          tmpList.push(r[i]);
        }
        setGistData(tmpList);
        setApiStatus(true);
        localStorage.setItem('page', Number(thisPage) + 1);
      }
    });
  };
  const upPage = () => {
    let thisPage = localStorage.getItem('page');
    if (thisPage !== '1') {
      get('https://api.github.com/users/ZTaboo/gists', {
        per_page: 10,
        page: Number(thisPage) - 1,
      }).then((r) => {
        if (r.length <= 0) {
          message.warning('当前是最后一页数据');
        } else {
          let tmpList = [];
          for (let i = 0; i < r.length; i++) {
            tmpList.push(r[i]);
          }
          setGistData(tmpList);
          setApiStatus(true);
          localStorage.setItem('page', Number(thisPage) - 1);
        }
      });
    } else {
      message.warning('当前是第一页');
    }
  };
  const initPage = () => {
    localStorage.setItem('page', 1);
  };
  const openFile = (fileName, id) => {
    setOpen(true);
    let infoStatus = localStorage.getItem('info');
    if (infoStatus !== 'true') {
      message.info('请求可能稍慢，如果访问失败请检查是否可以访问gist');
      localStorage.setItem('info', 'true');
    }
    get('https://api.github.com/gists/' + id).then((r) => {
      setContent(r.files[fileName].content);
    });
  };
  return (
    <>
      <Modal
        title="文件查看"
        width="40%"
        open={open}
        onCancel={() => {
          setOpen(!open);
          setContent('');
        }}
      >
        <Input.TextArea autoSize value={content}></Input.TextArea>
      </Modal>
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
              userSelect: 'none',
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          <Button type="link" onClick={upPage}>
            上一页
          </Button>
          <Button style={{ marginLeft: '20px' }} type="link" onClick={nextPage}>
            下一页
          </Button>
        </div>
      </Layout>
    </>
  );
}
