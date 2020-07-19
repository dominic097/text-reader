import "./SearchBar.scss";
import { Col, Input, Row } from "antd";
import React, { KeyboardEvent } from "react";

const { Search } = Input;

interface SearchBarProp {
  onSearch: (searchTxt: string) => void;
  isDisable?: boolean;
  onPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  onSearch,
  isDisable = false,
  onPressEnter,
}: SearchBarProp) => {
  return (
    <Search
      disabled={isDisable}
      size="large"
      className="search-input"
      placeholder="input search text"
      onChange={(e) => {
        onSearch(e.currentTarget.value);
      }}
      onPressEnter={onPressEnter}
      onSearch={onSearch}
      enterButton
    />
  );
};
