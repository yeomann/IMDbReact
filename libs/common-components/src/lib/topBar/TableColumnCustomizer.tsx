import { hot } from 'react-hot-loader/root'
import React, { useState, useContext, FC, memo } from 'react'
import { AppstoreOutlined, SaveFilled } from '@ant-design/icons'
import { Tooltip, Typography, Space, Button, Tag, message, Modal } from 'antd'
import localStore from 'store'
import { DraggableAreasGroup } from 'react-draggable-tags'
import './columnCustomizer.scss'
import { triggerResize } from 'utils/triggerResize'
import { delay } from 'lodash'
import useGenericModal from 'utils/hooks/useGenericModal'
// import { useIntl } from '../intlContext'
const { Paragraph } = Typography

const group = new DraggableAreasGroup()
const DraggableArea1 = group.addArea()
const DraggableArea2 = group.addArea()
const { Title } = Typography

interface ITableColumnCustomizer {
  forceUpdateComponent: any
  defaultHiddenColumns: any[]
  defaultVisibleColumns: any[]
  localStoreItemName: string
}
const TableColumnCustomizer: FC<ITableColumnCustomizer> = ({
  forceUpdateComponent,
  defaultHiddenColumns,
  defaultVisibleColumns,
  localStoreItemName,
}) => {
  // get columns config from the local storage
  const leadsColumnsConfig: {
    visible: { id: string; content: string }[]
    visibleOrder: { string: number }
    hidden: { id: string; content: string }[]
  } = localStore.get(localStoreItemName)
  console.log('leadsColumnsConfig=', leadsColumnsConfig)
  // const { forceUpdate } = useContext(TagsContext)
  // const intl = useIntl()
  const { isShowing: isShowingModal, toggle: toggleModal } = useGenericModal()
  const [visibleColumns, setVisibleColumns] = useState(
    leadsColumnsConfig === undefined ? defaultVisibleColumns : leadsColumnsConfig.visible,
  )
  const [hiddenColumns, setHiddenColumns] = useState(
    leadsColumnsConfig === undefined ? defaultHiddenColumns : leadsColumnsConfig.hidden,
  )

  const handleSave = () => {
    // save in local storage
    localStore.set(localStoreItemName, {
      visible: visibleColumns,
      visibleOrder: visibleColumns.map((c) => c.id),
      hidden: hiddenColumns,
    })
    // ui message
    message.success('Config of Columns saved successfully')
    // restart component
    forceUpdateComponent()
    // close modal
    toggleModal()

    // TODO: maybe move the triggerResize() ?
    delay(() => {
      // trigger the update of the horizonal slider bar
      triggerResize()
      console.log('triggerResize')
    }, 2000)
  }
  return (
    <>
      <Tooltip title="Customize Columns Layout">
        <AppstoreOutlined className="tableTopBarIcon" onClick={() => toggleModal()} />
      </Tooltip>
      <Modal
        title="Change column order"
        // isShowing={isShowingLeadColumns}
        // toggle={toggleLeadColumns}
        visible={isShowingModal}
        onCancel={() => toggleModal()}
        footer={false}
        width={800}
      >
        {/* defaultVisibleColumns= {JSON.stringify(defaultVisibleColumns)} */}
        {/* defaultHiddenColumns = {JSON.stringify(defaultHiddenColumns)} */}
        <Paragraph>
          Choose columns to show and drag to change order. Small screens may not display all
          columns.
        </Paragraph>
        {/* leftTags = {JSON.stringify(visibleColumns)}
        <br />
        <br />
        rightTags = {JSON.stringify(hiddenColumns)} */}
        <Space className="CrossArea d-flex justify-between">
          <div className="square">
            <Title level={5}>Visible Columns</Title>
            <DraggableArea1
              tags={visibleColumns}
              render={({ tag }) => <Tag className="columnTag">{tag.content}</Tag>}
              onChange={(leftTags: { content: string; id: string }[]) =>
                setVisibleColumns(leftTags as [])
              }
            />
          </div>
          <div className="square">
            <Title level={5}>Hidden Columns</Title>
            <DraggableArea2
              tags={hiddenColumns}
              render={({ tag }) => <Tag className="columnTag">{tag.content}</Tag>}
              onChange={(rightTags: { content: string; id: string }[]) =>
                setHiddenColumns(rightTags as [])
              }
            />
          </div>
        </Space>
        <Space className="mt-2 d-flex w-100 justify-between">
          <Button
            type="dashed"
            danger
            onClick={() => {
              // rest visible
              setVisibleColumns(defaultVisibleColumns)
              // reste hidden
              setHiddenColumns(defaultHiddenColumns)
            }}
          >
            Reset
          </Button>
          <span>
            <Button type="primary" icon={<SaveFilled />} onClick={handleSave}>
              Save
            </Button>
          </span>
        </Space>
      </Modal>
    </>
  )
}

export default hot(memo(TableColumnCustomizer))
