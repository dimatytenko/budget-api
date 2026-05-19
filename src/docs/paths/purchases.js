const purchasesPaths = {
  '/api/purchases': {
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
};

export default purchasesPaths;
