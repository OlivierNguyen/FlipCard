import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardLists from '../../cards/components/CardList';

export default class Layout extends Component {
    render() {
        const S = {
            container: {},
        };

        return (
            <div style={S.container}>
                <CardLists />
            </div>
        );
    }
}
