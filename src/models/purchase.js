import { Schema, model } from 'mongoose';
import Joi from 'joi';

const DECISION_TIMERS = ['12h', '24h', '48h', '72h'];
const PURCHASE_STATUSES = ['pending', 'bought', 'rejected'];

const purchaseSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
    decisionTimer: {
      type: String,
      enum: {
        values: DECISION_TIMERS,
        message: 'decisionTimer must be one of: 12h, 24h, 48h, 72h',
      },
      required: [true, 'decisionTimer is required'],
    },
    salary: {
      type: Number,
      required: [true, 'salary is required'],
    },
    workHoursByWeek: {
      type: Number,
      required: [true, 'workHoursByWeek is required'],
    },
    expectReturnPercentage: {
      type: Number,
      required: [true, 'expectReturnPercentage is required'],
    },
    investForYear: {
      type: Number,
      required: [true, 'investForYear is required'],
    },
    link: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: PURCHASE_STATUSES,
      default: 'pending',
    },
    decisionEndsAt: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Purchase = model('purchase', purchaseSchema);

const purchaseCreate = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'name is required',
    'string.empty': 'name is required',
  }),
  price: Joi.number().min(0).required().messages({
    'any.required': 'price is required',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'any.required': 'quantity is required',
    'number.min': 'quantity must be at least 1',
    'number.integer': 'quantity must be an integer',
  }),
  decisionTimer: Joi.string()
    .valid(...DECISION_TIMERS)
    .required()
    .messages({
      'any.required': 'decisionTimer is required',
      'any.only': 'decisionTimer must be one of: 12h, 24h, 48h, 72h',
    }),
  salary: Joi.number().min(0).required().messages({
    'any.required': 'salary is required',
  }),
  workHoursByWeek: Joi.number().min(0).required().messages({
    'any.required': 'workHoursByWeek is required',
  }),
  expectReturnPercentage: Joi.number().min(0).required().messages({
    'any.required': 'expectReturnPercentage is required',
  }),
  investForYear: Joi.number().min(0).required().messages({
    'any.required': 'investForYear is required',
  }),
  link: Joi.string().uri().optional().allow('', null),
});

const normalizePurchaseStatuses = (value, helpers) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const raw = Array.isArray(value) ? value : [value];
  const statuses = raw
    .flatMap(item => String(item).split(','))
    .map(item => item.trim())
    .filter(Boolean);

  const invalid = statuses.filter(s => !PURCHASE_STATUSES.includes(s));
  if (invalid.length > 0) {
    return helpers.error('any.invalid');
  }

  return [...new Set(statuses)];
};

const purchaseListQuery = Joi.object({
  status: Joi.custom(normalizePurchaseStatuses).messages({
    'any.invalid': `status must be one of: ${PURCHASE_STATUSES.join(', ')}`,
  }),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
  sort: Joi.string().valid('createdAt', 'decisionEndsAt').default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
});

const purchaseStatusUpdate = Joi.object({
  status: Joi.string()
    .valid('bought', 'rejected')
    .required()
    .messages({
      'any.required': 'status is required',
      'any.only': 'status must be bought or rejected',
    }),
});

const purchaseExtendDecision = Joi.object({
  decisionTimer: Joi.string().valid(...DECISION_TIMERS),
  additionalHours: Joi.number().integer().min(1).max(168),
})
  .xor('decisionTimer', 'additionalHours')
  .messages({
    'object.missing': 'Either decisionTimer or additionalHours is required',
    'object.xor': 'Provide only decisionTimer or additionalHours, not both',
  });

export {
  Purchase,
  purchaseCreate,
  purchaseListQuery,
  purchaseStatusUpdate,
  purchaseExtendDecision,
  DECISION_TIMERS,
  PURCHASE_STATUSES,
};
