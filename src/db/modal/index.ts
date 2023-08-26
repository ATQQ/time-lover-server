export interface User {
  userId?: string
  phone?: string
  joinTime?: Date
}

export interface Family {
  familyId?: string
  userId?: string
  name?: string
  deleted?: boolean
}

export interface Record {
  recordId?: string
  familyId?: string
  userId?: string
  weight?: number
  date?: Date
  tips?: string
  deleted?: boolean
}
