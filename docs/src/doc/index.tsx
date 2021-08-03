import React, { useState, useEffect } from 'react';
import { Row, Col, Menu, Affix, Anchor } from 'antd';
import ReactMarkdown from 'react-markdown/with-html';
import { isEmpty } from "lodash";

import HeadBlock from './HeadBlock';

import 'github-markdown-css/github-markdown.css'
// import './index.less';

const { Link } = Anchor;

const articles = {
  '1': '/developer_guide.md',
  '2': '/user_manual.md'
}


/**
 * 
 * @param lists 
 * 这里只做两级处理
 */
export const navsToTree = (lists: any[]) => {
  if (isEmpty(lists)) return [];
  // 提取第一个level为最大level 后续比他大的一律为同级
  const maxLevel = lists[0].level;
  const newLists: any[] = [];
  lists.forEach((item: any) => {
    // 一级 同级
    if (item.level <= maxLevel) {
      newLists.push(item)
    } else {
      // 非同级
      if (newLists[newLists.length - 1].children) {
        newLists[newLists.length - 1].children.push(item)
      } else {
        newLists[newLists.length - 1].children = [item]
      }
    }
  })
  return newLists;
}



const NormalTest: React.FC<any> = () => {

  const [currentArticle, setCurrentArticle] = useState<{ url: string, content: any }>({ url: '', content: '' });

  const [treeNavs, setTreeNavs] = useState<any[]>([])

  // 初始为开发文档
  useEffect(() => {
    // console.log(1);

    changeCurrentArticle(articles['1'])
  }, [])

  // 这里是根据文档修改进行获取目录
  useEffect(() => {
    /**
    *  获取所有的文章标题
    */
    // console.log(currentArticle);

    const markdownNavs = document.querySelectorAll('.article-nav')
    const navs: any[] = [];
    markdownNavs.forEach((item: any) => {
      const level = item.getAttribute('data-level');
      const value = item.textContent;
      const nodeKey = item.id;
      navs.push({ level, value, nodeKey })
    })
    transArticleNavs(navs)

  }, [currentArticle.content])

  // 更改当前文档
  const changeCurrentArticle = async (url: string) => {
    const res = await fetch(url);
    const content = await res.text();
    setCurrentArticle({ ...currentArticle, content, url })
  }

  // 书籍导航点击
  const menuOnClick = (e: any) => {
    const url = articles[e.key]
    changeCurrentArticle(url)
  }

  // 转换为文章右侧目录
  const transArticleNavs = (navs: any) => {

    // 转换为二级导航
    const treedevelopDocs = navsToTree(navs);
    setTreeNavs(treedevelopDocs)

  }

  return (
    <>
      <Row className='articles'>
        <Col flex='200px' className="articles-list">
          <Affix offsetTop={24}>
            <Menu defaultSelectedKeys={['1']} onClick={menuOnClick} theme='light'>
              <Menu.Item key="1">开发文档</Menu.Item>
              <Menu.Item key="2">使用文档</Menu.Item>
            </Menu>
          </Affix>

        </Col>
        <Col flex='1' className='articles-content'>
          <div className='articles-content_wrpper'>
            <ReactMarkdown
              className="markdown-body"
              source={currentArticle.content}
              escapeHtml={false}
              renderers={{
                heading: HeadBlock
              }}
            />
          </div>
        </Col>
        <Col flex='200px' className="articles-menu">
          <Affix offsetTop={20} >
            <Anchor style={{ width: 160 }}>
              {
                treeNavs.map((item: any) => {
                  if (item.children) {
                    return (
                      <Link href={`#${item.nodeKey}`} title={item.value} key={item.nodeKey}>
                        {
                          item.children.map((childItem: any) => (
                            <Link href={`#${childItem.nodeKey}`} title={childItem.value} key={childItem.nodeKey} />
                          ))
                        }
                      </Link>
                    )
                  } else {
                    return (
                      <Link href={`#${item.nodeKey}`} title={item.value} key={item.nodeKey} />
                    )
                  }
                })
              }
            </Anchor>
          </Affix>
        </Col>
      </Row>
    </>
  );
};

export default NormalTest;
