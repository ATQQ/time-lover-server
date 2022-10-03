export interface User {
  userId?: string
  phone?: string
  joinTime?: Date
}

export interface Family {
  familyId?: string
  userId?: string
  name?: string
}

export interface Record {
  recordId?: string
  familyId?: string
  userId?: string
  weight?: number
  date?: Date
  tips?: string
}
