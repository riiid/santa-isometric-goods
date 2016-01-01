import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import O from '../../ObeliskImportHelper';

const MAX_CANVAS_SIZE = 400
const PADDING = 15
const ANGLE = 22.6

const DEFAULT_CUBE_SIZE = 10
const MIN_CUBE_SIZE = 6

const colors = {
  B: 0x4DA0E6,
  W: 0xEEEEEE
};

class Hat extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);
    this.forceUpdate();
  }

  componentDidUpdate() {
    let oW = MAX_CANVAS_SIZE;
    let canvas = this.refs.canvas;

    canvas.setAttribute('width', oW);
    canvas.setAttribute('height', oW);

    let point = new O.Point(200, 200);
    let pixelView = new O.PixelView(canvas, point);

    let bottomP3d = new O.Point3D(0, 0, -10);
    let bottomDimen = new O.CubeDimension(160, 160, 30);
    let bottomColor = new O.CubeColor().getByHorizontalColor(colors.W);
    let bottom = new O.Cube(bottomDimen, bottomColor, false);
    pixelView.renderObject(bottom, bottomP3d);

    let pyramidDimen = new O.PyramidDimension(120);
    let pyramidColor = new O.PyramidColor().getByRightColor(colors.B);
    let pyramid = new obelisk.Pyramid(pyramidDimen, pyramidColor);
    pixelView.renderObject(pyramid);

    let peakP3d = new O.Point3D(0, 0, 60);
    let peakDimen = new O.CubeDimension(36, 36, 36);
    let peakColor = new O.CubeColor().getByHorizontalColor(colors.W);
    let peak = new O.Cube(peakDimen, peakColor, false);
    pixelView.renderObject(peak, peakP3d);
  }

  render() {
    return (
      <div className="goods">
        <canvas ref="canvas"></canvas>
      </div>
    );
  }
}

export default Hat
