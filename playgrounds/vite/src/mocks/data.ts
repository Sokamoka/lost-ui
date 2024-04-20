export interface PaymentData {
  id: string
  amount: number
  status: string
  name: string
  email: string
}

export const PAYMENT_DATA = [
  {
    id: '0',
    amount: 316,
    status: 'success',
    name: 'Ken Adulo',
    email: 'ken99@yahoo.com',
  },
  {
    id: '1',
    amount: 242,
    status: 'success',
    name: 'Abe Awerto',
    email: 'Abe45@gmail.com',
  },
  {
    id: '2',
    amount: 837,
    status: 'processing',
    name: 'Mortem Monsert',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '3',
    amount: 874,
    status: 'success',
    name: 'Silas Arturo',
    email: 'Silas22@gmail.com',
  },
  {
    id: '4',
    amount: 721,
    status: 'failed',
    name: 'Caramella Gartara',
    email: 'carmella@hotmail.com',
  },
  {
    id: '5',
    amount: -30,
    status: 'success',
    name: 'Ken Adulo',
    email: 'ken99@yahoo.com',
  },
  {
    id: '6',
    amount: -40,
    status: 'success',
    name: 'Abe Awerto',
    email: 'Abe45@gmail.com',
  },
  {
    id: '7',
    amount: 2,
    status: 'processing',
    name: 'Mortem Monsert',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '8',
    amount: 1,
    status: 'success',
    name: 'Silas Arturo',
    email: 'Silas22@gmail.com',
  },
  {
    id: '9',
    amount: 10,
    status: 'failed',
    name: 'Caramella Gartara',
    email: 'carmella@hotmail.com',
  },
] as PaymentData[]
