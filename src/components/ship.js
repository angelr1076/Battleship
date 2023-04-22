const createShip = (length, name = null) => {
  const ship = {
    length,
    name,
    hits: 0,
    hit() {
      this.hits += 1;
    },
    isSunk() {
      return this.hits === this.length;
    },
  };
  return ship;
};

export { createShip };
