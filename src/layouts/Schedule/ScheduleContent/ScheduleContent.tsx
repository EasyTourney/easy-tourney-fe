import React, { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ListScheduleColumn from './ListScheduleColumn/ListScheduleColumn'
import ScheduleCard from './ListScheduleColumn/ScheduleColumn/ListScheduleCard/ScheduleCard/ScheduleCard'
import {
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { mockDataBoardSchedule } from '../../../data/mockDataSchedule'
import { cloneDeep, isEmpty } from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'
import { generatePlaceholderCard } from '../../../utils/function'
import { CSS } from '@dnd-kit/utilities'
import { MatchDataType, ScheduleDataType } from '../../../types/schedule.type'
export type CollisionDetectionArgs = Parameters<CollisionDetection>[0]

const ScheduleContent = () => {
  const [columnData, setColumnData] = useState<ScheduleDataType[]>([])

  const [activeDragItemId, setActiveDragItemId] = useState<string | null>(null) //  Get the id of card being draging
  const [activeDragItemData, setActiveDragItemData] = useState<MatchDataType | null>(null) // Get the data of card being draging
  const [oldColumnWhenDragingCard, setOldColumnWhenDragingCard] = useState<any>(null) // Get old data when draging start

  // Final impact point
  const lastOverId = useRef<UniqueIdentifier | null>(null)

  // Sensors when start dragging card or cancle the operation
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 0, tolerance: 500 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  // Find id of column contain Card
  const findColumnByMatchCardId = (matchId: any) => {
    return columnData?.find((column: any) => column?.matchs?.map((match: any) => match.id).includes(matchId))
  }

  // Custom  collision detection algorithms
  const collisionDetectionStrategy = useCallback(
    (args: CollisionDetectionArgs) => {
      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)
      // If pointerIntersections is empty array => return and not do anything
      if (!pointerIntersections?.length) return

      //Find first overId  in intersction above
      let overId = getFirstCollision(pointerIntersections, 'id')

      if (overId) {
        const checkColumn = columnData?.find((column: ScheduleDataType) => column.eventDateId === overId)

        if (checkColumn) {
          const cardMatchIdsByColumn = columnData?.map((column: ScheduleDataType) => {
            if (column.eventDateId === checkColumn.eventDateId) {
              return column.matchs?.map((match: any) => match.id) || []
            }
          })
          const cardOrderIds = cardMatchIdsByColumn?.filter((item: any) => item !== undefined).flat()

          // Override columnId to card id with overId
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => container.id !== overId && cardOrderIds?.includes(container.id)
            )
          })[0]?.id
        }
        lastOverId.current = overId

        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [columnData]
  )

  const moveCardBetweenTwoColumns = (
    overColumns: ScheduleDataType,
    overCardId: string,
    active: any,
    over: any,
    activeColumns: ScheduleDataType,
    activeDragingCardId: string,
    activeDragingCardData: ScheduleDataType
  ) => {
    setColumnData((prev: any) => {
      const overCardIndex = overColumns?.matchs?.findIndex((match: any) => match.id === overCardId)
      // eslint-disable-next-line prefer-const

      let newCardIndex
      // rect : position of match relative to frame
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      // eslint-disable-next-line prefer-const
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumns?.matchs?.length + 1

      // Clone columnData to new array to handle data
      const nextColumns = cloneDeep(prev)
      const nextActiveColumns = nextColumns?.find((c: any) => c.eventDateId === activeColumns.eventDateId)
      const nextOverColumns = nextColumns?.find((c: any) => c.eventDateId === overColumns.eventDateId)

      const filterIdOfColumn = nextColumns?.map((column: any) => {
        if (column.eventDateId === nextActiveColumns.eventDateId) {
          return column.matchs?.map((match: any) => match.id) || []
        }
      })
      let cardOrderIds = filterIdOfColumn?.filter((item: any) => item !== undefined).flat()

      // Column old
      if (nextActiveColumns) {
        // Delete the dragging card from its column when dragging to a new column
        nextActiveColumns.matchs = nextActiveColumns?.matchs?.filter((match: any) => match.id !== activeDragingCardId)

        if (isEmpty(nextActiveColumns.matchs)) {
          nextActiveColumns.matchs = [generatePlaceholderCard(nextActiveColumns)]
        }
        // Update Id in column
        cardOrderIds = nextActiveColumns?.matchs?.map((match: MatchDataType) => match.id)
      }

      // Column new
      if (nextOverColumns) {
        // Check if the card that is pulling it exists in OverCloud or not => if it exists, delete it
        nextOverColumns.matchs = nextOverColumns?.matchs?.filter((c: MatchDataType) => c.id !== activeDragingCardId)
        // Add the currently dragged card to the column according to the new index position
        nextOverColumns.matchs = nextOverColumns.matchs?.toSpliced(newCardIndex, 0, {
          ...activeDragingCardData,
          eventDateId: nextActiveColumns?.eventDateId
        })
        nextOverColumns.matchs = nextOverColumns?.matchs?.filter((match: MatchDataType) => !match.FE_PlaceholderCard)
        // Update Id in column
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cardOrderIds = nextOverColumns?.matchs?.map((match: MatchDataType) => match.id)
      }
      return nextColumns
    })
  }

  // Trigger when start draging card
  const handleDragStart = (event: { active: any; over: any }) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.eventDateId) {
      setOldColumnWhenDragingCard(findColumnByMatchCardId(event?.active?.id))
    }
  }
  // Trigger during the card drag and drop process
  const handleDragOver = (event: { active: any; over: any }) => {
    const { active, over } = event
    // Check if over does not exist (drag miscellaneous items out then return immediately, avoid errors, avoid page crashes)
    if (!active || !over) return

    const {
      id: activeDragingCardId,
      data: { current: activeDragingCardData }
    } = active // Get id and data of card is draging

    const { id: overCardId } = over //overCardId: is the interactive card above or below the card being dragged

    // Find 2 columns dragged and dropped according to the matchId card
    const activeColumns = findColumnByMatchCardId(activeDragingCardId)
    const overColumns = findColumnByMatchCardId(overCardId)

    if (!activeColumns || !overColumns) return // If one of the two columns does not exist, return does nothing (avoid website crashes).

    if (activeColumns.eventDateId !== overColumns.eventDateId) {
      moveCardBetweenTwoColumns(
        overColumns,
        overCardId,
        active,
        over,
        activeColumns,
        activeDragingCardId,
        activeDragingCardData
      )
    }
  }

  // Trigger when end draging card
  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event

    // Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn, tránh lỗi, tránh crash trang)
    if (!active || !over) return

    const {
      id: activeDragingCardId,
      data: { current: activeDragingCardData }
    } = active

    const { id: overCardId } = over
    const activeColumns = findColumnByMatchCardId(activeDragingCardId)
    const overColumns = findColumnByMatchCardId(overCardId)

    if (!activeColumns || !overColumns) return

    // Check draging card between two column or inside a column
    if (oldColumnWhenDragingCard?.eventDateId !== overColumns.eventDateId) {
      // Draging card between two different columns
      moveCardBetweenTwoColumns(
        overColumns,
        overCardId,
        active,
        over,
        activeColumns,
        activeDragingCardId,
        activeDragingCardData
      )
    } else {
      // Draging card inside column
      const oldCardIndex = oldColumnWhenDragingCard?.matchs?.findIndex(
        (c: MatchDataType) => c.id === activeDragingCardId
      )
      const newCardIndex = oldColumnWhenDragingCard?.matchs?.findIndex((c: MatchDataType) => c.id === overCardId)

      const dndSortCards = arrayMove(oldColumnWhenDragingCard?.matchs, oldCardIndex, newCardIndex) // use arrayMove to sort card by index

      setColumnData((prev: any) => {
        const nextCard = cloneDeep(prev)
        const targetCard = nextCard?.find((column: ScheduleDataType) => column.eventDateId === overColumns.eventDateId)
        let cardMatchIds = prev
          ?.find((column: ScheduleDataType) => column.eventDateId === overColumns.eventDateId)
          ?.matchs?.map((match: MatchDataType) => match.id)
        targetCard.matchs = dndSortCards
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cardMatchIds = dndSortCards?.map((card: any) => card.id)

        return nextCard
      })
    }

    // Những dữ liệu sau khi kéo thả đều phải trả về giá trị ban đầu là null
    setActiveDragItemId(null)
    setActiveDragItemData(null)
    setOldColumnWhenDragingCard(null)
  }

  useEffect(() => {
    setColumnData(mockDataBoardSchedule?.columns as ScheduleDataType[])
  }, [])

  // Animation
  const dropAnimation: DropAnimation = {
    keyframes({ transform }) {
      return [
        { transform: CSS.Transform.toString(transform.initial) },
        {
          transform: CSS.Transform.toString({
            scaleX: 0.98,
            scaleY: 0.98,
            x: transform.final.x - 10,
            y: transform.final.y - 10
          })
        }
      ]
    },
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      collisionDetection={collisionDetectionStrategy} // Collision detection algorithms
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          width: '100%',
          height: 'calc(100vh - 64px - 3rem)',
          p: '1rem 0',
          borderRadius: '1rem',
          transition: 'all 0.5s ease'
        }}
      >
        <Box sx={{ fontWeight: '500', fontSize: '2rem', textAlign: 'center' }}>Schedule</Box>
        <ListScheduleColumn columnData={columnData} />

        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemId || !activeDragItemData) && null}
          {activeDragItemId && activeDragItemData && (
            <ScheduleCard card={activeDragItemData} activeDragItemId={activeDragItemId} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default ScheduleContent
