import React, {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";
import {useSelector} from "react-redux";
import _ from 'lodash'
import {getAllCases} from "../../crud/user.crud";
const localizer = momentLocalizer(moment)
export default function Dashboard({userType = 'lawyer'}) {
  const { user } = useSelector(
    ({  auth: { user } }) => ({
      user
    })
  );
  const [eventsList, setEventsList] = useState([])
  useEffect(() => {
    getAllCases({userId: user._id, userType})
      .then(result => {
        console.log('result', result)
        if (result.data.success) {
          const hearings =  result.data.cases.map(c => c.details.hearings)
          console.log('hearings', hearings)
          const events = _.flattenDeep(hearings).map(hearing => {
            return {
              title: hearing.title,
              start: new Date(hearing.date) ,
              end: new Date(hearing.date) ,
              allDay: true
            }
          })
          console.log('events', events)
          setEventsList(events)
        } else {
          console.log('Something went wrong')
        }
      })
      .catch(error => console.log('error', error.message))

  }, [])

  return (
    <div className='pb-5'>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title='Cases'
        />
        <PortletBody>
          <Calendar
            localizer={localizer}
            events={eventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </PortletBody>
      </Portlet>
    </div>
  );
}
