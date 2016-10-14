var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');
var taskSchema = new mongoose.Schema({
    taskId: Number,
    taskName: String,
    startDate: Date,
    endDate: Date,
    typeTask: String,
    status: String

});
var connection = mongoose.createConnection("mongodb://localhost/TaskMng");
autoIncrement.initialize(connection);
taskSchema.plugin(autoIncrement.plugin, {
    model: 'Task',
    field: 'taskId',
    startAt: 1
});
var Task = mongoose.model('Task', taskSchema);
var task = new Task();
// task.save(function (err) {
 
//     // book._id === 100 -> true 
 
//     task.nextCount(function(err, count) {
 
//         // count === 101 -> true 
 
//         task.resetCount(function(err, nextCount) {
 
//             // nextCount === 100 -> true 
 
//         });
 
//     });
// });
// make this available to our Task in our Node applications
module.exports = Task;