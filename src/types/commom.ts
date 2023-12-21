import { AxiosResponse } from 'axios'
import { Categories } from './category'
import { Organizer, OrganizerRecord } from './organizer'
import { Tournament } from './tournament'
import { Participant } from './participant'

export interface APIRes extends AxiosResponse {
  success: boolean
  data: Categories[]
  total: number
  additionalData: {
    totalCategories: number
  }
  message: string
  errorMessage?: unknown
}

export interface OrganizerAPIRes extends AxiosResponse {
  success: boolean
  data: OrganizerRecord[]
  total: number
  additionalData: {
    totalOrganizer: number
  }
  message: string
}

export interface OrganizerByIdAPIRes extends AxiosResponse {
  success: boolean
  data: Organizer
  message: string
}

export interface TournamentAPIRes extends AxiosResponse {
  success: boolean
  data: Tournament[]
  total: number
  additionalData: {
    totalTournament: number
  }
  message: string
  errorMessage?: unknown
}

export interface ParticipantAPIRes extends AxiosResponse {
  success: boolean
  data: Participant[]
  total: number
  additionalData: {
    totalTeamOfTournament: number
  }
  message: string
}

export interface ColumnTypes {
  id: string
  sortTable?: boolean
  label: string
  left?: boolean
  sortBy?: string
  style?: {
    filed: string
    width: string
  }
}
export interface ParamApi {
  sortType?: string
  page?: number
  size?: number
  keyword?: string
  sortValue?: string
  filterStatus?: string
  filterCategory?: string
  id?: number
}
