const DashboardModel = require('../models/DashboardModel')

module.exports.getDashboard = async (req, res) => {
    const Dashboard = await DashboardModel.find()
    res.send(Dashboard)
}

module.exports.saveDashboard = async (req, res) => {

    const { userName, amount, date, status } = req.body

    DashboardModel
        .create({ userName, amount, date, status })
        .then((data) => {
            console.log("Added Succesfully");
            console.log(data);
            res.send(data)
        })
}
module.exports.updateDashboard = async (req, res) => {

    const { _id, userName, amount, date, status } = req.body

    DashboardModel
        .findByIdAndUpdate(_id, { userName, amount, date, status })
        .then(() => {
            res.send("Updated Successfully")
        }).catch((err) => console.log(err))
}


module.exports.deleteDashboard = async (req, res) => {

    const { _id } = req.body

    DashboardModel
        .findByIdAndDelete({ _id })
        .then((data) => {
            res.send("Deleted Succesfully")
        }).catch((err) => console.log(err))
}