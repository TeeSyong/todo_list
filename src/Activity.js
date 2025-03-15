// src/Activity.js
class Activity {
  constructor(activity, price, type, booking, accessibility) {
    this.activity = activity;
    this.price = price;
    this.type = type;
    this.booking = booking;
    this.accessibility = accessibility;
  }

  toString() {
    return `${this.activity}, Price: ${this.price}, Type: ${this.type}, Booking: ${this.booking ? 'Yes' : 'No'}, Accessibility: ${this.accessibility}`;
  }

  static fromJSON(json) {
    const { activity, price, type, booking, accessibility } = json;
    return new Activity(activity, price, type, booking, accessibility);
  }
}

export default Activity;