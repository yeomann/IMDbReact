import { hot } from 'react-hot-loader/root'
import React, { useState, useRef, ChangeEvent, FC } from 'react'
import { injectIntl } from 'react-intl'
import { SearchOutlined, CheckOutlined, SettingOutlined } from '@ant-design/icons'
import { Input, Radio, Button, Dropdown, Typography, Modal, Row, Col, Tag } from 'antd'
import { debounce } from 'lodash'

import { radioStyleBlock } from 'utils/radioStyleblock'
import './tableSearch.scss'
import useGenericModal from 'utils/hooks/useGenericModal'
import { RadioChangeEvent } from 'antd/lib/radio'
import { COMMON_OPTIONS, STRING_OPTIONS, NUMBER_OPTIONS } from 'utils/filterOptions'

const { Title } = Typography

interface ITableSearch {
  searchByArray: {
    key: string
    label: string
    type: string
  }[]
  defaultSearchkey: string
  defaultSearchkeyLabel: string
  defaultSearchkeyType: string
  clearSearch: any
  callSearchQuery: any
  intl: any
}
const TableSearch: FC<ITableSearch> = ({
  clearSearch,
  callSearchQuery,
  intl,
  searchByArray,
  defaultSearchkey,
  defaultSearchkeyLabel,
  defaultSearchkeyType,
}) => {
  const { isShowing, toggle } = useGenericModal()

  const [selectedSearchKey, setSelectedSearchKey] = useState<string>(defaultSearchkey)
  const [selectedSearchKeyLabel, setSelectedSearchKeyLabel] = useState<string>(
    defaultSearchkeyLabel,
  )
  const [selectedSearchKeyType, setSelectedSearchKeyType] = useState<string>(
    defaultSearchkeyType === 'string' ? 'iLike' : 'gte',
  )
  const [searkKeyIsNumber, setsearkKeyIsNumber] = useState<string>(defaultSearchkeyType)
  const searchInput = useRef(null)
  const [searchText, setSearchText] = useState<string>('')
  const delayedQuery = useRef(
    // debounce((q: string) => sendQuery(q), 500),
    debounce(
      (q: string, key: string, typeofKey: string) => callSearchQuery(q, key, typeofKey),
      500,
    ),
  ).current

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value
    setSearchText(searchTerm)
    // if search is backspaced to emptiness then trigger clear search
    if (searchTerm === '') return clearLiveSearch()
    // denbounce and search
    return delayedQuery(searchTerm, selectedSearchKey, selectedSearchKeyType)
  }

  const clearLiveSearch = () => {
    setSearchText('')
    // TODO: call to clear fitlers
    clearSearch()
  }

  const SearchOptions: FC<{ isSearchKeyNumber: string }> = ({ isSearchKeyNumber }) => {
    const THE_OPTIONS = isSearchKeyNumber === 'string' ? STRING_OPTIONS : NUMBER_OPTIONS
    return (
      <Row justify="center" align="top">
        <Col span={12}>
          <Title level={5} className="text-left">
            Fields
          </Title>
          <Radio.Group
            onChange={(e: RadioChangeEvent) => {
              // setSelectedSearchKey(id === 'string' ? 'notLike' : 'gte')
              setSelectedSearchKey(e.target.value)
              setSelectedSearchKeyLabel(e.target['data-label'])
              // also rest search
              setSearchText('')
              // // rest the searck key type
              // // if the previous operator != newOperator
              // // then reset the selectedSearchKeyType as well.
              if (searkKeyIsNumber !== e.target.id) {
                setsearkKeyIsNumber(e.target.id || '')
                const defaultTypeShouldBe = e.target.id === 'string' ? 'iLike' : 'gte'
                setSelectedSearchKeyType(defaultTypeShouldBe)
              }
            }}
            value={selectedSearchKey}
          >
            {searchByArray.map((s) => (
              <Radio
                key={s.key}
                style={radioStyleBlock}
                value={s.key}
                id={s.type}
                data-label={s.label}
              >
                {s.label}
              </Radio>
            ))}
          </Radio.Group>
        </Col>
        <Col span={12}>
          <Title level={5} className="text-left">
            Operator
          </Title>
          <Radio.Group
            onChange={(e: RadioChangeEvent) => {
              setSelectedSearchKeyType(e.target.value)
              // setSelectedSearchKeyLabel(e.target.la)
              // also rest search
              setSearchText('')
            }}
            value={selectedSearchKeyType}
            // defaultValue={isSearchKeyNumber === 'string' ? 'notLike' : 'gte'}
          >
            {THE_OPTIONS.map((r) => (
              <Radio key={r.value} style={radioStyleBlock} value={r.value}>
                {r.label}
              </Radio>
            ))}
          </Radio.Group>
        </Col>
      </Row>
    )
  }

  const { formatMessage } = intl
  return (
    <div className="d-inline-block mr-4">
      <Modal
        title="Choose search options from below"
        visible={isShowing}
        onCancel={() => toggle()}
        footer={false}
        width={800}
      >
        <SearchOptions isSearchKeyNumber={searkKeyIsNumber} />
      </Modal>
      <Dropdown.Button
        overlay={<></>}
        className="searchInputContainer"
        icon={<SettingOutlined className="searchInputContainerIcon" onClick={() => toggle()} />}
        trigger={['click']}
      >
        <Input
          ref={searchInput}
          // className={style.extInput}
          placeholder={
            formatMessage({ id: 'generic.topBar.liveSearchBy' }) + selectedSearchKeyLabel
          }
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          className="isSearchInput"
          value={searchText}
          onChange={changeSearchText}
          type={searkKeyIsNumber}
          // disabled={}
        />
      </Dropdown.Button>
      {/*
        {selectedSearchKeyType}
        <br />
        {searkKeyIsNumber}
        <span>
          <Tag>{selectedSearchKey}</Tag>
          <Tag>{selectedSearchKeyType}</Tag>
        </span>
      */}
      {searchText !== '' && (
        <Button
          className="ml-2"
          type="dashed"
          icon={<CheckOutlined />}
          danger
          onClick={clearLiveSearch}
        >
          Clear Search
        </Button>
      )}
    </div>
  )
}

export default hot(injectIntl(TableSearch))
