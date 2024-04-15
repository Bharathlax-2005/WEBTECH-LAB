const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    empid: String,
    experience: Number,
    designation: String,
    company: String,
    salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/create', (req, res) => {
    res.sendFile(__dirname + '/public/create.html');
});

app.post('/create', (req, res) => {
    const { name, empid, experience, designation, company, salary } = req.body;
    const newEmployee = new Employee({
        name,
        empid,
        experience,
        designation,
        company,
        salary
    });
    newEmployee.save()
        .then(() => {
            res.send('Employee saved successfully');
        })
        .catch(err => {
            console.error(err);
            res.send('Error saving employee');
        });
});

// Read route
app.get('/read', (req, res) => {
    Employee.find({})
        .then(employees => {
            res.json(employees);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error reading employees');
        });
});


app.get('/update', (req, res) => {
    // You can send an HTML file for update form here
    res.sendFile(__dirname + '/public/update.html');
});

// Update route
app.post('/update', (req, res) => {
    const { empid, salary } = req.body;
    Employee.findOneAndUpdate({ empid: empid }, { $set: { salary: salary } }, { new: true })
        .then(updatedEmployee => {
            if (!updatedEmployee) {
                res.status(404).send('Employee not found');
            } else {
                res.send('Employee updated successfully');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error updating employee');
        });
});


// Update route



// Delete route
app.get('/delete', (req, res) => {
    // You can send an HTML file for delete form here
    res.sendFile(__dirname + '/public/delete.html');
});

// Delete route
app.post('/delete', (req, res) => {
    const { empid } = req.body;
    Employee.findOneAndDelete({ empid: empid })
        .then(deletedEmployee => {
            if (!deletedEmployee) {
                res.status(404).send('Employee not found');
            } else {
                res.send('Employee deleted successfully');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error deleting employee');
        });
});




const PORT = process.env.PORT || 4020;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
