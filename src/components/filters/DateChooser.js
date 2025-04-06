import React, { useState, useEffect } from "react";
import "../../includes/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useGlobalContext } from "../../context";

const DateChooser = ({ label }) => {
    const { postData, writeStartEnds } = useGlobalContext();
    let initiallDate = postData.startEnds.minDate;
    if (label === 'End date') {
        initiallDate = postData.startEnds.maxDate;
    }
    const [selectedDate, setSelectedDate] = useState(initiallDate);

    const range = ((start, end, step) => {
        let returnArray = [];
        for (let i = start; i <= end; i += step) {
            returnArray.push(i);
        }
        return returnArray;
    });

    function addZero(n) { return n < 10 ? '0' + n : '' + n; }

    const changeDate = ((date) => {
        setSelectedDate(date);
        const tempDate = new Date(date);
        const dateString = tempDate.getFullYear() + '-' + addZero(tempDate.getMonth() + 1) + '-' + addZero(tempDate.getDate());
        if (label === 'End date') {
            writeStartEnds('maxDate', dateString, 1000);
        } else {
            writeStartEnds('minDate', dateString, 1000);
        }
    });

    const years = range(new Date(postData.startEnds.startDate).getFullYear(), new Date().getFullYear(), 1);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    useEffect(() => {
        let initiallDate = postData.startEnds.minDate;
        if (label === 'End date') {
            initiallDate = postData.startEnds.maxDate;
        }
        setSelectedDate(initiallDate);
    }, [postData, label]);

    return (
        <div className="date-picker">
            <span className="option-label">{label}</span>
            <DatePicker
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div
                        style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <button className="btn" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            {"<"}
                        </button>
                        <select
                            className="select"
                            value={months[new Date(date).getMonth()]}
                            onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                            }
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select"
                            value={new Date(date).getFullYear()}
                            onChange={({ target: { value } }) => changeYear(value)}
                        >
                            {years.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button className="btn" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            {">"}
                        </button>
                    </div>
                )
                }
                selected={selectedDate}
                onChange={(date) => changeDate(date)}
                minDate={new Date(postData.startEnds.startDate)}
                maxDate={new Date(postData.startEnds.endDate)}
                dateFormat="dd MMM yyyy"
            />
        </div>
    )

}

export default DateChooser