var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    moment = require('moment'),
    Task = require('../model/task');
var statusList = [{
    key: 'all',
    value: 'All',
    selected: false
}, {
    key: 'new',
    value: 'New',
    selected: false
}, {
    key: 'processing',
    value: 'Processing',
    selected: false
}, {
    key: 'pendding',
    value: 'Pendding',
    selected: false
}, {
    key: 'close',
    value: 'Close',
    selected: false
}];

var typeTaskList = [{
    key: 'task',
    value: 'Task',
    selected: false
}, {
    key: 'bug',
    value: 'Bug',
    selected: false
}, {
    key: 'study',
    value: 'Study',
    selected: false
}, {
    key: 'review',
    value: 'Review',
    selected: false
}];
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/list', (req, res) => {
    Task.find({}, (err, data) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    });

});
router.get('/listTask', (req, res) => {
    Task.find({}, (err, data) => {
        if (err) throw err;
        // object of all the users
        res.render('list', {
            title: 'List all task',
            tasks: data,
            moment: moment,
            statusLists: statusList
        });
    });

});
/* GET New Blob page. */
router.get('/new', (req, res) => {
    res.render('new', {
        title: 'Add New Task'
    });
});

router.post('/createTask', (req, res) => {
    console.log(req.body);
    var newTask = new Task();
    newTask.taskName = req.body.taskName;
    newTask.startDate = req.body.startDate;
    newTask.endDate = req.body.endDate;
    newTask.typeTask = req.body.typeTask;
    newTask.status = req.body.status;
    newTask.save((err, task, num) => {
        if (err) {
            console.log('Error: ' + err);
            throw err;
        } else {
            console.log('Saved: ' + num + ' record');
            console.log('Detail: ' + task);
        }
        console.log('User saved successfully!');
    });
    res.redirect('/list');
});

//GET the individual blob by Mongo ID
router.get('/task/:id/', (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        // var newSttList = statusList;
        if (task && task.status) {
            var indexStatus = statusList.findIndex((x) => x.key === task.status);
            statusList[indexStatus].selected = true;
        }
        if (task && task.typeTask) {
            var indexType = typeTaskList.findIndex((x) => x.key === task.typeTask);
            typeTaskList[indexType].selected = true;
        }
        res.render(
            'task', {
                title: 'Edit Your Task' + task.taskName,
                task: task,
                moment: moment,
                statusLists: statusList,
                typeTaskLists: typeTaskList
            }
        );
    });
});
router.put('/:id', (req, res) => {
    var query = {
        "_id": req.params.id
    };

    var update = {
        taskName: req.body.taskName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        typeTask: req.body.typeTask,
        status: req.body.status

    };
    var options = {
        new: true
    };
    Task.findOneAndUpdate(query, update, options, (err, task) => {
        if (err) console.log(err);
        console.log(task);
        res.redirect('/api/list');
    });
});
router.delete('/:id', (req, res) => {
    var query = {
        "_id": req.params.id
    };
    Task.findOneAndRemove(query, (err, task) => {
        console.log(task);
        res.redirect('/api/list');
    });
});

//Query by status
router.post('/find', (req, res) => {
    console.log(req.body);
    var startDateQ = req.body.startDate || '';
    var statusQ = (req.body.status === 'all') ? '' : req.body.status;

    var query = {};
    if (statusQ && startDateQ) {
        query = {
            'status': req.body.status,
            startDate: {
                $lte: new Date(startDateQ)
            }
        };
    } else if (statusQ) {
        query = {
            'status': req.body.status
        };
    }
    Task.find(query, (err, data) => {
        if (err) throw err;
        // var newSttList = statusList;
        // if (data[0].status) {
        //     var indexStatus = statusList.findIndex((x) => x.key === data[0].status);
        //     newSttList[indexStatus].selected = true;
        // }
        // object of all the users
        res.render('list', {
            title: 'List all task by status ' + req.body.status,
            tasks: data,
            moment: moment,
            statusLists: statusList
        });
    });
});
const data = [
    {
        id: 1,
        name: 'Honda Accord Crosstour',
        year: '2010',
        model: 'Accord Crosstour',
        make: 'Honda',
        media: 'http://media.ed.edmunds-media.com/honda/accord-crosstour/2010/oem/2010_honda_accord-crosstour_4dr-hatchback_ex-l_fq_oem_4_500.jpg',
        price: '$16,811'

    },
    {
        id: 2,
        name: 'Mercedes-Benz AMG GT Coupe',
        year: '2016',
        model: 'AMG',
        make: 'Mercedes Benz',
        media: 'http://media.ed.edmunds-media.com/mercedes-benz/amg-gt/2016/oem/2016_mercedes-benz_amg-gt_coupe_s_fq_oem_1_717.jpg',
        price: '$138,157'

    },
    {
        id: 3,
        name: 'BMW X6 SUV',
        year: '2016',
        model: 'X6',
        make: 'BMW',
        media: 'http://media.ed.edmunds-media.com/bmw/x6/2016/oem/2016_bmw_x6_4dr-suv_xdrive50i_fq_oem_1_717.jpg',
        price: '$68,999'
    },
    {
        id: 4,
        name: 'Ford Edge SUV',
        year: '2016',
        model: 'Edge',
        make: 'Ford',
        media: 'http://media.ed.edmunds-media.com/ford/edge/2016/oem/2016_ford_edge_4dr-suv_sport_fq_oem_6_717.jpg',
        price: '$36,275'
    },
    {
        id: 5,
        name: 'Dodge Viper Coupe',
        year: '2017',
        model: 'Viper',
        make: 'Dodge',
        media: 'http://media.ed.edmunds-media.com/dodge/viper/2017/oem/2017_dodge_viper_coupe_acr_fq_oem_3_717.jpg',
        price: '$123,890'
    }
];
router.get('/test', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

module.exports = router;