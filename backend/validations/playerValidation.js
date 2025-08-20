const { body, param, query } = require('express-validator');

exports.createPlayerValidation = [
    body('long_name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name should be already 3 characters'),

    body('age')
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 15, max: 60 }).withMessage('Age should be already 15 to 60'),

    body('overall')
    .notEmpty().withMessage('Overall is required')
    .isInt({ min: 0, max: 99 }).withMessage('Overall should be already 0 to 99'),

    body('nationality_name')
    .notEmpty().withMessage('Nationality is required'),

    body('club_name')
    .optional()
    .isLength({ max: 50 }).withMessage('Club name is too long'),

    body('player_face_url')
    .optional()
    .isURL().withMessage('Image URL is not valid'),

    body('genre')
    .notEmpty().withMessage('Genre is required')
    .isIn(['male', 'female']).withMessage('Genre should be male or female')
];

exports.updatePlayerValidation = [
    param('id').isInt().withMessage('ID should be a integer'),

    body('long_name')
    .optional()
    .isLength({ min: 3 }).withMessage('Name should be already 3 characters'),

    body('age')
    .optional()
    .isInt({ min: 15, max: 60 }).withMessage('Age should be 15 to 60'),

    body('overall')
    .optional()
    .isInt({ min: 0, max: 99 }).withMessage('Overall should be 0 to 99'),

    body('club_name')
    .optional()
    .isLength({ max: 50 }).withMessage('Club name is too long'),
];

exports.deletePlayerValidation = [
    param('id').isInt().withMessage('ID should be a entire valid number')
];

exports.searchValidation = [
    query('name')
    .notEmpty().withMessage('Name parameter is required')
    .length({ min: 2 }).withMessage('Name should be already 2 characters')
];

exports.filterValidation = [
    query('club').optional().isString().withMessage('Club should be a text'),
    query('country').optional().isString().withMessage('Country should be a text'),
    query('position').optional().isString().withMessage('Position should be a text'),
    query('minOverall').optional().isInt({ min: 0, max: 99}).withMessage('MinOverall should be already 0 to 99'),
    query('maxOverall').optional().isInt({ min: 0, max: 99}).withMessage('MaxOverall should be already 0 to 99'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page should be a positive number'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit should be already 1 to 100')
];
