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
  reset: () => void;
};

const TIMEOUT_MS = 30000;

/**
 * Creates a reactive MobX-powered async flow with built-in state:
 * - `isLoading`: true while the async function is running
 * - `error`: contains an Error if one occurs
 * - `data`: contains the result on success
 * - `reset()`: resets all internal state
 *
 * Supports:
 * - optional AbortSignal for request cancellation
 * - timeout (auto-abort) with fallback to 30s
 * - side-effect handlers: `onSuccess`, `onError`
 *
 * ---
 * @template TArgs Arguments passed to the async function.
 * @template TResult Return type of the async function.
 *
 * @param asyncFn The async function to wrap. Must accept optional AbortSignal as last argument.
 * @param options Optional config:
 *   - `timeoutMs`: how long to wait before auto-abort (default 30_000 ms)
 *   - `getAbortSignal`: inject external AbortSignal
 *   - `onSuccess`: called on success with result
 *   - `onError`: called on failure with error
 *
 * @returns DuckFlowState:
 *   - `run(...args)`: triggers asyncFn
 *   - `isLoading`: true if running
 *   - `data`: TResult | null
 *   - `error`: Error | null
 *   - `reset()`: clears state
 *
 * ---
 * @example
 * const userFetcher = withDuck<[string], User>(
 *   async (url, signal) => {
 *     const res = await fetch(url, { signal });
 *     if (!res.ok) throw new Error('Request failed');
 *     return await res.json();
 *   },
 *   {
 *     timeoutMs: 10000,
 *     onSuccess: (user) => console.log('Loaded:', user),
 *     onError: (err) => console.warn('Failed:', err),
 *   }
 * );
 *
 * await userFetcher.run('https://api.example.com/user');
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
      const timeoutMs = options.timeoutMs || TIMEOUT_MS;
      const abortSignal = options.getAbortSignal?.();

      try {
        const result = await asyncFn(...args, abortSignal);
        const duration = Date.now() - startTime;

        if (timeoutMs && duration > timeoutMs) {
          const timeoutError = new Error(
            'withDuck: operation exceeded timeout',
          );
          runInAction(() => {
            state.error = timeoutError;
          });
          options.onError?.(timeoutError);
          throw timeoutError;
        }

        runInAction(() => {
          state.data = result;
        });

        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        runInAction(() => {
          state.error = error;
        });
        options.onError?.(error);
        throw error;
      } finally {
        runInAction(() => {
          state.isLoading = false;
        });
      }
    },

    reset() {
      runInAction(() => {
        state.data = null;
        state.error = null;
        state.isLoading = false;
      });
    },
  };

  makeAutoObservable(state);
  return state;
}
