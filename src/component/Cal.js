import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Modal, Button, Input, Form, TimePicker } from 'antd';
import { format, parse, addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/calendarStyles.css'; // Include custom styles

// Use dateFnsLocalizer instead of momentLocalizer
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - newDate.getDay());
    return newDate;
  },
  getDay: (date) => date.getDay(),
  locales,
});

function Cal() {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsModalVisible(true);
  };

  const handleEventAdd = () => {
    if (eventTitle && selectedDate && startTime && endTime) {
      const eventStart = new Date(selectedDate);
      const eventEnd = addHours(new Date(selectedDate), endTime.getHours() - startTime.getHours());

      // Random color for the event (you can customize this logic)
      const eventColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Random color

      setEvents([
        ...events,
        {
          title: eventTitle,
          start: eventStart,
          end: eventEnd,
          color: eventColor,
        },
      ]);
      setIsModalVisible(false);
      setEventTitle('');
      setStartTime(null);
      setEndTime(null);
    } else {
      console.error("Invalid date, event title or time.");
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEventTitle('');
    setStartTime(null);
    setEndTime(null);
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color || '#3174ad',
      borderRadius: '5px',
      color: 'white',
      border: 'none',
    };
    return { style };
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Simple Scheduler</h2>
      <div className="calendar-wrapper">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, margin: '20px 0' }}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {/* Modal to add event */}
      <Modal
        title="Add Event"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose} className="modal-btn">
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleEventAdd} className="modal-btn">
            Add Event
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Event Title">
            <Input
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </Form.Item>
          <Form.Item label="Start Time">
            <TimePicker
              value={startTime}
              onChange={setStartTime}
              format="HH:mm"
              minuteStep={15}
              placeholder="Select start time"
            />
          </Form.Item>
          <Form.Item label="End Time">
            <TimePicker
              value={endTime}
              onChange={setEndTime}
              format="HH:mm"
              minuteStep={15}
              placeholder="Select end time"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Cal;
