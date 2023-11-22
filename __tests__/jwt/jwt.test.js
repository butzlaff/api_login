const { createToken, getPayload } = require('../../src/auth/auth');

describe('Test JWT', () => {
  it('should verify the token created', () => {
    const token = createToken({ id: 1, nome: 'John Doe' });
    const payload = getPayload(token);

    expect(payload).toMatchObject({ id: 1, nome: 'John Doe' });
  })
})