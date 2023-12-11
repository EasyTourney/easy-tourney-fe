export interface Categories {
  id: number
  name: string
}

export interface CategoryName {
  categoryId: number
  categoryName: string
  createdAt: string
  deleted: boolean
  deletedAt: string | null
  updatedAt: string | null
}
