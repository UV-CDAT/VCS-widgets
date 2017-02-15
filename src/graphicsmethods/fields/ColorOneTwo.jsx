import React from 'react';
import Usage from '../../Usage';
import ColorButton from '../components/widgets/ColorButton';
import ColorTable from '../components/widgets/ColorTable';
import {ControlLabel, FormGroup, Overlay, Popover} from 'react-bootstrap';
import ReactDOM from 'react-dom';


function usage(name, html_start='', trailer='', html_end='') {
    return html_start + name + " property must be an integer >= 0 and <=255. " + trailer + html_end
}

var ColorOneTwo = React.createClass({
    propTypes: {
        updateGraphicsMethod: React.PropTypes.func,
        color1: React.PropTypes.number,
        color2: React.PropTypes.number,
        colormap: React.PropTypes.array
    },
    updateColor1(val) {
        this.props.updateGraphicsMethod("color_1", val);
    },
    updateColor2(val) {
        this.props.updateGraphicsMethod("color_2", val);
    },
    getInitialState() {
        return {
            showColormap: false
        }
    },
    render(){
        const self = this;
        const colors = this.props.colormap.map((c) => {
            let red = c[0], green = c[1], blue = c[2], alpha = c[3];
            return [Math.round(red * 2.55), Math.round(green * 2.55), Math.round(blue * 2.55), alpha / 100]
        });
        return (
            <div>
                <Overlay rootClose show={this.state.showColormap} onHide={(e) => { this.setState({showColormap: false}); }} target={() => { ReactDOM.findDOMNode(this.state.colorTarget); }} container={ReactDOM.findDOMNode(this.state.colorTarget)}>
                    <Popover id="color_one_two_colortable" style={{'minWidth': '512px'}}>
                        <ColorTable colors={colors} colorSelected={(v) => {
                            if (self.state.colorTarget === this.color_1) {
                                self.updateColor1(v);
                            } else {
                                self.updateColor2(v);
                            }
                            self.setState({"showColormap": false});
                        }} />
                    </Popover>
                </Overlay>
                <FormGroup controlId="color1">
                    <ControlLabel>First Color: </ControlLabel>
                    <ColorButton ref={(b) => { this.color_1 = b; }}
                                 color={colors[this.props.color1]}
                                 action={(e) => {
                                    if (self.state.colorTarget == self.color_1) {
                                        self.setState({showColormap: !self.state.showColormap});
                                    } else {
                                        self.setState({colorTarget: self.color_1, showColormap: true});
                                    }
                                  }} />
                </FormGroup>
                <FormGroup controlId="color2">
                    <ControlLabel>Last Color: </ControlLabel>
                    <ColorButton ref={(b) => { this.color_2 = b; }}
                                 color={colors[this.props.color2]}
                                 action={(e) => {
                                    if (self.state.colorTarget == self.color_2) {
                                        self.setState({showColormap: !self.state.showColormap});
                                    } else {
                                        self.setState({colorTarget: self.color_2, showColormap: true});
                                    }
                                  }} />
                </FormGroup>
            </div>
        );
    }
});

export default ColorOneTwo;
