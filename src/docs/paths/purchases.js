const purchasesPaths = {
  '/api/purchases': {
    get: {
      tags: ['Purchases'],
      summary: 'List purchases with filters and pagination',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'status',
          in: 'query',
          required: false,
          description:
            'Filter by status. Repeat param or comma-separated: pending, bought, rejected',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['pending', 'bought', 'rejected'],
            },
          },
          style: 'form',
          explode: true,
          examples: {
            single: { value: ['pending'] },
            multiple: { value: ['pending', 'bought'] },
          },
        },
        {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', minimum: 1, default: 1 },
        },
        {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
        },
        {
          name: 'sort',
          in: 'query',
          schema: {
            type: 'string',
            enum: ['createdAt', 'decisionEndsAt'],
            default: 'createdAt',
          },
        },
        {
          name: 'order',
          in: 'query',
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
            default: 'desc',
          },
        },
      ],
      responses: {
        200: {
          description: 'Purchases list',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PurchaseListResponse' },
              examples: {
                default: {
                  value: {
                    status: 'success',
                    code: 200,
                    data: {
                      purchases: [
                        {
                          id: '664f1b2c3e4a5b6c7d8e9f01',
                          userId: '664f1b2c3e4a5b6c7d8e9f00',
                          name: 'New sneakers',
                          link: 'https://example.com/sneakers',
                          imageUrl: '/uploads/purchases/a1b2.png',
                          price: 699,
                          quantity: 1,
                          decisionTimer: '24h',
                          salary: 3000,
                          workHoursByWeek: 40,
                          expectReturnPercentage: 8,
                          investForYear: 1,
                          status: 'pending',
                          decisionEndsAt: '2026-05-20T12:00:00.000Z',
                          createdAt: '2026-05-19T12:00:00.000Z',
                          updatedAt: '2026-05-19T12:00:00.000Z',
                        },
                      ],
                      pagination: {
                        page: 1,
                        limit: 10,
                        total: 42,
                        totalPages: 5,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Validation error',
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
    post: {
      tags: ['Purchases'],
      summary: 'Create a new purchase',
      description:
        'Creates a purchase for the authenticated user. Accepts multipart/form-data (optional image field). Financial fields also update the user profile.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: { $ref: '#/components/schemas/CreatePurchaseBody' },
          },
        },
      },
      responses: {
        201: {
          description: 'Purchase created successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreatePurchaseResponse' },
            },
          },
        },
        400: {
          description: 'Validation error or invalid image type',
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
        413: {
          description: 'Image exceeds 10MB',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/purchases/latest': {
    get: {
      tags: ['Purchases'],
      summary: 'Get latest purchase for current user',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Latest purchase',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PurchaseResponse' },
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
        404: {
          description: 'No purchases found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/purchases/{id}': {
    get: {
      tags: ['Purchases'],
      summary: 'Get purchase by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '664f1b2c3e4a5b6c7d8e9f01' },
        },
      ],
      responses: {
        200: {
          description: 'Purchase found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PurchaseResponse' },
            },
          },
        },
        400: {
          description: 'Invalid purchase id',
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
        404: {
          description: 'Purchase not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Purchases'],
      summary: 'Delete purchase by id',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '664f1b2c3e4a5b6c7d8e9f01' },
        },
      ],
      responses: {
        200: {
          description: 'Purchase deleted',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PurchaseResponse' },
            },
          },
        },
        400: {
          description: 'Invalid purchase id',
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
        404: {
          description: 'Purchase not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/purchases/{id}/status': {
    patch: {
      tags: ['Purchases'],
      summary: 'Update purchase status (pending → bought | rejected)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '664f1b2c3e4a5b6c7d8e9f01' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdatePurchaseStatusBody' },
            examples: {
              bought: { value: { status: 'bought' } },
              rejected: { value: { status: 'rejected' } },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Status updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PurchaseResponse' },
            },
          },
        },
        400: {
          description: 'Validation error or purchase already finalized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              examples: {
                finalized: {
                  value: { message: 'Purchase already finalized' },
                },
              },
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
        404: {
          description: 'Purchase not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  '/api/purchases/{id}/extend-decision': {
    patch: {
      tags: ['Purchases'],
      summary: 'Extend decision timer for a pending purchase',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '664f1b2c3e4a5b6c7d8e9f01' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ExtendPurchaseDecisionBody' },
            examples: {
              decisionTimer: { value: { decisionTimer: '48h' } },
              additionalHours: { value: { additionalHours: 12 } },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Decision time extended',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PurchaseResponse' },
            },
          },
        },
        400: {
          description:
            'Validation error or purchase is not pending',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
              examples: {
                notPending: {
                  value: {
                    message: 'Purchase must be pending to extend decision time',
                  },
                },
              },
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
        404: {
          description: 'Purchase not found',
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

export default purchasesPaths;
