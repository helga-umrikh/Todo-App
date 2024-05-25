export interface Task {
  id: number,
  title: string,
  description: string | null,
  expirationDate: Date,
  isDone: boolean
}
