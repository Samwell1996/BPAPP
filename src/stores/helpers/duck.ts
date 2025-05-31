import { makeAutoObservable, runInAction } from 'mobx';

type DuckFlowOptions<TResult> = {
  onSuccess?: (result: TResult) => void;
  onError?: (err: unknown) => void;
  getAbortSignal?: () => AbortSignal;
  timeoutMs?: number;
};

type DuckFlowState<TArgs extends any[], TResult> = {
  isLoading: boolean;
  error: Error | null;
  data: TResult | null;
  run: (...args: TArgs) => Promise<TResult>;
};

/**
 * Creates a reactive MobX-powered async flow with built-in state:
 * - `isLoading`: indicates loading state
 * - `error`: stores the error if one occurs
 * - `data`: stores the result of the async function
 *
 * It supports:
 * - optional AbortSignal injection (for cancellation)
 * - automatic timeout rejection (default: 30 seconds)
 * - optional side-effect handlers (`onSuccess`, `onError`)
 *
 * ### Usage:
 * ```ts
 * const fetchData = withDuck<[string], User>(async (url, signal) => {
 *   const res = await fetch(url, { signal });
 *   return await res.json();
 * }, {
 *   timeoutMs: 10000, // optional
 *   onSuccess: (user) => console.log('Loaded user:', user),
 *   onError: (err) => console.warn('Failed to load', err),
 * });
 *
 * await fetchData.run('https://api.example.com/user');
 * ```
 *
 * @template TArgs - Arguments passed to the async function.
 * @template TResult - Expected return type of the async function.
 *
 * @param asyncFn - An async function with optional AbortSignal as last parameter.
 * @param options - Optional config:
 *   - `timeoutMs`: auto-reject if execution time exceeds this limit (default 30s)
 *   - `onSuccess`: called with result on success
 *   - `onError`: called with error on failure
 *   - `getAbortSignal`: allows passing a custom AbortSignal (optional)
 *
 * @returns An object with:
 *   - `run(...args)`: to trigger the async function
 *   - `isLoading`: boolean
 *   - `error`: Error | null
 *   - `data`: TResult | null
 */

export function withDuck<TArgs extends any[], TResult>(
  asyncFn: (...args: [...TArgs, AbortSignal?]) => Promise<TResult>,
  options: DuckFlowOptions<TResult> = {},
): DuckFlowState<TArgs, TResult> {
  const state: DuckFlowState<TArgs, TResult> = {
    isLoading: false,
    error: null,
    data: null,

    async run(...args: TArgs): Promise<TResult> {
      runInAction(() => {
        state.isLoading = true;
        state.error = null;
      });

      const startTime = Date.now();
      const timeout = options.timeoutMs ?? 30_000;

      const abortSignal =
        options.getAbortSignal?.() ?? new AbortController().signal;

      try {
        const result = await asyncFn(...args, abortSignal);

        const duration = Date.now() - startTime;

        if (duration > timeout) {
          const timeoutError = new Error(
            'withDuck: operation exceeded timeout',
          );
          runInAction(() => {
            state.error = timeoutError;
          });
          options.onError?.(timeoutError);
          return Promise.reject(timeoutError);
        }

        runInAction(() => {
          state.data = result;
        });

        options.onSuccess?.(result);
        return result;
      } catch (err) {
        runInAction(() => {
          state.error = err as Error;
        });

        options.onError?.(err);
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
