import "./FileViewer.scss";
import { Button, Col, Divider, Pagination, Row, Upload } from "antd";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { FileUpload, Marker, SearchBar } from "../";
import {
  fileReader,
  getSubStringIndex,
  MatchDataMeta,
  splitTextByIndex,
} from "../../common/utils";
import { useDebounce } from "../../hooks";

export interface FileViewerProps {
  file?: File;
  name?: string;
  size?: Number;
  type?: string;
  uid?: string;
  data?: string;
  searchText?: string;
}

export const FileViewer = (props: FileViewerProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [file, setFile] = useState<FileViewerProps>({});
  const [filterData, setFilterData] = useState<Array<MatchDataMeta>>([]);
  const [searchStrIndex, setSearchStrIndex] = useState<Array<number>>([]);
  const [currentPage, SetCurrentPage] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchText, 300);
  const disableHeader = !file.hasOwnProperty("data");

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      const searchStrIndex = getSubStringIndex(
        searchText,
        file.data || "",
        false
      );
      const filteredData = splitTextByIndex(
        searchStrIndex,
        searchText.length,
        file.data || ""
      );
      SetCurrentPage(1);
      setSearchStrIndex(searchStrIndex);
      setFilterData(filteredData);
    } else {
      resetData();
      SetCurrentPage(0);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setSearchText("");
    resetData();
    SetCurrentPage(0);
  }, [file]);

  useEffect(() => {
    const ele = document.getElementById(`${file.name}-${currentPage}`);
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const onFileUpload = (info: any) => {
    if (info.file.status !== "uploading") {
      fileReader(info.file, (data) => {
        setFile({
          ...props,
          ...info.file,
          data,
        });
      });
    }
  };

  const resetData = () => {
    setFilterData([
      {
        data: file.data || "",
        isSearchMatch: false,
      },
    ]);
    setSearchStrIndex([]);
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (searchStrIndex.length === 0) {
      SetCurrentPage(0);
    } else if (currentPage < searchStrIndex.length) {
      SetCurrentPage(currentPage + 1);
    } else {
      SetCurrentPage(1);
    }
  };

  const onPageChange = (page: number) => {
    SetCurrentPage(page);
  };
  let searchIdCounter = 1;
  return (
    <div className="FileViewer">
      <Row className="file-search-controller">
        <Col flex={3}>
          <SearchBar
            onPressEnter={onPressEnter}
            isDisable={disableHeader}
            onSearch={setSearchText}
          ></SearchBar>
        </Col>
        <Col>
          <Pagination
            current={currentPage}
            defaultCurrent={1}
            pageSize={1}
            disabled={disableHeader}
            simple
            total={searchStrIndex.length}
            onChange={onPageChange}
          ></Pagination>
        </Col>
        <Col flex={1}>
          <Upload
            accept="text/plain"
            showUploadList={false}
            onChange={onFileUpload}
          >
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        </Col>
      </Row>

      <Divider className="App-divider" orientation="left">
        File Viewer
      </Divider>
      <section id="file-upload-wrapper">
        {file.data && (
          <section className="file-content">
            {filterData.map((obj: MatchDataMeta, index: number) => (
              // <pre className="search-text-match">{obj.data}</pre>
              <Marker
                key={index}
                {...(obj.isSearchMatch
                  ? { id: `${file.name}-${searchIdCounter++}` }
                  : {})}
                {...obj}
              ></Marker>
            ))}
          </section>
        )}
        {!file.data && <FileUpload onChange={onFileUpload}></FileUpload>}
      </section>
    </div>
  );
};
