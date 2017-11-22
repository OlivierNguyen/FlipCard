import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardList from '../../cards/components/CardList';

export default class Layout extends Component {
    render() {
        const S = {
            container: {
                display: 'flex',
                justifyContent: 'center',
            },
            cardList: {},
        };

        return (
            <div style={S.container}>
                <div style={S.cardList}>
                    <CardList />
                </div>
            </div>
        );
    }
}
