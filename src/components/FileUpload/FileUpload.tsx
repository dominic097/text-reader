import './FileUpload.scss';

import { Upload } from 'antd';
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export interface FileUploadProps {
  multiple?: boolean;
  action?: (file: File) => Promise<any>;
  onChange?: (info: any) => void;
}

export const FileUpload = (props: FileUploadProps) => {
  return (
    <section className="upload-control">
      <Dragger accept="text/plain" showUploadList={false} {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </section>
  );
};

FileUpload.defaultProps = {
  multiple: false,
};
