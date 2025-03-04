import { GameRoom } from '../../core/game-room/game-room.js'
import { Client } from '../../core/server/client.js'
import { ResponseTypes } from '../enums/enums.js'
import { AttackResults } from '../models/messages.model.js'
import { Player, Ship, Winner } from '../models/models.js'
import { createResponse } from './create-response.util.js'

export const userIsAuthorizedResponse = (player: Player) =>
  createResponse(ResponseTypes.Registration, {
    name: player.name,
    index: player.index,
    error: false,
    errorText: '',
  })

export const wrongPasswordResponse = () =>
  createResponse(ResponseTypes.Registration, {
    error: true,
    errorText: 'Wrong password',
  })

export const gameRoomsUpdateResponse = (gameRooms: GameRoom[]) =>
  createResponse(
    ResponseTypes.UpdateRoom,
    gameRooms.map(room => ({
      roomId: room.roomId,
      roomUsers: Object.values(room.roomUsers).map((user: Client) => ({
        name: user.clientState.playerData?.name,
        index: user.clientState.playerData?.index,
      })),
    })),
  )

export const winnersUpdateResponse = (winners: Winner[]) => createResponse(ResponseTypes.UpdateWinners, winners)

export const createGameResponse = (user: Client, gameRoom: GameRoom) =>
  createResponse(ResponseTypes.CreateGame, {
    idGame: gameRoom.game?.gameId,
    idPlayer: user.clientState.playerData?.temporaryGameId,
  })

export const startGameResponse = (playerId: number, ships: Ship[]) =>
  createResponse(ResponseTypes.StartGame, {
    ships,
    currentPlayerIndex: playerId,
  })

export const nextTurnResponse = (currentPlayerId: number) =>
  createResponse(ResponseTypes.NextTurn, { currentPlayer: currentPlayerId })

export const attackResultsResponse = (attackResults: AttackResults) =>
  createResponse(ResponseTypes.Attack, attackResults)

export const gameFinishedResponse = (playerId: number) =>
  createResponse(ResponseTypes.FinishGame, {
    winPlayer: playerId,
  })
