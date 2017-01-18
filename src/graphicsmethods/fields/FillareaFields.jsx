import React from 'react'
import Usage from '../../Usage'

function validate(type, value) {
    switch(type) {
        case 'fillareaindices':
            break;
        case 'fillareaopacity':
            break;
        case 'fillareacolors':
            break;
        case 'fillareafields':
            break;
    }
}
var FillareaFields = React.createClass({
    propTypes: {
        handleChange: React.PropTypes.func,
        defaultValue: React.PropTypes.string,
        className: React.PropTypes.string,
        colors: React.PropTypes.array,
        style: React.PropTypes.string,
        indices: React.PropTypes.array,
        opacity: React.PropTypes.array
    },
    getInitialState() {
        return {
            colors: [],
            style: '',
            indices: [],
            opacity: []
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            colors: nextProps.colors,
            style: nextProps.style,
            indices: nextProps.indices,
            opacity: nextProps.opacity
        })
    },
    handleBlur(event) {
        // add data validation step
        this.props.handleChange(event);
    },
    render(){
        let colors_usage = "Level color index values. Index colors range from 0 to 255.\n"+
                           "Use explicit indices, i.e.: 16, 32, 48, 64, 80\n"+
                           "OR Use two indices to generate level range, i.e.: 16, 32"
        return (
            <div id='fillarea-fields' className={this.props.className}>
                <div className='row'>
                    <div className='col-md-6'>
                        <h5>Ranges: </h5>
                        <input type='text'
                            name='fillareaopacity'
                            value={this.state.opacity? this.state.opacity : []}
                            onChange={(event)=> {this.setState({opacity:event.target.value})}}
                            onBlur={this.handleBlur}/>
                        <Usage usage={"Level ranges: (10,30,50) or ([10,20],[20,30],[30,50])"}/>
                    </div>
                    <div className='col-md-6'>
                        <h5>Colors: </h5>
                        <input type='text'
                            name='fillareacolors'
                            value={this.state.colors? this.state.colors : []}
                            onChange={(event)=> {this.setState({colors:event.target.value})}}
                            onBlur={this.handleBlur}/>
                        <Usage usage={colors_usage}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <h5>Patterns: </h5>
                        <input type='text'
                            name='fillareaindices'
                            value={this.state.indices? this.state.indices : []}
                            onChange={(event)=> {this.setState({indices:event.target.value})}}
                            onBlur={this.handleBlur}/>
                        <Usage usage="Level pattern index values. Index range 0 to 18."/>
                    </div>
                    <div className='col-md-6'>
                        <h5>Type: </h5>
                        <select name='fillareastyle'
                            value={this.state.style ?this.state.style :'solid'}
                            onChange={this.props.handleChange}
                            className='form-control'>
                            <option value='solid'>solid</option>
                            <option value='hatch'>hatch</option>
                            <option value='pattern'>pattern</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
});

export default FillareaFields;