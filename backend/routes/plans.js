const express = require('express');
const { getPlans, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getPlans);
router.post('/', protect, admin, createPlan);
router.put('/:id', protect, admin, updatePlan);
router.delete('/:id', protect, admin, deletePlan);

module.exports = router;