class ObjectDiffTracker {
    constructor() {
        this.originalObject = {};
        this.currentObject = {};
        this.changes = [];
    }

    // Initializes the tracker with an object
    setObject(obj) {
        this.originalObject = JSON.parse(JSON.stringify(obj));
        this.currentObject = obj;
        this.changes = []; // Reset changes when setting a new object
    }

    // Records a change made to the object
    recordChange(key, oldValue, newValue) {
        this.changes.push({ key, oldValue, newValue });
    }

    // Tracks changes made to the current object
    trackChanges() {
        const newChanges = this.compareObjects(this.originalObject, this.currentObject);
        this.changes = this.changes.concat(newChanges);
        this.originalObject = JSON.parse(JSON.stringify(this.currentObject)); // Update the original object to current state
    }

    // Compares two objects and returns the differences
    compareObjects(obj1, obj2) {
        let changes = [];
        const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        allKeys.forEach(key => {
            const oldValue = obj1[key];
            const newValue = obj2[key];
            if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                changes.push({ key, oldValue, newValue });
                this.recordChange(key, oldValue, newValue);
            }
        });
        return changes;
    }

    // Gets all recorded changes
    getChanges() {
        return this.changes;
    }

    // Reverts the object to its original state
    revertChanges() {
        this.changes.forEach(change => {
            this.currentObject[change.key] = change.oldValue;
        });
        this.changes = []; // Clear changes after reverting
    }
}

module.exports = ObjectDiffTracker;