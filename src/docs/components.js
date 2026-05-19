const components = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '664f1b2c3e4a5b6c7d8e9f00' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          firstName: { type: 'string', nullable: true, example: 'John' },
          lastName: { type: 'string', nullable: true, example: 'Doe' },
          salary: { type: 'number', nullable: true, example: 45000 },
          workHoursByWeek: { type: 'number', nullable: true, example: 40 },
          expectReturnPercentage: { type: 'number', nullable: true, example: 15 },
          investForYear: { type: 'number', nullable: true, example: 5 },
        },
      },
      RegisterBody: {
        type: 'object',
        required: ['email', 'password', 'confirmPassword'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 8, maxLength: 32, example: 'StrongPass123' },
          confirmPassword: { type: 'string', example: 'StrongPass123' },
        },
      },
      LoginBody: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', example: 'StrongPass123' },
        },
      },
      UpdateMeBody: {
        type: 'object',
        minProperties: 1,
        properties: {
          firstName: { type: 'string', minLength: 3, maxLength: 60, example: 'John' },
          lastName: { type: 'string', minLength: 3, maxLength: 60, example: 'Doe' },
          salary: { type: 'number', minimum: 0, example: 45000 },
          workHoursByWeek: { type: 'number', minimum: 0, example: 40 },
          expectReturnPercentage: { type: 'number', minimum: 0, example: 15 },
          investForYear: { type: 'number', minimum: 0, example: 5 },
        },
        additionalProperties: false,
      },
      AuthSuccessResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'success' },
          code: { type: 'number', example: 200 },
          data: {
            type: 'object',
            properties: {
              token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
              user: { $ref: '#/components/schemas/User' },
            },
          },
        },
      },
      UserResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'success' },
          code: { type: 'number', example: 200 },
          data: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/User' },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Invalid credentials' },
        },
      },
      Purchase: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '664f1b2c3e4a5b6c7d8e9f01' },
          userId: { type: 'string', example: '664f1b2c3e4a5b6c7d8e9f00' },
          name: { type: 'string', example: 'MacBook Pro' },
          link: {
            type: 'string',
            nullable: true,
            example: 'https://shop.example.com/macbook',
          },
          imageUrl: {
            type: 'string',
            nullable: true,
            example: '/uploads/purchases/a1b2c3d4-e5f6.png',
          },
          price: { type: 'number', example: 1600 },
          quantity: { type: 'integer', minimum: 1, example: 1 },
          decisionTimer: {
            type: 'string',
            enum: ['12h', '24h', '48h', '72h'],
            example: '24h',
          },
          salary: { type: 'number', example: 3000 },
          workHoursByWeek: { type: 'number', example: 40 },
          expectReturnPercentage: { type: 'number', example: 8 },
          investForYear: { type: 'number', example: 1 },
          status: {
            type: 'string',
            enum: ['pending', 'analyzed', 'approved', 'rejected'],
            example: 'pending',
          },
          decisionEndsAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-05-20T12:00:00.000Z',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-05-19T12:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-05-19T12:00:00.000Z',
          },
        },
      },
      UserFinancialSnapshot: {
        type: 'object',
        properties: {
          salary: { type: 'number', example: 3000 },
          workHoursByWeek: { type: 'number', example: 40 },
          expectReturnPercentage: { type: 'number', example: 8 },
          investForYear: { type: 'number', example: 1 },
        },
      },
      CreatePurchaseBody: {
        type: 'object',
        required: [
          'name',
          'price',
          'quantity',
          'decisionTimer',
          'salary',
          'workHoursByWeek',
          'expectReturnPercentage',
          'investForYear',
        ],
        properties: {
          name: { type: 'string', example: 'MacBook Pro' },
          price: { type: 'number', minimum: 0, example: 1600 },
          quantity: { type: 'integer', minimum: 1, example: 1 },
          decisionTimer: {
            type: 'string',
            enum: ['12h', '24h', '48h', '72h'],
            example: '24h',
          },
          salary: { type: 'number', minimum: 0, example: 3000 },
          workHoursByWeek: { type: 'number', minimum: 0, example: 40 },
          expectReturnPercentage: { type: 'number', minimum: 0, example: 8 },
          investForYear: { type: 'number', minimum: 0, example: 1 },
          link: {
            type: 'string',
            format: 'uri',
            example: 'https://shop.example.com/macbook',
          },
          image: {
            type: 'string',
            format: 'binary',
            description: 'Optional product image (png/jpeg, max 10MB)',
          },
        },
      },
      CreatePurchaseResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'success' },
          code: { type: 'number', example: 201 },
          data: {
            type: 'object',
            properties: {
              purchase: { $ref: '#/components/schemas/Purchase' },
              user: { $ref: '#/components/schemas/UserFinancialSnapshot' },
            },
          },
        },
      },
    },
  },
};

export default components;
