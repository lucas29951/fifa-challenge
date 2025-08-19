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