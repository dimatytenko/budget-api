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
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          name: { type: 'string', nullable: true, example: 'John' },
          surname: { type: 'string', nullable: true, example: 'Doe' },
          salary: { type: 'number', nullable: true, example: 45000 },
        },
      },
      RegisterBody: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 8, maxLength: 32, example: 'StrongPass123' },
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
        properties: {
          name: { type: 'string', minLength: 3, maxLength: 60, example: 'John' },
          surname: { type: 'string', minLength: 3, maxLength: 60, example: 'Doe' },
          salary: { type: 'number', minimum: 0, example: 45000 },
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
