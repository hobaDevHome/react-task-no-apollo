import React, { Component } from 'react';
import ColorBtn from '../../UI/Buttons/ColorBtn';
import SizeButton from '../../UI/Buttons/SizeButton';
import { connect } from 'react-redux';
import { changeAttrubute } from '../../../store/actions';
import './SizesAtributes.css';

class SizesAtributes extends Component {
  constructor(props) {
    super(props);
    this.attrHandler = this.attrHandler.bind(this);
  }
  state = { checked: false };
  currentAttributes = this.props.attributes;

  foundVlue;
  attrHandler(id, attr, name) {
    this.props.changeAttrubute(id, attr, name);
  }
  checkIfSelected() {
    const found = this.props.clickedAttributes.find(
      (att) => att.id === this.props.id
    );
    if (found) {
      this.foundVlue = found.attribute.value;
    }
  }
  render() {
    this.checkIfSelected();
    if (
      this.props.attributes !== undefined &&
      this.props.attributes.items.length > 0
    ) {
      return (
        <div>
          <div className="size">{this.currentAttributes.name}</div>

          <div className="sizes-buttons">
            {this.currentAttributes.name === 'Color'
              ? this.currentAttributes.items.map((attr) => {
                  return (
                    <ColorBtn
                      style={{ backgroundColor: attr.value }}
                      checked={this.foundVlue === attr.value}
                      onClick={() =>
                        this.attrHandler(
                          this.props.id,
                          attr,
                          this.currentAttributes.name
                        )
                      }
                    ></ColorBtn>
                  );
                })
              : this.currentAttributes.items.map((attr) => {
                  return (
                    <SizeButton
                      onClick={() =>
                        this.attrHandler(
                          this.props.id,
                          attr,
                          this.currentAttributes.name
                        )
                      }
                      checked={this.foundVlue === attr.value}
                    >
                      {attr.value}
                    </SizeButton>
                  );
                })}
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    clickedAttributes: state.clickedAttributes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAttrubute: (id, attribute, name) =>
      dispatch(changeAttrubute(id, attribute, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SizesAtributes);
