export class Entity {
    constructor(id) {
        this.id = id;
        this.name = undefined;
        this.sizeMl = undefined;
        this.caffeineMgPerMl = undefined;


        this.GetTotalCaffeine = () => this.sizeMl * this.caffeineMgPerMl;
    }
}