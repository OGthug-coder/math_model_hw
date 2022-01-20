export class Pair<T> {

    private readonly first: T;
    private readonly second: T;

    constructor(first: T, second: T) {
        this.first = first;
        this.second = second;
    }

    public First() : T {
        return this.first;
    }

    public Second() : T {
        return this.second;
    }
}