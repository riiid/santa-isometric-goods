import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import O from '../ObeliskImportHelper';

const MAX_CANVAS_SIZE = 300;
const PADDING = 15;
const ANGLE = 22.6;

const DEFAULT_CUBE_SIZE = 10;
const MIN_CUBE_SIZE = 6;

class Render2D extends Component {

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

  center(width, figure, cubeSize) {
    let xCount = Math.max.apply(null, figure.map(f => f.length));
    let yCount = figure.length;

    let figureW = xCount * cubeSize.x;
    let figureH = yCount * cubeSize.z;

    let figureOW = Math.floor(Math.abs(Math.cos(ANGLE) * figureW));
    let figureOH = figureH + Math.floor(Math.abs(Math.sin(ANGLE) * figureW));

    let centerX = (width - figureOW) / 2;
    let centerY = width - (figureW + (width - figureOH)) / 2;
    return [centerX, centerY];
  }

  renderData(figureData) {
    let {pixels, colors} = figureData;
    let canvas = this.refs.canvas;

    let w = canvas.getAttribute('width') - PADDING;
    let figure = pixels.split('\n')
      .map(row => row.split(''));

    let cs = this.cubeSize(w);

    let [centerX, centerY] = this.center(w, figure, cs);

    let point = new O.Point(centerX, centerY);
    let pixelView = new O.PixelView(canvas, point);

    figure.reverse().forEach((figureRow, i) => {
      figureRow.forEach((cell, j) => {
        if (cell === '-') {
          return;
        }
        let p3d = new O.Point3D(cs.x * j, cs.y, cs.z * i);
        let cubeDimen = new O.CubeDimension(cs.x, cs.y, cs.z);

        let cubeColor = this.toColor(colors[cell]);
        let cube = new O.Cube(cubeDimen, cubeColor, false);
        pixelView.renderObject(cube, p3d);
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

Render2D.propTypes = {
  figureData: React.PropTypes.object.isRequired,
  maxCanvasSize: React.PropTypes.number,
  maxCubeSize: React.PropTypes.number
};

Render2D.defaultProps = {
  maxCanvasSize: MAX_CANVAS_SIZE,
  maxCubeSize: DEFAULT_CUBE_SIZE
};

export default Render2D;
