import { AttackStatus } from '../types/types.js'
import { Coordinates, Ship } from './models.js'

export interface Message<T> {
  type: string
  data: T
  id: number
}

export interface CreateUserData {
  name: string
  password: string
}

export interface AddShipsData {
  gameId: number
  ships: Ship[]
  indexPlayer: number
}

export interface RandomAttackData {
  indexPLayer: number
}

export interface AttackData extends RandomAttackData, Coordinates {}

export interface AttackResults {
  currentPlayer: number

  position: Coordinates
  status: AttackStatus
}
