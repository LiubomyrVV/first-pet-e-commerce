import Observable from "./Observable";

class OperationsObservable extends Observable {
    constructor() {
        super()
        this.observers = []
    }
    notify(data, type) {
        this.observers.forEach((observer) => observer(data, type));
    }
}
export default new OperationsObservable()