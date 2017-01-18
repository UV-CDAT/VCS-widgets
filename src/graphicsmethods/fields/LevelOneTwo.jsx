import React from 'react'
import Usage from '../../Usage'
var NOP = ()=>{}
/* global $ */

function verify(value) {
    if (typeof(value) === 'string') {
        if(value.match(/^[\+-]?[0-9]+((\.[0-9]+)?e\+?[0-9]+)?$/)) {
            return Number.parseFloat(value);
        } else {
            return false;
        }
    }
}
var LevelOneTwo = React.createClass({
    propTypes: {
        handleChange: React.PropTypes.func,
        level1: React.PropTypes.number,
        level2: React.PropTypes.number
    },
    getInitialState() {
        return {
            level1: this.props.level1,
            level2: this.props.level2
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            level1: nextProps.level1,
            level2: nextProps.level2
        })
    },
    handleBlur(event) {
        let property_name = event.target.name
        let value = verify(event.target.value);
        if (value === 0 || value) {
            this.props.handleChange(property_name, value)
        } else {
            if (property_name === 'level_1') {
                this.setState({
                    level1: this.props.level1
                });
                $('#level-1-usage').focus()
            } else {
                this.setState({
                    level2: this.props.level2
                });
                $('#level-2-usage').focus()
            }
        }
    },
    render() {
        let usage = (position) => {
            return "Integer representing the  "+position+" level. "+
                    "If 1e+20, VCS fills in the value"
        }
        return (
            <div id='level-one-two'>
                <h5>
                    Level 1:
                </h5>
                    <input type="text"
                        name="level_1"
                        value={
                            this.state.level1 === 0 || this.state.level1
                            ? Number.isInteger(this.state.level1) && Math.abs(this.state.level1) > 1e4
                                ? this.state.level1.toExponential()
                                : this.state.level1
                            : ''
                        }
                        onChange={(event)=> {this.setState({level1:event.target.value})}}
                        onBlur={this.handleBlur}/>
                    <Usage id="level-1-usage"
                        usage={usage("first")}
                        placement="top"/>
                    <br/>
                <h5>
                    Level 2:
                </h5>
                    <input type="text"
                        name="level_2"
                        value={
                            this.state.level2 === 0 || this.state.level2
                            ? Number.isInteger(this.state.level2) && Math.abs(this.state.level2) > 1e4
                                ? this.state.level2.toExponential()
                                : this.state.level2
                            : ''
                        }
                        onChange={(event)=> {this.setState({level2:event.target.value})}}
                        onBlur={this.handleBlur}/>
                    <Usage id="level-2-usage"
                        usage={usage("end")}
                        placement="bottom"/>

            </div>
        );
    }
});

export default LevelOneTwo;