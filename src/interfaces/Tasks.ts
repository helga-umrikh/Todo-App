export interface Task {
  id: string,
  title: string,
  description: string | null,
  expirationDate: Date,
  isDone: boolean
}
