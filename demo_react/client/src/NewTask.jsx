import React from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import './new.css';
require('react-datepicker/dist/react-datepicker.css');
var NewTask = React.createClass({
     getInitialState: function getInitialState() {
	    return {
	      startDate: Moment(),
	      endDate: Moment()
	    };
	  },

	  handleChange: function handleChange(_ref) {
	    var startDate = _ref.startDate;
	    var endDate = _ref.endDate;

	    startDate = startDate || this.state.startDate;
	    endDate = endDate || this.state.endDate;

	    if (startDate.isAfter(endDate)) {
	      var temp = startDate;
	      startDate = endDate;
	      endDate = temp;
	    }

	    this.setState({ startDate: startDate, endDate: endDate });
	  },

	  handleChangeStart: function handleChangeStart(startDate) {
	    this.handleChange({ startDate: startDate });
	  },

	  handleChangeEnd: function handleChangeEnd(endDate) {
	    this.handleChange({ endDate: endDate });
	  },

    render: function() {
        return (
            <form action="/api/createTask" method="POST" className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="taskName" className="col-sm-2 control-label">Your task name</label>
                    <div className="col-sm-10">
                        <div className="input-group">
                            <input type="text" className="form-control" name="taskName" id="taskName" placeholder="Enter your Name" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="startDate" className="col-sm-2 control-label">Your Start date</label>
                    <div className="col-sm-10">
                        <div className="input-group">
                            <DatePicker
                                selected={this.state.startDate}
                                selectsStart startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChangeStart} 
                                className='form-control'
                                 name="startDate"
                                 id="startDate"/>
                            <input type="hidden" id="startDateVal" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="endDate" className="col-sm-2 control-label">Your End date</label>
                    <div className="col-sm-10">
                        <div className="input-group">
                            <DatePicker
                                selected={this.state.endDate}
                                selectsEnd startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={this.handleChangeEnd} 
                                className='form-control'
                                name="endDate"
                                id="endDate"/>
                            <input type="hidden" id="endDateVal" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="typeTask" className="col-sm-2 control-label">Type Task</label>
                    <div className="col-sm-3">
                        <select className="form-control" name="typeTask" id="typeTask">
                            <option value="Task">Task</option>
                            <option value="Bug">Bug</option>
                            <option value="Study">Study</option>
                            <option value="Review">Review</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="status" className="col-sm-2 control-label">Status</label>
                    <div className="col-sm-3">
                        <select className="form-control" id="status" name="status">
                            <option value="New">New</option>
                            <option value="Processing">Processing</option>
                            <option value="Pendding">Pendding</option>
                            <option value="Close">Close</option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-4">
                    <button type="submit" className="btn btn-primary btn-lg login-button">Register</button>
                </div>
            </form>

        );
    }
});
export default NewTask