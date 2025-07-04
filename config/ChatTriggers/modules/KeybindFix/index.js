import PogObject from "../PogData/index"

const data = new PogObject("KeybindFix", {})
const storedKeys = new Set()

export class Keybind {
    /**
     * - Creates a ct keybind that has saving system on game unload
     * @param {String} description 
     * @param {Number} keycode 
     * @param {String} category 
     * @returns {KeyBind}
     */
    constructor(description, keycode, category) {
        this.description = description
        this.keycode = keycode
        this.category = category

        this.keybind = this._load()

        storedKeys.add(this)

        return this.keybind
    }

    /**
     * - Internal use
     * - Saves this [Keybind] by its [category] and [description]
     */
    _save() {
        if (!(this.category in data)) data[this.category] = {}

        data[this.category][this.description] = this.keybind.getKeyCode()
    }

    /**
     * - Internal use
     * - Loads the data for this [Keybind]
     * - If the [Keybind] data is not found in the saved data
     * - it will create a new keybind
     * @returns {KeyBind}
     */
    _load() {
        if (data[this.category]?.[this.description] == null) return new KeyBind(this.description, this.keycode, this.category)

        return new KeyBind(this.description, data[this.category][this.description], this.category)
    }
}

// Workaround to first import only saving a clean object
// rather than saving the entire list that is required to
const singleUseStep = register("step", () => {
    if (storedKeys.size < 1 || Object.keys(data).length > 0) return singleUseStep.unregister()

    // Put all data in the obj
    storedKeys.forEach(it => it._save())

    // Save it after all the data was set
    data.save()

    singleUseStep.unregister()
}).setDelay(60) // every minute

register("gameUnload", () => {
    // Put all data in the obj
    storedKeys.forEach(it => it._save())

    // Save it after all the data was set
    data.save()
})