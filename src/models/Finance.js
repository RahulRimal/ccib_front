
class Finance {

    constructor(idx, name) {
        this.idx = idx;
        this.name = name;
    }

    static fromJson(json) {
        return new Finance(
            idx = json.idx,
            name = json.name
        );
    }

    toJson() {
        return {
            idx: this.idx,
            name: this.name
        }
    }
}