import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Cookies from 'cookie-universal'
import { getClassSchedule } from '../../api/ClassSchedule'
import moment from 'moment-timezone'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import { MdAssignmentAdd } from 'react-icons/md'
import Form from 'react-bootstrap/Form'

export default function ClassSchedule() {
  const cookies = Cookies()
  const [evnets, setEvents] = useState([])
  const [openDialogNote, setOpenDialogNote] = useState(false)
  const [eventNote, setEventNote] = useState([])
  const [timeNoteStart, setTimeNoteStart] = useState('')
  const [timeNoteEnd, setTimeNoteEnd] = useState('')
  const [noteTile, setNoteTitle] = useState('')

  const lessonTime = new Map()
  lessonTime.set('1-3', '06:30:00 - 09:00:00')
  lessonTime.set('4-6', '09:10:00 - 11:40:00')
  lessonTime.set('7-9', '12:30:00 - 15:00:00')
  lessonTime.set('10-12', '15:10:00 - 17:40:00')

  if (!cookies.get('accses_token')) {
    window.location.href = '/login'
  }

  function handleAddNote() {
    const newNote = {
      title: 'Note',
      start: moment(timeNoteStart).format('YYYY-MM-DDTHH:mm:ss'),
      end: moment(timeNoteEnd === '' ? timeNoteStart : timeNoteEnd).format('YYYY-MM-DDTHH:mm:ss'),
      note: noteTile,
      backgroundColor: '#FF7F3E'
    }
    setEventNote([...eventNote, newNote])
    localStorage.setItem('eventNote', JSON.stringify([...eventNote, newNote]))
    setOpenDialogNote(false)
  }

  function handleClearNote() {
    localStorage.removeItem('eventNote')
    setEventNote([])
    setOpenDialogNote(false)
  }

  useEffect(() => {
    document.title = 'Lịch học theo tuần'
    setEventNote(JSON.parse(localStorage.getItem('eventNote')) || [])
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

  const eventContentNote = (arg) => {
    return (
      <>
        <div>
          {arg.event.title} - {arg.timeText}
        </div>
        <div>{arg.event.extendedProps.note}</div>
      </>
    )
  }

  function handleClose() {
    setOpenDialogNote(false)
  }

  function handleOpenDialogNote() {
    setOpenDialogNote(!openDialogNote)
  }

  return (
    <div className='grid grid-flow-row pt-20 pl-40 pr-40 text-color-wrapper'>
      <Dialog
        open={openDialogNote}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent className='w-96 p-4'>
          <div className='flex items-center justify-center gap-4'>
            <h5>Thêm ghi chú</h5>
            <Button onClick={handleClearNote}>Clear</Button>
          </div>
          <Form.Control
            required
            className='mt-2'
            type='datetime-local'
            placeholder='Select date and time'
            name='registrationCloseTime'
            id='timeNoteStart'
            onChange={(e) => setTimeNoteStart(e.target.value)}
          />
          <Form.Control
            required
            className='mt-2'
            type='datetime-local'
            placeholder='Select date and time'
            name='registrationCloseTime'
            id='timeNoteEnd'
            onChange={(e) => setTimeNoteEnd(e.target.value)}
          />
          <div>
            <input
              id='note'
              className='h-16 border-0 active:ring-0 focus:ring-0'
              type='text'
              placeholder='Nhập sự kiện cần ghi chú'
              onChange={(e) => setNoteTitle(e.target.value)}
            />
          </div>
          <DialogContentText
            className='flex justify-center items-center text-red-500'
            id='alert-dialog-description'
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddNote}>OK</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <div
        className='absolute left-20 p-1 flex items-center justify-center cursor-pointer bg-blue-500 active:bg-blue-400 text-white text-3xl'
        onClick={handleOpenDialogNote}
      >
        <MdAssignmentAdd />
      </div>

      <div className='bg-white p-2 rounded h-88vh overflow-scroll'>
        <div className='absolute'>
          <span className='font-semibold'>Lịch học</span>
        </div>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, rrulePlugin]}
          initialView='timeGridWeek'
          slotMinTime='06:00:00'
          slotMaxTime='18:00:00'
          events={[...evnets, ...eventNote]}
          eventContent={(arg) => {
            if (arg.event.backgroundColor === '#FF7F3E') {
              return eventContentNote(arg)
            } else {
              return eventContent(arg)
            }
          }}
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
