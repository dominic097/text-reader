import "./SearchBar.scss";
import { Col, Input, Row } from "antd";
import React from "react";

const { Search } = Input;

interface SearchBarProp {
  onSearch: (searchTxt: string) => void;
  isDisable?: boolean;
}

export const SearchBar = ({ onSearch, isDisable = false }: SearchBarProp) => {
  return (
    <Search
      disabled={isDisable}
      size="large"
      className="search-input"
      placeholder="input search text"
      onChange={(e) => {
        onSearch(e.currentTarget.value);
      }}
      onSearch={onSearch}
      enterButton
    />
  );
};
