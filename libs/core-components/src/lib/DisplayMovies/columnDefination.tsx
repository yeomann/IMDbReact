import React, { useState } from 'react'
import { Button, Popconfirm, message, Typography, Tooltip } from 'antd'
import { DeleteOutlined, StarOutlined } from '@ant-design/icons'
import localStore from 'store'
import { TableColumnslocalStorage } from '@imbd-react-testing/constants'
import moment from 'moment'
import { MovieEvent } from '@imbd-react-testing/interfaces'
const { Paragraph } = Typography
const dataNow = (date: Date | string) => moment(date)

const MoviesColumn = (showDeleteFav: boolean, showDeleteWL: boolean, eventHandler: (id: number, eventType: MovieEvent) => void): any => {
  // get columns config from the local storage
  const columnsConfig: {
    visible: { id: string; content: string }[]
    visibleOrder: { string: number }
    hidden: { id: string; content: string }[]
  } = localStore.get(TableColumnslocalStorage.moviesConfigs)

  // confirm fave
  function confirm(e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, id: number, eventType: MovieEvent) {
    e?.preventDefault()
    console.log(id)
    eventHandler(id, eventType)
    // message.success('Click on Yes')
  }

  // cancel delete
  function cancel(e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) {
    e?.preventDefault()
    message.error('No Action taken')
  }
 

  const Columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      render: (id: string) => {
        return (
          <Paragraph copyable={{ text: id }} className="mb-0">
            <span className="truncate" style={{ width: '200px' }}>
              {id}
            </span>
          </Paragraph>
        )
      },
    },
    {
      title: 'Release Date',
      key: 'release_date',
      dataIndex: 'release_date',
      render: (release_date: string) => {
        return (
          <span>{dataNow(release_date as string).format('DD-MM-YYYY')}</span>
        )
      },
    },
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Action',
      fixed: 'right',
      width: '15%',
      // ellipsis: true,
      render: (node) => {
        // console.log(record)
        if(showDeleteFav) return (
          <Popconfirm
              title="Are you sure?"
              onConfirm={(e) => confirm(e, node.id, MovieEvent.REMOVE_FAV)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Remove Favourite?">
                <Button type="dashed" danger shape="circle" icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
        )
        if(showDeleteWL) return (
          <Popconfirm
              title="Are you sure?"
              onConfirm={(e) => confirm(e, node.id, MovieEvent.REMOVE_WATCHL)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Remove Watch later Movie!">
                <Button type="dashed" danger shape="circle" icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
        )
        return (
          <span>
            <Tooltip title="Set as Favourite">
              <Button type="dashed" danger shape="circle" icon={<StarOutlined />} onClick={(e) => confirm(e, node.id, MovieEvent.SET_FAV)} />
            </Tooltip>
            <Popconfirm
              title="Are you sure?"
              onConfirm={(e) => confirm(e, node.id, MovieEvent.SET_WATCHL)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="ml-half" type="dashed">Watch later</Button>
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  return Columns
}

export default MoviesColumn
