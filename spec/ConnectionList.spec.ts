/// <reference path="../src/types.d.ts" />

import { expect } from 'chai'
import { ConnectionList } from '../src/helpers/ConnectionList';

let sources: GQLConnection<Number> = {
    edges: [
        { node: 111, cursor: "cursor1" },
        { node: 222, cursor: "cursor2" },
        { node: 333, cursor: "cursor3" },
        { node: 444, cursor: "cursor4" }
    ],
    pageInfo: {
        endCursor: "cursor4",
        hasNextPage: true
    }
};

describe('ConnectionList', () => {
    it("can return length", () => {
        const l = new ConnectionList(sources);
        expect(l.length).to.be.equal(4);
    });

    it("can be iterated through", () => {
        const l = new ConnectionList(sources);
        let arr = [];
        for (let x of l)
            arr.push(x);
        expect(arr).to.have.members([111, 222, 333, 444]);
    });

    it("gives read-only access by indexes", () => {
        const l = new ConnectionList(sources);
        expect(l[0]).to.be.equal(111);
        expect(l[1]).to.be.equal(222);
        expect(l[2]).to.be.equal(333);
        expect(l[3]).to.be.equal(444);
    });
})
