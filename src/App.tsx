import './App.scss';
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';
import React, { useState } from 'react';

import { FileViewer } from './components';

function App() {
  return (
    <Row className="App-body">
      <Col className="display-flex" flex="auto">
        <FileViewer></FileViewer>
      </Col>
    </Row>
  );
}

export default App;
