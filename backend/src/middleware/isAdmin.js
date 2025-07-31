import User from "../models/userModel.js";

export const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin authorization',
      error: error.message
    });
  }
};

export const requireAdminOrOwner = (ownerField = 'userId') => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const resourceOwnerId = req.params[ownerField] || req.body[ownerField];
      
      const user = await User.findById(userId);
      
      if (user.role === 'admin' || userId === resourceOwnerId) {
        req.isAdmin = user.role === 'admin';
        req.isOwner = userId === resourceOwnerId;
        return next();
      }
      
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges or resource ownership required.'
      });
    } catch (error) {
      console.error('Admin or owner auth error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during authorization',
        error: error.message
      });
    }
  };
};

export const requireBuyer = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    
    if (!user || user.role !== 'buyer') {
      return res.status(403).json({
        success: false,
        message: 'Only buyers can make purchases'
      });
    }
    
    req.buyer = user;
    next();
  } catch (error) {
    console.error('Buyer auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during buyer authorization',
      error: error.message
    });
  }
};