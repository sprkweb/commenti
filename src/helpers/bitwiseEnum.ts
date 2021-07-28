// For bitwise TypeScript enums

export function stateMatch(myState, checkedState) {
    return (myState & checkedState) === checkedState;
}
