export default class Player {
  constructor(id, name, emoji) {
    this.id = id;
    this.isActive = false;
    this.name = name;
    this.emoji = emoji;
    this.sumOfRolls = 0;
    this.space = 0;
    this.laps = 0;
  }
}
