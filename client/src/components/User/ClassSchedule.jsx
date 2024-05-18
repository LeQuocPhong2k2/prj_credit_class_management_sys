import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Cookies from 'cookie-universal'
import { getClassSchedule } from '../../api/ClassSchedule'
import moment from 'moment-timezone'

export default function ClassSchedule() {
  const cookies = Cookies()
  const [evnets, setEvents] = useState([])

  const lessonTime = new Map()
  lessonTime.set('1-3', '06:30:00 - 09:00:00')
  lessonTime.set('4-6', '09:10:00 - 11:40:00')
  lessonTime.set('7-9', '12:30:00 - 15:00:00')
  lessonTime.set('10-12', '15:10:00 - 17:40:00')

  if (!cookies.get('accses_token')) {
    window.location.href = '/login'
  }
  useEffect(() => {
    document.title = 'Lịch học theo tuần'
    const featchData = async () => {
      try {
        const res = await getClassSchedule(localStorage.getItem('account_id'))
        if (res.status === 200) {
          const formattedEvents = res.data.classSchedule.map((item) => {
            let mapTimeLesson = lessonTime.get(item.classDetails.lesson)
            let classStartTime = mapTimeLesson.split(' - ')[0]
            let classEndTime = mapTimeLesson.split(' - ')[1]
            return {
              title: item.className,
              startRecur: moment(item.startTime).format('YYYY-MM-DD'),
              endRecur: moment(item.endTime).format('YYYY-MM-DD'),
              daysOfWeek: [item.classDetails.day - 1],
              startTime: classStartTime,
              endTime: classEndTime,
              extendedProps: {
                lesson: item.classDetails.lesson,
                type: item.classDetails.type === 'LT' ? 'Lý Thuyết' : 'Thực Hành',
                room: item.classDetails.room,
                instructor: item.teacher.userName,
                faculty: item.classDetails.facility
              }
            }
          })
          setEvents(formattedEvents)
        } else {
        }
      } catch (error) {}
    }
    featchData()
  }, [])

  const eventContent = (arg) => {
    return (
      <>
        <div>Thời gian: {arg.timeText}</div>
        <div>Môn học: {arg.event.title}</div>
        <div>
          Phòng: {arg.event.extendedProps.room} - <span className='text-xs'>{arg.event.extendedProps.faculty}</span>
        </div>
        <div>
          {arg.event.extendedProps.type} - Tiết: {arg.event.extendedProps.lesson}
        </div>
        <div>Giảng viên: {arg.event.extendedProps.instructor}</div>
      </>
    )
  }

  return (
    <div className='grid grid-flow-row pt-20 pl-40 pr-40 text-color-wrapper'>
      <div className='bg-white p-2 rounded h-88vh overflow-scroll'>
        <div>
          <span className='font-semibold'>Lịch học</span>
        </div>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, rrulePlugin]}
          initialView='timeGridWeek'
          slotMinTime='06:00:00'
          slotMaxTime='18:00:00'
          // events={[...morningEvents, ...eveningEvents]}
          events={evnets}
          eventContent={eventContent}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
          }}
          height='auto'
        />
      </div>
    </div>
  )
}
