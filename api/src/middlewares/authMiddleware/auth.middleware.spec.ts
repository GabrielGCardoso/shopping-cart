import { AuthMiddleware } from './auth.middleware';


describe('AuthMiddleware', () => {
  let res, req, next;
  res = next = () => Promise.resolve();
  req = { headers: {} };
  it('should be defined', () => {
    expect(new AuthMiddleware().use(req, res, next)).toBeCalled;
  });
});
