import { SortDirection } from 'lost-ui-utils'
import type { ColumnsModel } from 'lost-ui-utils'

export interface UserColumns {
  id: number
  firstName: string
  lastName: string
  email: string
  gender: string
  type: string
}

export const USER_COLUMNS: ColumnsModel = {
  id: {
    title: 'Id',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'E-mail',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'id', direction: SortDirection.DESCEND }],
  },
  firstName: {
    title: 'First Name',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'First Name',
    },
    sortOrders: [],
  },
  lastName: {
    title: 'Last Name',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'Last Name',
    },
    sortOrders: [],
  },
  email: {
    title: 'E-mail',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'E-mail',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'email', direction: SortDirection.ASCEND }],
  },
  gender: {
    title: 'Gender',
    headerClass: 'text-left',
    headerData: {
      tooltip: 'Gender',
    },
    cellClass: 'text-left',
    sortOrders: [{ target: 'gender', direction: SortDirection.ASCEND }],
  },
}
