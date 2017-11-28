import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';
import TimelineMax from 'gsap/TimelineMax';

export default class Card extends Component {
    static propTypes = {
        position: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.moveToPosition = this.moveToPosition.bind(this);
        this.goTo = this.goTo.bind(this);
    }

    componentDidMount() {
        this.moveToPosition(true);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.goToUp) {
            this.moveToPosition(false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.goToUp !== this.props.goToUp) {
            const animationConfig = {
                delay: {
                    0: 1,
                    1: 1.1,
                    2: 0.9,
                    3: 0.7,
                    4: 0.5,
                },
            };

            if (this.props.position !== 0) {
                TweenMax.to(
                    this.card,
                    animationConfig.delay[this.props.position],
                    {
                        y: nextProps.goToUp ? -500 : 0,
                        opacity: nextProps.goToUp ? 0 : 1,
                        ease: 'Sine.easeIn',
                        scale: nextProps.goToUp ? 0.4 : 1,
                    }
                );
            } else {
                TweenMax.to(
                    this.card,
                    animationConfig.delay[this.props.position],
                    {
                        ease: 'linear',
                        rotationY: 180,
                        scale: nextProps.goToUp ? 1.5 : 1,
                    }
                );
            }
        }
    }

    moveToPosition(initial) {
        const { position: i, backgroundColor, width, height } = this.props;

        const animationCardConfig = {
            x: {
                0: 90,
                1: 250,
                2: 200,
                3: 10,
                4: -80,
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
                1: -60,
                2: 180,
                3: 180,
                4: -60,
            },
            scale: {
                0: 1,
                1: 0.8,
                2: 0.5,
                3: 0.5,
                4: 0.8,
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
        };

        this.card.style.zIndex = {
            0: 100,
            1: 10,
            2: 2,
            3: 0,
            4: 2,
        }[i];

        this.backCard.style.zIndex = {
            0: 0,
            1: 5,
            2: 10,
            3: 10,
            4: 3,
        }[i];

        const timeLine = new TimelineMax();

        timeLine
            .to(this.card, 0.5, {
                x: animationCardConfig.x[i],
                y: animationCardConfig.y[i],
                skewY: animationCardConfig.skewY[i],
                scale: animationCardConfig.scale[i] || 1,
                rotationY: animationCardConfig.rotationY[i],
                opacity: 1,
                ease: 'Sine.easeInOut',
                onComplete: () => {},
            })
            .to(
                this.backCard,
                0.5,
                {
                    rotationY: animationCardConfig.rotationY[i] - 180,
                    opacity: 1,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {},
                },
                0
            );
    }

    goTo() {}

    render() {
        const { position } = this.props;

        const S = {
            container: {
                width: this.props.width,
                height: this.props.height,
                position: 'absolute',
            },
            imageContainer: {
                position: 'absolute',
                backfaceVisibility: 'hidden',
            },
        };

        return (
            <div
                ref={ref => (this.card = ref)}
                style={S.container}
                onClick={() => this.props.onClick(this.props.position)}
            >
                <div
                    style={S.imageContainer}
                    ref={ref => (this.backCard = ref)}
                >
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        src="https://pre00.deviantart.net/cb44/th/pre/i/2016/259/5/a/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg-dah43cy.png"
                    />
                </div>
                <div style={S.imageContainer}>
                    <img
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        src={this.props.frontImageUrl}
                    />
                    <div onClick={this.goTo}>CLICK HERE</div>
                </div>
            </div>
        );
    }
}
