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
    },
  },
};

export default components;
