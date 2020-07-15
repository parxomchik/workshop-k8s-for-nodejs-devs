import styled from 'styled-components';
import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export const SpinnerBox = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

function Spinner() {
  const antIcon = <LoadingOutlined style={{ fontSize: 160 }} spin />;
  return (
    <SpinnerBox>
      <Spin indicator={antIcon} />
    </SpinnerBox>
  );
}

export default Spinner;
