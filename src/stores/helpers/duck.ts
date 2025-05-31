import { makeAutoObservable, runInAction } from 'mobx';

/**
 * Creates a MobX observable duck flow for async actions.
 *
 * Example usage:
 * this.loginState = withDuck(async () => { ... });
 * await this.loginState.run();
 */
export function withDuck<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
) {
  const state = {
    isLoading: false,
    error: null as Error | null,
    data: null as Awaited<ReturnType<T>> | null,
    async run(...args: Parameters<T>) {
      runInAction(() => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const result = await asyncFn(...args);

        runInAction(() => {
          state.data = result;
        });

        return result;
      } catch (err) {
        runInAction(() => {
          state.error = err as Error;
        });
        throw err;
      } finally {
        runInAction(() => {
          state.isLoading = false;
        });
      }
    },
  };

  makeAutoObservable(state);
  return state;
}
