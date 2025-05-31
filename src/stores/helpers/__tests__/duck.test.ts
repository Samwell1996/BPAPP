import { withDuck } from '../duck';

describe('withDuck', () => {
  it('resolves successfully when within timeout', async () => {
    const fn = jest.fn<Promise<string>, []>(async () => {
      await new Promise(res => setTimeout(res, 10));
      return 'done';
    });

    const duck = withDuck<[], string>(fn, { timeoutMs: 50 });

    const result = await duck.run();

    expect(result).toBe('done');
    expect(duck.data).toBe('done');
    expect(duck.error).toBeNull();
    expect(duck.isLoading).toBe(false);
  });

  it('rejects when execution takes too long', async () => {
    const fn = jest.fn<Promise<string>, []>(async () => {
      await new Promise(res => setTimeout(res, 100));
      return 'too late';
    });

    const duck = withDuck<[], string>(fn, { timeoutMs: 50 });

    await expect(duck.run()).rejects.toThrow('/timeout/i');
    expect(duck.error?.message).toMatch(/timeout/i);
    expect(duck.data).toBeNull();
    expect(duck.isLoading).toBe(false);
  });

  it('uses default 30s timeout if none provided', async () => {
    const fn = jest.fn<Promise<string>, []>(async () => 'ok');
    const duck = withDuck<[], string>(fn);

    const result = await duck.run();
    expect(result).toBe('ok');
    expect(duck.data).toBe('ok');
    expect(duck.error).toBeNull();
  });

  it('calls onSuccess and onError', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const successDuck = withDuck<[], string>(async () => 'success', {
      onSuccess,
    });
    await successDuck.run();
    expect(onSuccess).toHaveBeenCalledWith('success');

    const failDuck = withDuck<[], string>(
      async () => {
        throw new Error('fail');
      },
      { onError },
    );

    await expect(failDuck.run()).rejects.toThrow('fail');
    expect(onError).toHaveBeenCalled();
  });

  it('reset() clears state', async () => {
    const duck = withDuck<[], string>(async () => 'reset me');
    await duck.run();

    expect(duck.data).toBe('reset me');
    duck.reset();
    expect(duck.data).toBeNull();
    expect(duck.error).toBeNull();
    expect(duck.isLoading).toBe(false);
  });
});
