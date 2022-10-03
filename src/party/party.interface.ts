export interface GetHostedPartyListRO {
  id: number
  shopName: string
  latitude: string
  longitude: string
  address: string
  extraAddress: string
  deadline: Date
  participantLimit: number
  status: {
    id: number
    code: string
    name: string
  }
  partyParticipantList: {
    id: number
    status: {
      id: number
      code: string
      name: string
    }
    user: {
      id: number
      nickname: string
    }
  }[]
}
