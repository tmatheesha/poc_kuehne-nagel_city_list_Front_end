/*
 * Customer Data Platform 12.7.2022
 * Copyright © 2022 Dialog. All rights reserved.
 */

import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import "./styles.less";
import {DEFAULT_TABLE_PAGE_SIZE} from "../../utilities/constants/commonStrings";

const ViewBoxFooter = ({
  defaultCurrent,
  total,
  showSizeChanger,
  onChange,
  current,
  pageSize,
  onShowSizeChange,
  pageSizeOptions,
  showTotal,
  hideOnSinglePage,
  disabled,
}) => {
  return (
    <Pagination
      className="view-box-pagination"
      onChange={onChange}
      showSizeChanger={showSizeChanger}
      defaultCurrent={defaultCurrent}
      current={current}
      total={total}
      pageSize={pageSize}
      hideOnSinglePage={hideOnSinglePage}
      onShowSizeChange={onShowSizeChange}
      pageSizeOptions={pageSizeOptions}
      showTotal={showTotal}
      disabled={disabled}
    />
  );
};
ViewBoxFooter.propTypes = {
  current: PropTypes.number,
  showSizeChanger: PropTypes.bool,
  total: PropTypes.any.isRequired,
  pageSize: PropTypes.number,
};

ViewBoxFooter.defaultProps = {
  current: 1,
  hideOnSinglePage: true,
  showSizeChanger: false,
  pageSize: DEFAULT_TABLE_PAGE_SIZE,
  showTotal: false,
};

export default ViewBoxFooter;
