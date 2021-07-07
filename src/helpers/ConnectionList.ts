/**
 * An immutable array-like wrapper around
 * GraphQL Connection structure
 */
export class ConnectionList<Node> implements ArrayLike<Node>, Iterable<Node> {
    #list: GQLConnection<Node>;
    readonly [n: number]: Node;

    constructor(list: GQLConnection<Node>) {
        this.#list = list;
        this.#list.edges.forEach(
            // @ts-ignore
            (x, i) => this[i] = x.node
        );
    }

    [Symbol.iterator]() {
        const self = this;
        let current = 0;
        return {
            next() {
                if (self.length <= current)
                    return {
                        done: true,
                        value: null
                    }
                else
                    return {
                        done: false,
                        value: self.#list.edges[current++].node
                    }
            }
        };
    }

    get length() {
        return this.#list.edges.length;
    }
}


