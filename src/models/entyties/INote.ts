import { ITasks } from './ITasks'

export interface INote {
  name: string
  checked: boolean
  tasks: ITasks[]
}
