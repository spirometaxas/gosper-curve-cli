const createBoard = function(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const getLineType = function(line) {
  if (line !== undefined && (line.toLowerCase() === 'standard' || line.toLowerCase() === 'bold')) {
    return line.toLowerCase();
  }
  return 'standard';
}

const isValidRotation = function(rotation) {
  return rotation !== undefined && (rotation.toLowerCase() === 'left' || rotation.toLowerCase() === 'right' || rotation.toLowerCase() === 'standard');
}

const drawCurve = function(board, pos, type, params) {
  if (type === 'R') {
    board[pos.y][pos.x] = '_';
    board[pos.y][pos.x + 1] = '_';
  } else if (type === 'L') {
    board[pos.y][pos.x] = '_';
    board[pos.y][pos.x - 1] = '_';
  } else if (type === 'UR' || type === 'DL') {
    board[pos.y][pos.x] = '╱';
  } else if (type === 'UL' || type === 'DR') {
    board[pos.y][pos.x] = '╲';
  }
}

const drawCurves = function(queue, board, pos) {
  for (let i = 0; i < queue.length; i++) {
    drawCurve(board, queue[i].pos, queue[i].type, queue[i].params);
  }
}

const getPositionDiff = function(prevType, currType) {
  if (prevType === 'L') {
    if (currType === 'L') {
      return { x: -2, y: 0 };
    } else if (currType === 'DL') {
      return { x: -2, y: -1 };
    } else if (currType === 'DR') {
      return { x: -1, y: -1 };
    } else if (currType === 'UL') {
      return { x: -2, y: 0 };
    }
  } else if (prevType === 'R') {
    if (currType === 'R') {
      return { x: 2, y: 0 };
    } else if (currType === 'DL') {
      return { x: 1, y: -1 };
    } else if (currType === 'DR') {
      return { x: 2, y: -1 };
    } else if (currType === 'UR') {
      return { x: 2, y: 0 };
    }
  } else if (prevType === 'UL') {
    if (currType === 'L') {
      return { x: -1, y: 1 };
    } else if (currType === 'R') {
      return { x: 0, y: 1 };
    } else if (currType === 'UL') {
      return { x: -1, y: 1 };
    } else if (currType === 'UR') {
      return { x: 0, y: 1 };
    } else if (currType === 'DL') {
      return { x: -1, y: 0 };
    }
  } else if (prevType === 'UR') {
    if (currType === 'L') {
      return { x: 0, y: 1 };
    } else if (currType === 'R') {
      return { x: 1, y: 1 };
    } else if (currType === 'UL') {
      return { x: 0, y: 1 };
    } else if (currType === 'UR') {
      return { x: 1, y: 1 };
    } else if (currType === 'DR') {
      return { x: 1, y: 0 };
    }
  } else if (prevType === 'DL') {
    if (currType === 'L') {
      return { x: -1, y: 0 };
    } else if (currType === 'UL') {
      return { x: -1, y: 0 };
    } else if (currType === 'DL') {
      return { x: -1, y: -1 };
    } else if (currType === 'DR') {
      return { x: 0, y: -1 };
    }
  } else if (prevType === 'DR') {
    if (currType === 'R') {
      return { x: 1, y: 0 };
    } else if (currType === 'UR') {
      return { x: 1, y: 0 };
    } else if (currType === 'DL') {
      return { x: 0, y: -1 };
    } else if (currType === 'DR') {
      return { x: 1, y: -1 };
    }
  }

  return { x: 0, y: 0 };
}

const assignRelativePoints = function(queue) {
  queue[0].pos = { x: 0, y: 0 };
  for (let i = 1; i < queue.length; i++) {
    const diff = getPositionDiff(queue[i - 1].type, queue[i].type);
    queue[i].pos = { x: queue[i - 1].pos.x + diff.x, y: queue[i - 1].pos.y + diff.y };
  }

  const last = queue[queue.length - 1];
  if (last.type === 'L') {
    return { x: last.pos.x - 1, y: last.pos.y };
  } else if (last.type === 'R') {
    return { x: last.pos.x + 1, y: last.pos.y };
  }
  return last.pos;
}

const getDimensions = function(queue, finalPoint) {
  var lowestX = Number.MAX_VALUE;
  var lowestY = Number.MAX_VALUE;
  var largestX = Number.MIN_VALUE;
  var largestY = Number.MIN_VALUE;
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].pos.x < lowestX) {
      lowestX = queue[i].pos.x;
    }
    if (queue[i].pos.y < lowestY) {
      lowestY = queue[i].pos.y;
    }

    if (queue[i].pos.x > largestX) {
      largestX = queue[i].pos.x;
    }
    if (queue[i].pos.y > largestY) {
      largestY = queue[i].pos.y;
    }
  }

  if (finalPoint.x < lowestX) {
    lowestX = finalPoint.x;
  }
  if (finalPoint.y < lowestY) {
    lowestY = finalPoint.y;
  }

  if (finalPoint.x > largestX) {
    largestX = finalPoint.x;
  }
  if (finalPoint.y > largestY) {
    largestY = finalPoint.y;
  }

  return { 
    pos: { x: Math.abs(lowestX), y: Math.abs(lowestY) }, 
    w: (largestX - lowestX) + 1, 
    h: (largestY - lowestY) + 1
  };
}

const _gosper = function(n, queue, type) {
  if (n <= 0) {
    // Add to queue
    queue.push({ type: type });
  } else {
    if (type === 'L') {
      _gosper(n - 1, queue, 'L');
      _gosper(n - 1, queue, 'UL');
      _gosper(n - 1, queue, 'R');
      _gosper(n - 1, queue, 'UR');
      _gosper(n - 1, queue, 'L');
      _gosper(n - 1, queue, 'L');
      _gosper(n - 1, queue, 'DL');
    } else if (type === 'R') {
      _gosper(n - 1, queue, 'UR');
      _gosper(n - 1, queue, 'R');
      _gosper(n - 1, queue, 'R');
      _gosper(n - 1, queue, 'DL');
      _gosper(n - 1, queue, 'L');
      _gosper(n - 1, queue, 'DR');
      _gosper(n - 1, queue, 'R');
    } else if (type === 'UL') {
      _gosper(n - 1, queue, 'L');
      _gosper(n - 1, queue, 'UL');
      _gosper(n - 1, queue, 'UL');
      _gosper(n - 1, queue, 'R');
      _gosper(n - 1, queue, 'DR');
      _gosper(n - 1, queue, 'UR');
      _gosper(n - 1, queue, 'UL');
    } else if (type === 'UR') {
      _gosper(n - 1, queue, 'UR');
      _gosper(n - 1, queue, 'R');
      _gosper(n - 1, queue, 'DL');
      _gosper(n - 1, queue, 'DR');
      _gosper(n - 1, queue, 'UR');
      _gosper(n - 1, queue, 'UR');
      _gosper(n - 1, queue, 'UL');
    } else if (type === 'DL') {
      _gosper(n - 1, queue, 'DR');
      _gosper(n - 1, queue, 'DL');
      _gosper(n - 1, queue, 'DL');
      _gosper(n - 1, queue, 'UL');
      _gosper(n - 1, queue, 'UR');
      _gosper(n - 1, queue, 'L');
      _gosper(n - 1, queue, 'DL');
    } else if (type === 'DR') {
      _gosper(n - 1, queue, 'DR');
      _gosper(n - 1, queue, 'DL');
      _gosper(n - 1, queue, 'UL');
      _gosper(n - 1, queue, 'L');
      _gosper(n - 1, queue, 'DR');
      _gosper(n - 1, queue, 'DR');
      _gosper(n - 1, queue, 'R');
    }
  }
}

const _gosperInverse = function(n, queue, type) {
  if (n <= 0) {
    // Add to queue
    queue.push({ type: type });
  } else {
    if (type === 'L') {
      _gosperInverse(n - 1, queue, 'UL');
      _gosperInverse(n - 1, queue, 'L');
      _gosperInverse(n - 1, queue, 'L');
      _gosperInverse(n - 1, queue, 'DR');
      _gosperInverse(n - 1, queue, 'R');
      _gosperInverse(n - 1, queue, 'DL');
      _gosperInverse(n - 1, queue, 'L');
    } else if (type === 'R') {
      _gosperInverse(n - 1, queue, 'R');
      _gosperInverse(n - 1, queue, 'UR');
      _gosperInverse(n - 1, queue, 'L');
      _gosperInverse(n - 1, queue, 'UL');
      _gosperInverse(n - 1, queue, 'R');
      _gosperInverse(n - 1, queue, 'R');
      _gosperInverse(n - 1, queue, 'DR');
    } else if (type === 'UL') {
      _gosperInverse(n - 1, queue, 'UL');
      _gosperInverse(n - 1, queue, 'L');
      _gosperInverse(n - 1, queue, 'DR');
      _gosperInverse(n - 1, queue, 'DL');
      _gosperInverse(n - 1, queue, 'UL');
      _gosperInverse(n - 1, queue, 'UL');
      _gosperInverse(n - 1, queue, 'UR');
    } else if (type === 'UR') {
      _gosperInverse(n - 1, queue, 'R');
      _gosperInverse(n - 1, queue, 'UR');
      _gosperInverse(n - 1, queue, 'UR');
      _gosperInverse(n - 1, queue, 'L');
      _gosperInverse(n - 1, queue, 'DL');
      _gosperInverse(n - 1, queue, 'UL');
      _gosperInverse(n - 1, queue, 'UR');
    } else if (type === 'DL') {
      _gosperInverse(n - 1, queue, 'DL');
      _gosperInverse(n - 1, queue, 'DR');
      _gosperInverse(n - 1, queue, 'UR');
      _gosperInverse(n - 1, queue, 'R');
      _gosperInverse(n - 1, queue, 'DL');
      _gosperInverse(n - 1, queue, 'DL');
      _gosperInverse(n - 1, queue, 'L');
    } else if (type === 'DR') {
      _gosperInverse(n - 1, queue, 'DL');
      _gosperInverse(n - 1, queue, 'DR');
      _gosperInverse(n - 1, queue, 'DR');
      _gosperInverse(n - 1, queue, 'UR');
      _gosperInverse(n - 1, queue, 'UL');
      _gosperInverse(n - 1, queue, 'R');
      _gosperInverse(n - 1, queue, 'DR');
    }
  }
}

const gosper = function(n, type, inverse) {
  let queue = [];
  if (inverse) {
    _gosperInverse(n, queue, type);
  } else {
    _gosper(n, queue, type);
  }
  

  const finalPoint = assignRelativePoints(queue);
  const dimensions = getDimensions(queue, finalPoint);

  for (let i = 0; i < queue.length; i++) {
    queue[i].pos = { x: dimensions.pos.x + queue[i].pos.x, y: dimensions.pos.y + queue[i].pos.y };
  }

  const board = createBoard(dimensions.w, dimensions.h); 
  drawCurves(queue, board, dimensions.pos);

  return board;
}

const draw = function(board, lineType, slash) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += board[board.length - i - 1][j];
    }
    result += '\n ';
  }
  if (slash) {
    result = result.replaceAll('╱', '/').replaceAll('╲', '\\');
  }
  if (lineType === 'bold') {
    return '\u001b[1m' + result + '\u001b[22m';
  }
  return result;
}

const create = function(n, config) {
  if (n === undefined || isNaN(n) || n < 0) {
    return '';
  }

  const inverse = config !== undefined && config.inverse === true;
  const rotate = config !== undefined && isValidRotation(config.rotate) ? config.rotate.toLowerCase() : 'standard';
  const lineType = config !== undefined ? getLineType(config.line) : undefined;
  const slash = config !== undefined && config.slash === true;

  let board;
  if (rotate === 'left') {
    board = gosper(n, inverse ? 'UL' : 'DR', inverse);
  } else if (rotate === 'right') {
    board = gosper(n, inverse ? 'UR': 'DL', inverse);
  } else {
    board = gosper(n, inverse ? 'R' : 'L', inverse);
  }
  
  return draw(board, lineType, slash);
}

module.exports = {
  create: create
};