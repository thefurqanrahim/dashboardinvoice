const {Router} = require("express")
const {getDashboard, saveDashboard, deleteDashboard, updateDashboard} = require("../controllers/DashbaordController")

const router = Router()

router.get('/', getDashboard)
router.post('/save', saveDashboard)
router.post('/update', updateDashboard)
router.post('/delete', deleteDashboard)

module.exports = router;