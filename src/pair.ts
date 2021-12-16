export class Pair {

    private readonly first: any;
    private readonly second: any;

    constructor(first, second) {
        this.first = first;
        this.second = second;
    }

    public First(){
        return this.first;
    }

    public Second(){
        return this.second;
    }
}