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
        const { position: i, backgroundColor } = this.props;

        const animationCardConfig = {
            x: {
                0: 220,
                1: 440,
                2: 380,
                3: 130,
                4: 0,
            },
            y: {
                0: 200,
                1: 100,
                2: 0,
                3: 0,
                4: 100,
            },
            skewY: {
                0: 0,
                1: -30,
                2: 15,
                3: -15,
                4: 30,
            },
            rotationY: {
                0: 0,
                1: 60,
                2: 180,
                3: 180,
                4: 60,
            },
            scale: {
                0: 1,
                1: 0.8,
                2: 0.6,
                3: 0.6,
                4: 0.8,
            },
            backgroundColor: {
                0: backgroundColor,
                1: backgroundColor,
                2: '#bdbdbd',
                3: '#bdbdbd',
                4: backgroundColor,
            },
        };

        this.card.style.zIndex = {
            0: 5,
            1: 4,
            2: 2,
            3: 1,
            4: 2,
        }[String(i)];

        TweenMax.to(this.card, initial ? 0 : 0.5, {
            x: animationCardConfig.x[i],
            y: animationCardConfig.y[i],
            skewY: animationCardConfig.skewY[i],
            rotationY: animationCardConfig.rotationY[i],
            scale: animationCardConfig.scale[i] || 1,
            backgroundColor: animationCardConfig.backgroundColor[i],
            opacity: 1,
            ease: 'Sine.easeInOut',
        });
    }

    render() {
        const { position } = this.props;

        const S = {
            container: {
                height: 400,
                width: 300,
                border: 'solid 1px #bebebe',
                backgroundColor: this.props.backgroundColor || 'white',
                position: 'absolute',
            },
            back: {
                backgroundColor: '#bdbdbd',
            },
        };

        return (
            <div ref={ref => (this.card = ref)} style={S.container}>
                {this.props.title}
            </div>
        );
    }
}
