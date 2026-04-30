const usersPaths = {
  '/api/users/register': {
    post: {
      tags: ['Users'],
      summary: 'Register new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RegisterBody' },
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthSuccessResponse' },
            },
          },
        },
        409: {
          description: 'Email already in use',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/users/login': {
    post: {
      tags: ['Users'],
      summary: 'Login user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/LoginBody' },
          },
        },
      },
      responses: {
        200: {
          description: 'User authenticated successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AuthSuccessResponse' },
            },
          },
        },
        401: {
          description: 'Invalid credentials',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/users/me': {
    get: {
      tags: ['Users'],
      summary: 'Get current user profile',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Current user returned',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserResponse' },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
    patch: {
      tags: ['Users'],
      summary: 'Update current user profile',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateMeBody' },
          },
        },
      },
      responses: {
        200: {
          description: 'Current user updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserResponse' },
            },
          },
        },
        400: {
          description: 'Validation or empty payload error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/users/logout': {
    post: {
      tags: ['Users'],
      summary: 'Logout current user',
      security: [{ bearerAuth: [] }],
      responses: {
        204: { description: 'Logged out successfully' },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
};

export default usersPaths;
