import React, { useContext, FC, useState } from 'react'
import { Tooltip, Modal, Form, Select, Button, message } from 'antd'
import { BiSort } from 'react-icons/bi'
import { SortDirection } from '__generated__/globalTypes'
import useGenericModal from 'utils/hooks/useGenericModal'
import { SortConstant } from 'constants/sort.constants'
import { enumToLabelAndValueArray } from 'utils/array'
// import { useIntl } from '../intlContext'

interface ITableSearchOrder {
  sortField: any
  sortTitle: string
  sortOnSubmit: (values) => void
  sortDefaultField: string
  sortOnRest: () => void
}

const TableSearchOrder: FC<ITableSearchOrder> = ({
  sortTitle,
  sortField,
  sortDefaultField,
  sortOnSubmit,
  sortOnRest,
}) => {
  const [form] = Form.useForm()
  // const intl = useIntl()
  const { isShowing, toggle } = useGenericModal()
  const directionArr = enumToLabelAndValueArray(SortDirection)
  const sortFieldArr = enumToLabelAndValueArray(sortField)
  const [lastApplied, setLastApplied] = useState({
    direction: SortConstant.direction,
    field: sortDefaultField,
  })

  const onFinish = (values: { direction: string; field: string }) => {
    if (form.isFieldsTouched()) {
      const fields: { direction: string; field: string } = form.getFieldsValue()
      if (fields.direction !== lastApplied.direction || fields.field !== lastApplied.field) {
        // copy in local
        setLastApplied({
          direction: values.direction as SortDirection,
          field: values.field,
        })
        toggle()
        return sortOnSubmit(values)
      }
    }
    return message.error('No changes detected')
  }
  const resetForm = () => {
    if (form.isFieldsTouched()) {
      const fields: { direction: string; field: string } = form.getFieldsValue()
      if (fields.direction !== SortConstant.direction || fields.field !== sortDefaultField) {
        sortOnRest()
      }
    }
    form.resetFields()
  }
  return (
    <>
      <Tooltip title={sortTitle}>
        <BiSort onClick={() => toggle()} className="tableTopBarIcon isSortIcon" />
      </Tooltip>
      <Modal
        title="Change column order"
        visible={isShowing}
        onCancel={() => toggle()}
        footer={false}
        width={800}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            direction: SortConstant.direction,
            field: sortDefaultField,
          }}
        >
          <Form.Item name="direction" label="Direction" rules={[{ required: true }]}>
            <Select options={directionArr} />
          </Form.Item>
          <Form.Item name="field" label="Field" rules={[{ required: true }]}>
            <Select options={sortFieldArr} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" className="mr-2">
              Apply Sorting
            </Button>
            <Button htmlType="button" onClick={resetForm} size="middle">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TableSearchOrder
