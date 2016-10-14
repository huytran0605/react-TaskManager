import React, { Component } from 'react';
import Moment from 'moment';
import './App.css';
class List extends Component {
    // Constructor is responsible for setting up props and setting initial stte
    constructor(props) {
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            tasks: []
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        var self = this;
        fetch('/api/list').then(function (response) {
            var contentType = response.headers.get("content-type");
            if (response.ok) {
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function (json) {
                        self.setState({ tasks: json });
                    });
                } else {
                    console.log("No JSON!");
                }
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }
    render() {
        return (
            <div>
                <FilterTable tasks={this.state.tasks} />
            </div>
        );
    }
};
var FilterTable = React.createClass({
    getInitialState: function () {
        return {
            filterText: ''
        };
    },
    handleUserInput: function (filterText) {
        this.setState({
            filterText: filterText
        });
    },

    render: function () {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput} />
                <TaskTable
                    tasks={this.props.tasks}
                    filterText={this.state.filterText} />
            </div>
        );
    }
});
var SearchBar = React.createClass({
    handleChange: function () {
        this.props.onUserInput(
            this.refs.filterTextInput.value
        );
    },
    render: function () {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="taskName" className="col-sm-2 control-label">Status</label>
                    <div className="col-sm-10">
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search..."
                                value={this.props.filterText}
                                ref="filterTextInput"
                                onChange={this.handleChange}
                                />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
});
class TaskTable extends Component {
    render() {
        // Map through cars and return linked cars
        var rows = [];
        this.props.tasks.map(function (task) {
            const startDate = Moment(task.startDate).format('DD/MM/YYYY');
            const endDate = Moment(task.endDate).format('DD/MM/YYYY');
            if (task.status.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
                console.log(this.props.filterText);
                return;
            }
            rows.push(<TaskRow task={task} startDate={startDate} endDate={endDate} key={task.taskId} />);
        }.bind(this));
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <TaskHeader />
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
};

class TaskHeader extends Component {
    render() {
        return (
            <tr>
                <td>ID</td>
                <td>Task Name</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Type</td>
                <td>Status</td>
            </tr>
        );
    }
}
var TaskRow = React.createClass({
    render: function () {
        return (
            <tr key={this.props.task._id} >
                <td>{this.props.task.taskId}</td>
                <td>{this.props.task.taskName}</td>
                <td>{this.props.startDate}</td>
                <td>{this.props.endDate}</td>
                <td>{this.props.task.typeTask}</td>
                <td>{this.props.task.status}</td>
            </tr>
        )
    }
});

export default List