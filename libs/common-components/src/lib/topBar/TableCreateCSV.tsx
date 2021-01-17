import React, { useState } from 'react'
import { ExportOutlined } from '@ant-design/icons'
import { Tooltip, Button, Modal, Checkbox, Row, Alert, Col } from 'antd'
import useGenericModal from 'utils/hooks/useGenericModal'
import { csvConvertKey } from 'utils/csv'

interface IFilter<N = unknown> {
  tooltipTitle: string
  buttonText: string
  csvFunction: (csvColumns) => void
  csvDataSourceNode: {} | undefined
  csvDataSourceLength: number | undefined
  csvVisibleColumns: string[]
}
const TableCreateCSV: React.FC<IFilter> = ({
  tooltipTitle,
  buttonText,
  csvFunction,
  csvDataSourceNode,
  csvDataSourceLength,
  csvVisibleColumns,
}) => {
  // const intl = useIntl()
  const { isShowing, toggle } = useGenericModal()
  const [csvColumns, setCsvColumns] = useState<string[]>(csvVisibleColumns)

  const onChange = (checkedValues: string[]) => {
    console.log('checked values: ', checkedValues)
    setCsvColumns(checkedValues)
  }

  return (
    <>
      <Tooltip title={tooltipTitle}>
        <Button
          type="dashed"
          icon={<ExportOutlined className="tableTopBarIconInsideBtn" />}
          onClick={() => {
            // if (csvFunction !== undefined) return csvFunction()
            toggle()
          }}
        >
          {buttonText}
        </Button>
      </Tooltip>
      <Modal
        title="Choose columns to export"
        visible={isShowing}
        onCancel={() => toggle()}
        onOk={() => {
          csvFunction(csvColumns)
          toggle()
        }}
      >
        {csvDataSourceLength !== undefined &&
        csvDataSourceNode &&
        Object.keys(csvDataSourceNode).length > 0 ? (
          <>
            <Alert
              message={`You will export ${csvDataSourceLength} rows to CSV`}
              type="info"
              showIcon
            />
            <Checkbox.Group
              defaultValue={csvColumns}
              style={{ width: '100%', marginTop: '10px' }}
              onChange={onChange as any}
            >
              <Row>
                {Object.keys(csvDataSourceNode).map(
                  (key) =>
                    key !== '__typename' && (
                      <Col span={12} key={key}>
                        <Checkbox value={key}>{csvConvertKey(key)}</Checkbox>
                      </Col>
                    ),
                )}
              </Row>
            </Checkbox.Group>
          </>
        ) : (
          <span>No column</span>
        )}
      </Modal>
    </>
  )
}

export default TableCreateCSV
