import { FC, memo, ComponentType } from 'react';

import NavigateRef from './NavigateRef';
import RouteObject from './RouteObject';
import RouteParams from './RouteParams';

type WithScreenParams = Record<string, any>;

/**
 * HOC that wraps a screen with navigation-related context providers:
 *
 * - NavigateRef: provides access to navigation reference
 * - RouteObject: attaches meta-route parameters
 * - RouteParams: exposes `route.params` via custom context
 *
 * @template P - Props of the screen component
 * @param Screen - The screen component to wrap
 * @param params - Optional metadata to attach to the route
 * @returns A React component with all navigation contexts applied
 */
const withScreen = <P extends object>(
  Screen: ComponentType<P>,
  params?: WithScreenParams,
): FC<P> => {
  const MemoScreen = memo(Screen);

  const Wrapper: FC<P> = props => (
    <NavigateRef>
      <RouteObject params={params}>
        <RouteParams>
          <MemoScreen {...props} />
        </RouteParams>
      </RouteObject>
    </NavigateRef>
  );

  return Wrapper;
};

export default withScreen;
