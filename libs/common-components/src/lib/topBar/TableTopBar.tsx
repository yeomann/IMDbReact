// import CreateNew from './CreateNewIcon'

import { PageHeader, Space } from 'antd'
import React, { memo } from 'react'

// import { convertToGQlFilterQuery } from 'utils/filter'
// import { getNonEmptyValObject } from 'utils/Objects'

import TableFullScreenIcon from './TableFullScreen'
import TableCreateCSV from './TableCreateCSV'
import TablePagesize from './TablePagesize'
import TableRefetch from './TableRefetch'
import TableSearch from './TableSearch'
import TableColumnCustomizer from './TableColumnCustomizer'
import TableDensity from './TableDensity'

export interface IToolBarProps<T = unknown, N = unknown> {
  search:
    | {
        searchByArray: {
          key: string
          label: string
          type: string
        }[]
        defaultSearchkey: string
        defaultSearchkeyLabel: string
        defaultSearchkeyType: string
      }
    | boolean
  csv:
    | {
        csvButtonText: string
        csvTooltipTitle: string
        csvFunction: (csvColumns) => void
        csvDataSourceNode: {} | undefined
        csvDataSourceLength: number | undefined
        csvVisibleColumns: string[]
      }
    | boolean
  columnCustomizer:
    | {
        localStoreItemName: string
        defaultHiddenColumns: any[]
        defaultVisibleColumns: any[]
        forceUpdateComponent: any
      }
    | boolean
  fullScreen:
    | {
        id: string
      }
    | boolean
  density:
    | {
        densityState: string
        setDensityState: any
      }
    | boolean
  refetchQuery: any | boolean
  pageSize:
    | {
        pageSizeCount: number
        setPageSizeCount: any
        pageSizeOptions: string[]
        refetchWithPageSize: (n: number) => void
      }
    | boolean
  sort:
    | {
        sortTitle: string
        sortField: any
        sortOnSubmit: (values: { direction: string; field: string }) => void
        sortOnRest: () => void
        sortDefaultField: string
      }
    | boolean
}

const TableTopBar: React.FC<IToolBarProps> = ({
  search,
  csv,
  columnCustomizer,
  fullScreen,
  density,
  refetchQuery,
  pageSize,
  sort,
}) => {
  
  function clearSearch() {
  
  }

  /**
   * Get current filtesr validate and call Graphql
   */
  function applyFilters() {
    
  }
  function clearFilters() {
    
  }

  return (
    <PageHeader
      className="leads__header"
      title={[
        <Space className="mb-1" key="1">
          {typeof search !== 'boolean' && (
            <TableSearch
              key="0"
              clearSearch={clearSearch}
              callSearchQuery={callSearchQuery}
              defaultSearchkey={search.defaultSearchkey}
              defaultSearchkeyLabel={search.defaultSearchkeyLabel}
              defaultSearchkeyType={search.defaultSearchkeyType}
              searchByArray={search.searchByArray}
            />
          )}
        </Space>,
      ]}
      extra={[
        <Space key="4">
          {typeof csv !== 'boolean' && (
            <TableCreateCSV
              buttonText={csv.csvButtonText}
              tooltipTitle={csv.csvTooltipTitle}
              csvDataSourceNode={csv.csvDataSourceNode}
              csvFunction={csv.csvFunction}
              csvDataSourceLength={csv.csvDataSourceLength}
              csvVisibleColumns={csv.csvVisibleColumns}
            />
          )}
          {typeof pageSize !== 'boolean' && (
            <TablePagesize
              pageSize={pageSize.pageSizeCount}
              setPageSize={pageSize.setPageSizeCount}
              pageSizeOptions={pageSize.pageSizeOptions}
              refetchWithPageSize={pageSize.refetchWithPageSize}
            />
          )}
          {typeof columnCustomizer !== 'boolean' && (
            <TableColumnCustomizer
              localStoreItemName={columnCustomizer.localStoreItemName}
              defaultHiddenColumns={columnCustomizer.defaultHiddenColumns}
              defaultVisibleColumns={columnCustomizer.defaultVisibleColumns}
              forceUpdateComponent={columnCustomizer.forceUpdateComponent}
            />
          )}
          {typeof fullScreen !== 'boolean' && <TableFullScreenIcon id={fullScreen.id} key="2" />}
          {typeof density !== 'boolean' && (
            <TableDensity
              densityState={density.densityState}
              setDensityState={density.setDensityState}
            />
          )}
          {typeof refetchQuery !== 'boolean' && <TableRefetch refetchFunc={refetchQuery} />}
        </Space>,
      ]}
    />
  )
}
export default memo(TableTopBar)
