import React from 'react';

const HeadBlock: React.FC<any> = (props) => {

  const { level, children } = props;
  const { nodeKey } = children[0].props;

  return (
    <>
      {React.createElement(`h${level}`, { className: 'article-nav', id: nodeKey, 'data-level': level }, children)}
    </>
  );
}

export default HeadBlock;