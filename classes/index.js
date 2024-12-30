class Rectangle {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  getArea() {
    return this.width * this.height;
  }

  display() {
    console.log(`I have area of ${this.getArea()} with color ${this.color}`);
  }
}

// Instanciate a new object
const rect = new Rectangle(10, 5, "pink");

console.log(`Rectangle area is ${rect.getArea()}`);
rect.display();
