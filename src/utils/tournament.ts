import dayjs from 'dayjs'
import { Tournament, TournamentRecord } from '../types/tournament'
import { convertFormatTime } from './function'

export const convertTournament = (original: Tournament): TournamentRecord => {
  const fullName = []
  const eventDateArray = []
  for (const organizer of original.organizers) {
    fullName.push(organizer.firstName + ' ' + organizer.lastName)
  }
  for (const eventDate of original.eventDates) {
    const startAt = convertFormatTime(eventDate.startTime)
    const endAt = convertFormatTime(eventDate.endTime)
    const onDate = dayjs(new Date(eventDate.date)).format('DD/MM/YYYY')
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
