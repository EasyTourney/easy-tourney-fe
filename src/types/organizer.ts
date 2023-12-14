export interface OrganizerRecord {
  id: number
  fullName: string
  email: string
  phoneNumber: string
  createdAt: string
  totalTournament: number
  dateOfBirth?: string
}
export interface Organizer {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth?: string
}
