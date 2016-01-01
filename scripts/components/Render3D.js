import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import O from '../ObeliskImportHelper';

const MAX_CANVAS_SIZE = 300;
const PADDING = 15;

const DEFAULT_CUBE_SIZE = 10;
const MIN_CUBE_SIZE = 6;

class Render3D extends Component {

  constructor(props, context) {
    super(props, context);
  }

  toColor(hex) {
    return new O.CubeColor().getByHorizontalColor(hex);
  }

  makeEven(n) {
    if (n % 2 === 0) {
      return n;
    }
    return n + 1;
  }

  cubeSize(w) {
    let _x = this.makeEven(
        Math.floor(w * this.props.maxCubeSize / this.props.maxCanvasSize)
      );
    let x = _x > MIN_CUBE_SIZE ? _x : MIN_CUBE_SIZE;

    let _z = this.makeEven(Math.floor(x + (w * 4 / this.props.maxCanvasSize)));
    let z = _z > MIN_CUBE_SIZE ? _z : MIN_CUBE_SIZE;
    return {x, y: x, z};
  }

  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);
    this.forceUpdate();
  }

  renderData(figureData) {
    let {pixels, colors} = figureData;
    let canvas = this.refs.canvas;

    let w = canvas.getAttribute('width') - PADDING;
    let figure = pixels.split('===')
      .map(layer => {
        return layer.split('\n')
          .map(row => row.split(''))
          .filter(row => row.length > 0);
      });

    let cs = this.cubeSize(w);

    let point = new O.Point(w / 2, w * 2 / 3);
    let pixelView = new O.PixelView(canvas, point);

    figure.forEach((figureLayer, z) => {
      figureLayer.forEach((figureRow, x) => {
        figureRow.reverse().forEach((cell, y) => {
          if (cell === '-') {
            return;
          }
          let p3d = new O.Point3D(cs.x * x, cs.y * y, cs.z * z);
          let cubeDimen = new O.CubeDimension(cs.x, cs.y, cs.z);

          let cubeColor = this.toColor(colors[cell]);
          let cube = new O.Cube(cubeDimen, cubeColor, false);
          pixelView.renderObject(cube, p3d);
        });
      });
    });
  }

  componentDidUpdate() {
    let oW = Math.min(this.root.clientWidth, this.props.maxCanvasSize);
    let canvas = this.refs.canvas;

    canvas.setAttribute('width', oW);
    canvas.setAttribute('height', oW);

    let {figureData} = this.props;
    this.renderData(figureData);
  }

  render() {
    return (
      <div className="goods">
        <canvas ref="canvas"></canvas>
      </div>
    );
  }
}

Render3D.propTypes = {
  figureData: React.PropTypes.object.isRequired,
  maxCanvasSize: React.PropTypes.number,
  maxCubeSize: React.PropTypes.number
};

Render3D.defaultProps = {
  maxCanvasSize: MAX_CANVAS_SIZE,
  maxCubeSize: DEFAULT_CUBE_SIZE
};

export default Render3D;
