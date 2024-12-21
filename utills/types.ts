export type Cart = {
  userId: string
  items: Array<{
    id: string
    price: number
    quantity: number
    imageString: string
    name: string
  }>
}

export type ProductOrder = {
  id: string
  productId: string
  name: string
  orderId: string
  price: number
  quantity: number
}
