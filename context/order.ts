import { createDomain } from 'effector'

const order = createDomain()

interface IOrderDetails {
  name: string
  surname: string
  lastName: string
  email: string
  phone: string
  message: string
}

export const setOrderDetails = order.createEvent<IOrderDetails>()

export const $orderDetails = order
  .createStore<IOrderDetails>({} as IOrderDetails)
  .on(setOrderDetails, (_, value) => value)