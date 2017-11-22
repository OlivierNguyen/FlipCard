import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';

export default class Card extends Component {
    static propTypes = {
        position: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.moveToPosition = this.moveToPosition.bind(this);
    }

    componentDidMount() {
        this.moveToPosition(true);
    }

    componentDidUpdate() {
        this.moveToPosition(false);
    }

    moveToPosition(initial) {
        const i = this.props.position;

        const animationCardConfig = {
            x: {
                0: 100,
                1: 200,
                2: 170,
                3: 30,
                4: 0,
            },
            y: {
                0: 100,
                1: 60,
                2: 0,
                3: 0,
                4: 60,
            },
            scale: {
                0: 1,
                1: 0.8,
                2: 0.6,
                3: 0.6,
                4: 0.8,
            },
        };

        this.card.style.zIndex = {
            0: 5,
            1: 4,
            2: 2,
            3: 3,
            4: 4,
        }[String(i)];

        TweenMax.to(this.card, initial ? 0 : 0.5, {
            x: animationCardConfig.x[i],
            y: animationCardConfig.y[i],
            scale: animationCardConfig.scale[i] || 1,
            opacity: 1,
            ease: 'Sine.easeInOut',
        });
    }

    render() {
        const S = {
            container: {
                height: 300,
                width: 200,
                border: 'solid 1px #bebebe',
                backgroundColor: this.props.backgroundColor || 'white',
                position: 'absolute',
            },
        };

        return (
            <div ref={ref => (this.card = ref)} style={S.container}>
                Card {this.props.title}
            </div>
        );
    }
}
