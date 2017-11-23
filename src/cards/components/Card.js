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
        const { position: i, backgroundColor, width, height } = this.props;

        const animationCardConfig = {
            x: {
                0: 110,
                1: 300,
                2: 220,
                3: 10,
                4: -90,
            },
            y: {
                0: 140,
                1: 80,
                2: 0,
                3: 0,
                4: 80,
            },
            skewY: {
                0: 0,
                1: -50,
                2: 15,
                3: -15,
                4: 50,
            },
            rotationY: {
                0: 0,
                1: 60,
                2: 0,
                3: 0,
                4: 60,
            },
            scale: {
                0: 1,
                1: 0.8,
                2: 0.5,
                3: 0.5,
                4: 0.8,
            },
            backgroundColor: {
                0: backgroundColor,
                1: backgroundColor,
                2: '#bdbdbd',
                3: '#bdbdbd',
                4: backgroundColor,
            },
            opacityFront: {
                0: 1,
                1: 1,
                2: 0,
                3: 0,
                4: 1,
            },
            opacityBack: {
                0: 0,
                1: 0,
                2: 1,
                3: 1,
                4: 0,
            },
            zIndex: {
                0: 5,
                1: 4,
                2: 2,
                3: 0,
                4: 2,
            },
        };

        TweenMax.to(this.card, initial ? 0 : 0.5, {
            x: animationCardConfig.x[i],
            y: animationCardConfig.y[i],
            zIndex: animationCardConfig.zIndex[i],
            skewY: animationCardConfig.skewY[i],
            rotationY: animationCardConfig.rotationY[i],
            scale: animationCardConfig.scale[i] || 1,
            backgroundColor: animationCardConfig.backgroundColor[i],
            opacity: 1,
            ease: 'Sine.easeInOut',
            onComplete: () => {},
        });

        TweenMax.to(this.frontCard, initial ? 0 : 0.5, {
            opacity: animationCardConfig.opacityFront[i],
            ease: 'Sine.easeInOut',
            onComplete: () => {},
        });

        TweenMax.to(this.backCard, initial ? 0 : 0.5, {
            opacity: animationCardConfig.opacityBack[i],
            ease: 'Sine.easeInOut',
            onComplete: () => {},
        });
    }

    render() {
        const { position } = this.props;

        const S = {
            container: {
                width: this.props.width,
                height: this.props.height,
                border: 'solid 1px #bebebe',
                backgroundColor: this.props.backgroundColor || 'white',
                position: 'absolute',
                borderRadius: 10,
                cursor: 'pointer',
            },
            backContainer: {
                position: 'absolute',
            },
            frontContainer: {},
        };

        return (
            <div
                ref={ref => (this.card = ref)}
                style={S.container}
                onClick={() => this.props.onClick(this.props.position)}
            >
                <div style={S.backContainer} ref={ref => (this.backCard = ref)}>
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        src="https://pre00.deviantart.net/cb44/th/pre/i/2016/259/5/a/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg-dah43cy.png"
                    />
                </div>
                <div
                    style={S.frontContainer}
                    ref={ref => (this.frontCard = ref)}
                >
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        src={this.props.frontImageUrl}
                    />
                </div>
            </div>
        );
    }
}
