import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, startOfDay } from 'date-fns';

export default function CalendarPicker({ selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <button type="button" onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--primary-green)' }}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <strong style={{ color: 'var(--text-dark)' }}>{format(currentMonth, 'MMMM yyyy')}</strong>
      <button type="button" onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--primary-green)' }}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-body)' }}>
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return <div style={{ display: 'flex', marginBottom: '10px' }}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    const today = startOfDay(new Date());

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const isDisabled = isBefore(day, today);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day}
            onClick={() => !isDisabled && onDateSelect(cloneDay)}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '8px 0',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              color: isDisabled ? '#ccc' : !isCurrentMonth ? '#999' : isSelected ? '#fff' : 'var(--text-dark)',
              backgroundColor: isSelected ? 'var(--primary-green)' : 'transparent',
              borderRadius: '5px',
              fontWeight: isSelected ? 'bold' : 'normal',
              margin: '2px',
              transition: 'var(--transition)'
            }}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} style={{ display: 'flex' }}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const mockTimeSlots = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  return (
    <div className="calendar-picker" style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', marginBottom: '15px', backgroundColor: 'var(--bg-card)' }}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      {selectedDate && (
        <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--text-dark)' }}>Available slots for {format(selectedDate, 'MMM d')}:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {mockTimeSlots.map(time => (
              <button 
                key={time} 
                type="button" 
                style={{ padding: '6px 12px', border: '1px solid var(--primary-green)', borderRadius: '20px', background: 'transparent', color: 'var(--primary-green)', cursor: 'pointer', fontSize: '0.8rem' }}
                onClick={(e) => {
                  e.target.style.background = 'var(--primary-green)';
                  e.target.style.color = '#fff';
                  // Store time logic if needed
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
