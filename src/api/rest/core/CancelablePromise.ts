/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export class CancelablePromise<T> implements Promise<T> {
    readonly [Symbol.toStringTag]: string;

    #isPending: boolean;
    #isCanceled: boolean;
    readonly #cancelHandlers: (() => void)[];
    readonly #promise: Promise<T>;
    #resolve?: (value: T | PromiseLike<T>) => void;
    #reject?: (reason?: any) => void;

    constructor(executor: (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void,
        onCancel: (cancelHandler: () => void) => void) => void,
    ) {
        this.#isPending = true;
        this.#isCanceled = false;
        this.#cancelHandlers = [];
        this.#promise = new Promise<T>((resolve, reject) => {
            this.#resolve = resolve;
            this.#reject = reject;

            const onResolve = (value: T | PromiseLike<T>): void => {
                if (!this.#isCanceled) {
                    this.#isPending = false;
                    this.#resolve?.(value);
                }
            };

            const onReject = (reason?: any): void => {
                this.#isPending = false;
                this.#reject?.(reason);
            };

            const onCancel = (cancelHandler: () => void): void => {
                if (this.#isPending) {
                    this.#cancelHandlers.push(cancelHandler);
                }
            };

            return executor(onResolve, onReject, onCancel);
        });
    }

    public then<TResult1 = T, TResult2 = never>(
        onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
        onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
    ): Promise<TResult1 | TResult2> {
        return this.#promise.then(onFulfilled, onRejected);
    }

    public catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult> {
        return this.#promise.catch(onRejected);
    }

    public finally(onFinally?: (() => void) | undefined | null): Promise<T> {
        return this.#promise.finally(onFinally);
    }

    public cancel(): void {
        if (!this.#isPending || this.#isCanceled) {
            return;
        }
        this.#isCanceled = true;
        if (this.#cancelHandlers.length) {
            try {
                for (const cancelHandler of this.#cancelHandlers) {
                    cancelHandler();
                }
            } catch (error) {
                this.#reject?.(error);
                return;
            }
        }
    }

    public get isCanceled(): boolean {
        return this.#isCanceled;
    }
}