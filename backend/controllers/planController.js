const Plan = require('../models/Plan');

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true });
    res.json({ success: true, data: plans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPlan = async (req, res) => {
  try {
    const planData = {
      ...req.body,
      isActive: true
    };
    const plan = await Plan.create(planData);
    res.status(201).json({ success: true, data: plan, message: 'Plan created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getPlans, createPlan, updatePlan, deletePlan };