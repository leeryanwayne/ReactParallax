import React from "react";
import "./styles.css";

class Parallax extends React.Component {
  static defaultProps = {
    children: [],
    intensity: 200,
    mouseListenerZIndex: 5000
  };

  constructor(props) {
    super(props);

    this.state = {
      mouseX: 0,
      mouseY: 0
    };

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.id = "parallax-" + Math.random() * 1000;
  }

  componentDidUpdate() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  onMouseMove = e => {
    var m_posx = 0,
      m_posy = 0,
      e_posx = 0,
      e_posy = 0,
      obj = this;
    //get mouse position on document crossbrowser
    if (!e) {
      e = window.event;
    }
    if (e.pageX || e.pageY) {
      m_posx = e.pageX;
      m_posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      m_posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      m_posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    //get parent element position in document
    if (obj.offsetParent) {
      do {
        e_posx += obj.offsetParent.offsetLeft;
        e_posy += obj.offsetParent.offsetTop;
      } while (obj.offsetParent);
    }

    this.setState({ mouseX: m_posx - e_posx, mouseY: m_posy - e_posy });
  };

  render() {
    let mouseX = this.props.mouseX || this.state.mouseX;
    let mouseY = this.props.mouseY || this.state.mouseY;

    let offsetX = mouseX - this.innerWidth / 2;
    let offsetY = mouseY - this.innerHeight / 2;

    return (
      <div id={this.id} className="parallax">
        {!this.props.mouseX && !this.props.mouseY && (
          <div
            style={{
              position: "fixed",
              width: "inherit",
              height: "inherit",
              zIndex: this.props.mouseListenerZIndex
            }}
            onMouseMove={this.onMouseMove}
            onClick={this.props.onClick}
          />
        )}
        <div style={{ width: "inherit", height: "inherit" }}>
          {this.props.children.map((child, index) => {
            // TODO - Reverse intensity value
            let offset = 8 - index / (this.props.intensity / 100);

            return (
              <div
                className="centered"
                style={{
                  zIndex: index,
                  width: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "fixed",
                  height: "inherit",
                  margin: "auto"
                }}
              >
                <div
                  style={{
                    marginLeft: offsetX / offset + "px",
                    marginTop: offsetY / offset + "px"
                  }}
                >
                  {child}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Parallax;
