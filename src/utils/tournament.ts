import dayjs from 'dayjs'
import { Tournament, TournamentRecord } from '../types/tournament'

export const convertTournament = (original: Tournament): TournamentRecord => {
  const fullName = []
  const eventDateArray = []
  for (const organizer of original.organizers) {
    fullName.push(organizer.firstName + ' ' + organizer.lastName)
  }
  for (const eventDate of original.eventDates) {
    const startAt = dayjs(new Date(eventDate.startAt)).format('hh:mm:ss A')
    const endAt = dayjs(new Date(eventDate.endAt)).format('hh:mm:ss A')
    const onDate = dayjs(new Date(eventDate.startAt)).format('DD/MM/YYYY')
    eventDateArray.push(onDate + ' ' + startAt + ' - ' + endAt)
  }

  return {
    id: original.id.toString(),
    title: original.title,
    category: original.category.name,
    organizers: fullName.join('; '),
    eventDates: eventDateArray.join('; '),
    createdAt: dayjs(new Date(original.createdAt)).format('DD/MM/YYYY hh:mm:ss A'),
    status: original.status
  }
}
