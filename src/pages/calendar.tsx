import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton } from '@ionic/react';
import './Calendar.css';
import jsonData from '../data.json';
import { useHistory } from 'react-router';

const Calendar: React.FC = () => {
  const [tasksByDate, setTasksByDate] = useState<Record<string, string[]>>({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const history = useHistory();

  const handleNewTask = () => {
    history.push('/new-task');
  };
  const handleList = () => {
    history.push('/tasks');
  };

  useEffect(() => {

    const tasksGrouped: Record<string, string[]> = {};
    jsonData.tasks.forEach((task) => {
      if (!tasksGrouped[task.due_date]) {
        tasksGrouped[task.due_date] = [];
      }
      tasksGrouped[task.due_date].push(task.title);
    });
    setTasksByDate(tasksGrouped);
  }, []);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();


    const calendarDays = Array.from({ length: daysInMonth + firstDayOfMonth }, (_, index) => {
      const dayNumber = index - firstDayOfMonth + 1;
      const date = new Date(year, month, dayNumber);
      const formattedDate = date.toISOString().split('T')[0];
      const tasks = dayNumber > 0 && tasksByDate[formattedDate] ? tasksByDate[formattedDate] : [];

      return (
        <div key={index} className={`calendar-day ${dayNumber <= 0 ? 'empty-day' : ''}`}>
          <div className={`day-header ${formattedDate === new Date().toISOString().split('T')[0] ? 'today' : ''}`}>
            {dayNumber > 0 ? dayNumber : ''}
          </div>
          <div className="day-tasks">
            {tasks.map((task, idx) => (
              <div key={idx} className="task-item">
                {task}
              </div>
            ))}
          </div>
        </div>
      );
    });

    return calendarDays;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="page-wrapper">
          <h1>Calendario</h1>

          <div className="container-buttons">
            <IonButton expand="block" onClick={handleList} className="view-calendar-button btn_primary_custom reduced_width_btn">Lista de tareas</IonButton>
            <IonButton expand="block" onClick={handleNewTask} className="new-task-button btn_primary_custom reduced_width_btn">Nueva tarea</IonButton>
          </div>
          <div className="calendar-header">
            <IonButton onClick={() => handleMonthChange('prev')}>{'<'}</IonButton>
            <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <IonButton onClick={() => handleMonthChange('next')}>{'>'}</IonButton>
          </div>
          <div className="calendar-container">
            <div className="calendar-grid">{renderCalendar()}</div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
