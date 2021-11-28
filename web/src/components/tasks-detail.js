import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import '../calender.css'

const localizer = momentLocalizer(moment)

const getDate = (addDay, addHour) => {
  var hour = 3600000
  var day = hour * 24
  var date = new Date()
  date.setTime(date.getTime() + day * addDay)
  date.setHours(9, 0, 0, 0)
  if (!addHour)
    return date
  
  date.setTime(date.getTime() + hour * addHour)
  return date
}

const TasksDetail = ({data}) => {
  let isFirst = true, dayTotal = 0, dayTmp
  let events = data.tasks.map(x => {
    let start, end
    if (dayTmp !== x.day) {
      isFirst = true
      dayTotal = 0
    }

    if (isFirst) {
      start = getDate(x.day)
      dayTotal += x.duration
      isFirst = false
      end = getDate(x.day, x.duration)
    }
    else {
      start = getDate(x.day, dayTotal)
      dayTotal += x.duration
      end = getDate(x.day, dayTotal)
    } 

    dayTmp = x.day
    return {
      title: x.taskId,
      start,
      end,
    }
  })

  return (
    <Calendar
      views={['month', 'week']}
      defaultView='week'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  )
}

export default TasksDetail