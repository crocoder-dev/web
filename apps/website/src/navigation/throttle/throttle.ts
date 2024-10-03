// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

type ThrottledFunction<T extends AnyFunction> = (
  ...args: Parameters<T>
) => ReturnType<T>;

function throttle<T extends AnyFunction>(
  callback: T,
  delay: number,
): ThrottledFunction<T> {
  let shouldWait: boolean = false;
  let lastResult: ReturnType<T>;

  return function (...args) {
    if (shouldWait) return lastResult;

    shouldWait = true;
    setTimeout(() => (shouldWait = false), delay);

    lastResult = callback(...args);
    return lastResult;
  };
}

export default throttle;
