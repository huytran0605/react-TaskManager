import React, { Component } from 'react';
class TaskTable extends Component {
    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <TaskHeader />
                </thead>
                <tbody>
                    {
                        this.props.data.map((task, i) => <TaskRow key={i} data={task} />
                        )}
                </tbody>
            </table>
        )
    }
}

class TaskHeader extends Component {
    render() {
        return (
            <tr>
                <td>ID</td>
                <td>Task Name</td>
            </tr>
        );
    }
}
class TaskRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.name}</td>
            </tr>
        );
    }
}
export default TaskTable