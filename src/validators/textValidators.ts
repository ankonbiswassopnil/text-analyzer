import { body, param } from 'express-validator';

const commonContentRules = [
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 5 }).withMessage('Content must be at least 5 characters')
    .isLength({ max: 2000 }).withMessage('Content cannot exceed 2000 characters')
    .escape() // Sanitization
];

export const validateCreateText = [
  ...commonContentRules
];

export const validateUpdateText = [
  param('id')
    .isInt({ gt: 0 }).withMessage('Invalid ID')
    .toInt(),
  ...commonContentRules
];

export const validateTextIdParam = [
  param('id')
    .isInt({ gt: 0 }).withMessage('Invalid ID')
    .toInt() // Automatic type conversion
];