// import { topBarSearchArray, removeObjectFromArrayByKey } from 'utils/array'
// import { csvConvertKey } from 'utils/csv'
// import { FORBIDDEN_COLUMNS } from 'constants/array.constants'
import { keyToValue } from '@imbd-react-testing/utils';
/*
 * Table defaults
 */
export const TableDefaults = {
  tableSize: 20,
  pagination: {
    initialPage: 1,
  },
  quickDrawer: {
    id: 0,
    isOpen: false,
  },
  density: {
    tableSize: 'middle',
  },
};

// export const DefaultVisibleColumns = [
//   {
//     content: 'ID',
//     id: 'id',
//     type: 'string',
//   },
//   {
//     content: 'Tag',
//     id: 'value',
//     type: 'string',
//   },
// ]
export const DefaultVisibleColumns = (nodes: any) => {
  const columns = Object.keys(nodes).map((key) => {
    return {
      id: key,
      content: keyToValue(key),
    };
  });
  return columns;
};
export const DefaultHiddenColumns = [];

// export const TagsTopBar = (nodes: {}) => {
//   return {
//     columns: {
//       defaultVisibleColumns: DefaultVisibleColumns(nodes),
//       defaultHiddenColumns: DefaultHiddenColumns,
//     },
//     search: {
//       defaultSearchkey: 'value',
//       defaultSearchkeyLabel: 'Tag value',
//       defaultSearchkeyType: 'string',
//       searchByArray: topBarSearchArray(DefaultVisibleColumns(nodes)),
//       // [
//       //   {
//       //     key: 'value',
//       //     label: 'Tag',
//       //   },
//       // ],
//     },
//   };
// };
