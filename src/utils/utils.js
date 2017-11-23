import { drop, dropLast, compose, append, last, head, prepend, until, equals } from 'ramda';

/**
 * Input = [0,1,2,3,4]
 * Output = [1,2,3,4,0]
 */
export const onForward = data => {
    const lastElement = last(data);
    return compose(prepend(lastElement), dropLast(1))(data);
};

/**
 * Input = [0,1,2,3,4]
 * Output = [4,0,1,2,3]
 */
export const onBack = data => {
    const firstElement = head(data);
    return compose(append(firstElement), drop(1))(data);
};


/**
 * Input: data = [3,4,0,1,2], position = 1
 * Output = [1,2,3,4,0]
 */
export const onBackUntilPosition = (position, data) => {
    const currentItem = data[position];
    return until(data => equals(currentItem, data[0]), onBack)(data);
};

